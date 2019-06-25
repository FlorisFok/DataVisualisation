from flask import Flask, jsonify, request
from flask_reverse_proxy_fix.middleware import ReverseProxyPrefixFix
from flask_cors import CORS
import mysql.connector
from mysql.connector import Error
import json

from sklearn.svm import SVR
import pandas as pd
import numpy as np
import datetime


# Setup the API to work Cross orgin and behind a proxy
app = Flask(__name__)
app.config['REVERSE_PROXY_PATH'] = '/foo'
ReverseProxyPrefixFix(app)
CORS(app)

# Center of Amsterdam
CENTER = (52.367612, 4.893884)

@app.route('/', methods=['GET', 'POST'])
def index():
    '''
    Just return allllll data and test with jsons
    '''
    if (request.method == 'POST'):
        some_json = request.get_json()
        return jsonify({"you sent":some_json}), 201
    else:
        return jsonify({"data":get_full_json()}), 200

# Get last <num>  uploads, NOT IN USE FOR PROJECT
@app.route('/last/<int:num>',methods=["GET"])
def choose_random(num):
    data = get_full_json()
    return jsonify({"data": data[-num:]}), 200

# Get certain columns, NOT IN USE FOR PROJECT
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
    '''
    Execute Where commands using my own made up syntax
    '''
    calls = commands_parser(commands)
    data = get_where_json(calls)

    return jsonify({"data": data}), 200


@app.route('/number/<commands>', methods=["GET"])
def Number_signup(commands):
    '''
    Add number to text database
    '''
    info = commands.split("+")

    conn = connect()
    mycursor = conn.cursor()

    mycursor.execute("INSERT INTO kamernet_sms (name, number, price_min, price_max) VALUES ('{}', '{}', 0, 750);"
                .format(info[0], info[1]))
    conn.commit()
    return jsonify({"data": True}), 200

@app.route('/removenumber/<commands>', methods=["GET"])
def Number_remove(commands):
    '''
    Remove number from text database
    '''
    info = commands.split("+")

    conn = connect()
    mycursor = conn.cursor()

    mycursor.execute("DELETE FROM kamernet_sms WHERE name='{}' AND number='{}'"
                .format(info[0], info[1]))
    conn.commit()
    return jsonify({"data": True}), 200

@app.route('/loc/<range>/<commands>', methods=["GET"])
def location(range, commands):
    '''
    returns only rooms that are within a certain range (km) circle from CENTER
    '''

    calls = commands_parser(commands)
    data = get_where_json(calls)

    new_data = []
    for piece in data:
        dinstance = ((abs(piece['lat'] - CENTER[0]))**2 +
                     (abs(piece['lon']-CENTER[1]))**2)**0.5

        # 111 is the differnence between 1 km and 1 degree +-
        if (int(range) > dinstance*111):
            new_data.append(piece)

    return jsonify({"data": new_data}), 200

@app.route('/predict/<commands>', methods=["GET"])
def price_predict(commands):
    '''
    Very bad prediction of the price, but fun to make
    '''
    vars = commands.split("&")
    vars = [float(i.replace('+','.')) for i in vars]
    # help: vars = [lat, lon, size, tijd]

    # this makes a prediction
    price = predict_price(vars[0], vars[1], vars[2], vars[3])


    return jsonify({"price": list(price)[0]}), 200

@app.route('/due_date', methods=["GET"])
def due_dates():
    '''
    Returns all the due dates for the calander
    '''
    conn = connect()
    mycursor = conn.cursor()
    mycursor.execute("Select count(*), due_date from kamernet group by due_date")
    raw_data = mycursor.fetchall()

    data = []
    for raw in raw_data:
        # Only 2019 support
        if raw[1].strftime("%Y") != '2019':
            continue
        # Parse data in usable format
        data.append({'date':raw[1].strftime("%d/%m/%Y")[:-4]+'19',
                     'value':raw[0]})

    return jsonify({"data":data}), 200



@app.route('/hourly', methods=["GET"])
def hour_histogram():
    '''
    Returns the data for the hour histogram
    '''
    conn = connect()
    mycursor = conn.cursor()
    mycursor.execute("SELECT * FROM kamernet_log")
    all_data = mycursor.fetchall()

    # Make hour avarage
    d_hour = {}
    for i in all_data:
        if i[1] > 30:
            continue
        hour = i[2].hour
        if hour in d_hour:
            d_hour[hour][0] += i[1]
            d_hour[hour][1] += 1
        else:
            d_hour[hour] = [i[1], 1]

    # Time stamp
    now = datetime.datetime.now()
    date_time = now.strftime("%Y-%m-%d 00:00:00")

    # Get this days data --> currently using only last one
    mycursor.execute("SELECT * FROM kamernet_log WHERE date>'{}'"
                .format(date_time))
    last = mycursor.fetchall()
    count = last[-1][1]
    hour = last[-1][2].hour
    hist_data = []

    # Parse data and return
    for i in d_hour:
        # I recently found out the date on my server is 2 hours behind....
        HOURS_BIHIND = 2
        hist_data.append({'hours':(i+HOURS_BIHIND)%24,
                          'values':round((d_hour[i][0]/d_hour[i][1]), 2)})

    return jsonify({"data":
                    {'histogram': hist_data,
                     "current":
                        {"hour":hour,"value":count}
                   }}), 200

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
    '''
    Just fetch everything
    '''
    conn = connect()
    mycursor = conn.cursor()
    mycursor.execute('''SELECT '''+ col +''' FROM kamernet''')
    row_headers=[x[0] for x in mycursor.description]
    rv = mycursor.fetchall()
    json_data = make_json(row_headers, rv)
    return json_data

def get_where_json(commands):
    '''
    Fetch every thing where ....
    '''
    conn = connect()
    mycursor = conn.cursor()
    call = '''SELECT * FROM kamernet'''
    call = call + " WHERE"

    for com in commands:
        call = call + com + 'AND'

    call = call[:-4]
    mycursor.execute(call)
    row_headers=[x[0] for x in mycursor.description]
    rv = mycursor.fetchall()

    json_data = make_json(row_headers, rv)
    return json_data

def predict_price(lat, lon, size, tijd):
    '''
    Price prediction machine learning magic!
    '''
    # Get data from mysql
    conn = connect()
    mycursor = conn.cursor()
    mycursor.execute('''SELECT * FROM kamernet''')

    # PArse data into json
    row_headers=[x[0] for x in mycursor.description]
    rv = mycursor.fetchall()
    json_data = make_json(row_headers, rv)

    # prepare data
    df = pd.DataFrame(json_data)
    df_dropped = df.drop(['loc', 'url', 'start_date', 'id', 'due_date'], 1)
    x = np.array(df_dropped.drop(['price'],1))
    df_dropped.dropna(inplace=True)
    y = np.array(df_dropped['price'])

    # Make Regression model
    clf = SVR(kernel='rbf',
              C=100, gamma='auto',
              degree=3,
              epsilon=.1,
              coef0=1)

    # Train Regression model
    clf.fit(x, y)

    # Predict with the new data
    price = clf.predict(np.array([[lat, lon, size, tijd]]))
    return price

def make_json(row_headers, data):
    '''
    Make a json from the sql list in list
    '''
    json_data=[]
    for result in data:
        result = list(result)
        result[2] = str(result[2])
        result[3] = str(result[3])
        json_data.append(dict(zip(row_headers,result)))
    return json_data

def from_date(arg, year, month, day):
    '''
    Date format function
    '''
    date_time = "{Y}-{m}-{d} 00:00:00".format(Y=year, m=month, d=day)
    call = " {} >='{}' ".format(arg, date_time)
    return call

def till_date(arg, year, month, day):
    '''
    Date format function
    '''
    date_time = "{Y}-{m}-{d} 00:00:00".format(Y=year, m=month, d=day)
    call = " {} <='{}' ".format(arg, date_time)
    return call

def periods(arg, year, month, day, year2, month2, day2):
    '''
    Date format function
    '''
    date_time = "{Y}-{m}-{d} 00:00:00".format(Y=year, m=month, d=day)
    date_time2 = "{Y}-{m}-{d} 00:00:00".format(Y=year2, m=month2, d=day2)

    call = " {0} >='{1}' AND {0} <= '{2}' ".format(arg, date_time, date_time2)
    return call

def commands_parser(raw_url):
    '''
    Universal, but unique command parser :D
    returns list of calls - no string
    '''
    commands = raw_url.split("&")
    calls = []
    for com in commands:
        if 'from' in com and 'till' in com:
            period = com.split("+")
            period0 = period[0].split('=')
            period1 = period[1].split('=')

            t0 = period0[1][4:].split("$")
            t1 = period1[1][4:].split("$")
            call = periods(period0[0], t0[0], t0[1], t0[2],
                                       t1[0], t1[1], t1[2])

        elif 'from' in com:
            print(1, com)
            period0 = com.split('=')
            t0 = period0[1][4:].split("$")
            call = from_date(period0[0], t0[0], t0[1], t0[2])

        elif 'till' in com:
            period0 = com.split('=')
            t0 = period0[1][4:].split("$")
            call = till_date(period0[0], t0[0], t0[1], t0[2])
        else:
            arg = [i for i in com if not i.isdigit()]
            value = [i for i in com if i.isdigit()]
            operator = arg[-1].replace('+','>').replace('-','<')
            arg = ''.join(arg[:-1])
            value = ''.join(value)
            call = " {} {} {} ".format(arg, operator, value)

        calls.append(call)
    return calls

if __name__ == '__main__':
    app.run(debug=True,host='0.0.0.0')
