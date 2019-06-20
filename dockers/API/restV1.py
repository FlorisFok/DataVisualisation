from flask import Flask, jsonify, request
from flask_reverse_proxy_fix.middleware import ReverseProxyPrefixFix
from flask_cors import CORS
import mysql.connector
from mysql.connector import Error
import json

from sklearn.svm import SVR
import pandas as pd
import numpy as np


app = Flask(__name__)
app.config['REVERSE_PROXY_PATH'] = '/foo'
ReverseProxyPrefixFix(app)
CORS(app)

CENTER = (52.367612, 4.893884)

@app.route('/', methods=['GET', 'POST'])
def index():
    if (request.method == 'POST'):
        some_json = request.get_json()
        return jsonify({"you sent":some_json}), 201
    else:
        return jsonify({"data":get_full_json()}), 200

@app.route('/last/<int:num>',methods=["GET"])
def choose_random(num):
    data = get_full_json()
    return jsonify({"data": data[-num:]}), 200

@app.route('/<column>',methods=["GET"])
def roll_dice(column):
    cols = column.split('+')
    cols = [i for i in cols if i != '']
    data = get_full_json()

    for col in cols:
        if not col in list(data[0].keys()):
            return jsonify({'data':False, 'wrong':col})

    new_data = []
    for piece in data:
        ed = {}
        for col in cols:
            ed[col] = piece[col]
        new_data.append(ed)

    return jsonify({"data": new_data}), 200

@app.route('/where/<commands>', methods=["GET"])
def where_command(commands):

    commands = commands.split('+')
    commands = [i.replace('+', '>').replace('-', '<')
                for i in commands if i != '']
    data = get_where_json(commands)

    return jsonify({"data": data}), 200

@app.route('/loc/<range>/<commands>', methods=["GET"])
def location(range, commands):

    commands = commands.split('+')
    commands = [i.replace('+', '>').replace('-', '<')
                for i in commands if i != '']
    data = get_where_json(commands)

    new_data = []
    for piece in data:
        dinstance = ((abs(piece['lat'] - CENTER[0]))**2 + (abs(piece['lon']-CENTER[1]))**2)**0.5
        if (int(range) > dinstance*111):
            new_data.append(piece)

    return jsonify({"data": new_data}), 200

@app.route('/pien',methods=["GET"])
def love_pien():
    commands = 'price-550'
    range = '4'
    commands = commands.split('+')
    commands = [i.replace('+', '>').replace('-', '<')
                for i in commands if i != '']
    data = get_where_json(commands)

    new_data = []
    for piece in data:
        dinstance = ((abs(piece['lat'] - CENTER[0]))**2 + (abs(piece['lon']-CENTER[1]))**2)**0.5
        if (int(range) > dinstance*111):
            new_data.append(piece)

    return jsonify({"data": new_data}), 200
    return jsonify({"result":"Ik hou van je :)",
                    "name":"Floris",
                    'data': get_where_json("price<550")})

@app.route('/predict_price/<vars>',methods=["GET"])
def love_pien(vars):
    var_list = vars.split('+')
    price = predict_price(var_list[0], var_list[1],
                          var_list[2], var_list[3])
    return jsonify({"price": price}), 200

def connect():
    """ Connect to MySQL database """
    try:
        conn = mysql.connector.connect(host='80.112.130.100',
                                       database='first',
                                       user='root',
                                       password='2019mysql@eenheid24')
        if conn.is_connected():
            print('Connected to MySQL database')

    except Error as e:
        print(e)

    return conn

def get_full_json(col = '*'):
    conn = connect()
    mycursor = conn.cursor()
    mycursor.execute('''SELECT '''+ col +''' FROM kamernet''')
    row_headers=[x[0] for x in mycursor.description] # this will extract row headers
    rv = mycursor.fetchall()
    json_data = make_json(row_headers, rv)
    return json_data

def get_where_json(commands):
    conn = connect()
    mycursor = conn.cursor()
    call = '''SELECT * FROM kamernet'''
    call = call + " WHERE"
    for com in commands:
        call = call + ' ' + com + ' AND'
    call = call[:-4]
    mycursor.execute(call)
    row_headers=[x[0] for x in mycursor.description] # this will extract row headers
    rv = mycursor.fetchall()
    json_data = make_json(row_headers, rv)
    return json_data

def predict_price(lat, lon, size, tijd):
    conn = connect()
    mycursor = conn.cursor()
    mycursor.execute('''SELECT * FROM kamernet''')
    row_headers=[x[0] for x in mycursor.description] # this will extract row headers
    rv = mycursor.fetchall()

    json_data = make_json(row_headers, rv)

    df = pd.DataFrame(json_data)
    df_dropped = df.drop(['loc', 'url', 'start_date', 'id', 'due_date'], 1)

    x = np.array(df_dropped.drop(['price'],1))

    df_dropped.dropna(inplace=True)
    y = np.array(df_dropped['price'])

    clf = SVR(kernel='rbf',
              C=100, gamma='auto',
              degree=3,
              epsilon=.1,
              coef0=1)

    clf.fit(x, y)
    price = clf.predict(np.array([[lat, lon, size, tijd]]))
    return price

def make_json(row_headers, data):
    json_data=[]
    for result in data:
        result = list(result)
        result[2] = str(result[2])
        result[3] = str(result[3])
        json_data.append(dict(zip(row_headers,result)))
    return json_data

if __name__ == '__main__':
    app.run(debug=True,host='0.0.0.0')
