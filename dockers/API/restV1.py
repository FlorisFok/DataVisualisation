from flask import Flask, jsonify, request
from flask_reverse_proxy_fix.middleware import ReverseProxyPrefixFix
import mysql.connector
from mysql.connector import Error
import random
import json


app = Flask(__name__)
app.config['REVERSE_PROXY_PATH'] = '/foo'
ReverseProxyPrefixFix(app)

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

@app.route('/pien',methods=["GET"])
def love_pien():
    num = int(random.random()*(6))
    return jsonify({"result":"Ik hou van je :)","name":"Floris"})

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

def get_full_json():
    conn = connect()
    mycursor = conn.cursor()
    mycursor.execute('''SELECT * FROM tasks''')
    row_headers=[x[0] for x in mycursor.description] #this will extract row headers
    rv = mycursor.fetchall()
    json_data=[]
    for result in rv:
        result = list(result)
        result[2] = str(result[2])
        result[3] = str(result[3])
        json_data.append(dict(zip(row_headers,result)))
    # j = json.dumps(json_data)
    return json_data

if __name__ == '__main__':
    app.run(debug=True,host='0.0.0.0')


""" curl -H "Content-Type: appplication/json" -X POST -d '{"name":"Floris","addr":"uilie24"}' http://127.0.0.1:5000/ """
'''curl -v http://127.0.0.1:5000/'''
