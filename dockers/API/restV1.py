from flask import Flask, jsonify, request
from flask_reverse_proxy_fix.middleware import ReverseProxyPrefixFix
import random


app = Flask(__name__)
app.config['REVERSE_PROXY_PATH'] = '/foo'
ReverseProxyPrefixFix(app)


@app.route('/', methods=['GET', 'POST'])
def index():
    if (request.method == 'POST'):
        some_json = request.get_json()
        return jsonify({"you sent":some_json}), 201
    else:
        return jsonify({"about":"hello world"})

@app.route('/choose/<int:num>',methods=["GET"])
def choose_random(num):
    choice = int(num*random.random())
    return jsonify({"result":choice})

@app.route('/dice',methods=["GET"])
def roll_dice():
    num = int(random.random()*(6))
    return jsonify({"roll":num,"name":"FlorisServer"})

@app.route('/pien',methods=["GET"])
def love_pien():
    num = int(random.random()*(6))
    return jsonify({"result":"Ik hou van je :)","name":"Floris"})

if __name__ == '__main__':
    app.run(debug=True,host='0.0.0.0')


""" curl -H "Content-Type: appplication/json" -X POST -d '{"name":"Floris","addr":"uilie24"}' http://127.0.0.1:5000/ """
'''curl -v http://127.0.0.1:5000/'''
