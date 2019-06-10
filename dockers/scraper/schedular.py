import time
from timeloop import Timeloop
from datetime import timedelta
from bs4 import BeautifulSoup
import requests
import datetime
import mysql.connector
from mysql.connector import Error

def connect():
    """
    Connect to MySQL database
    """
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

def make_insert(mycursor, loc , start_date , due_date , size , extra , url , price):
    """
    Insert data into database table of mysql
    """
    call = "INSERT INTO tasks (loc, start_date, due_date, size, extra, url, price)"
    call += " VALUES ('{}','{}','{}',{},'{}','{}',{});".format(loc ,
                                                               start_date,
                                                               due_date,
                                                               size,
                                                               extra,
                                                               url,
                                                               price)
    mycursor.execute(call)
    return call

def cal_t_left(then, now):
    '''
    Calculate time differnence
    '''
    then = then.split('-')
    then = [int(i) for i in then]
    t_left = (then[0] - now[0])*365 + (then[1] - now[1])*30 + (then[2] - now[2])
    return t_left

def run():
    '''
    scrape the stuff from kmernet
    '''
    site = r"https://kamernet.nl/huren/kamer-amsterdam"
    all_data = []
    page = 1
    c = 1
    while c > 0:
        r  = requests.get(site + "?pageno={}".format(page))
        data = r.text
        soup = BeautifulSoup(data, "lxml")

        ads = soup.find_all('div', {'class':'tile-data'})
        for tiles in ads:
            all_data.append(tiles.text)
        page += 1
        c = len(ads)


    ts = time.time()
    st = datetime.datetime.fromtimestamp(ts).strftime('%Y-%m-%d %H:%M:%S')
    st = st.replace(' ','_').replace(':','_')
    file =  "data"+st+".p"
    return all_data, file

def save(e, file):

    conn = connect()
    mycursor = conn.cursor()

    data = {'loc':[],'price':[],'incl':[],'size':[],'gestof':[],'datum':[],'onbep':[], 't_left':[]}

    now = file[4:14].split('-')
    now = [int(i) for i in now]
    scrape_date = file[4:14]

    for single in e:
        try:
            l = single.split('-')
            if 'Kamer' in l[2]:
                l.pop(0)

            data["loc"].append(''.join([i for i in l[0].strip() if not i.isdigit()]))
            data["price"].append(int(''.join([i for i in l[1] if i.isdigit()])))
            data["incl"].append(('incl' in l[2]))

            ind = (l[2].index('m2'))
            data["size"].append(int(l[2][ind-3:ind-1].strip()))

            data["gestof"].append(('gestoffeerd' in l[2]))
            data["onbep"].append(('onbepaald' in l[5]))

            then = '20' + l[4][1:3] +'-' + l[3] + "-" +l[2][-2:]
            data["datum"].append(then)
            data['t_left'].append(cal_t_left(then, now))

            call = make_insert(mycursor,
                        data["loc"][-1],
                        scrape_date+' '+file[15:-2].replace('_', ':'),
                        then,
                        data["size"][-1],
                        data["incl"][-1],
                        'empty',
                        data["price"][-1]\
                       )
        except Exception as x:
            print(x, call)
            break
           
    conn.commit()

tl = Timeloop()

@tl.job(interval=timedelta(hours=24))
def sample_job_every_5s():
    all_data, file = run()
    save(all_data, file)

if __name__ == "__main__":
    tl.start(block=True)
