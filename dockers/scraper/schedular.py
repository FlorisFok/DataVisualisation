import time
from timeloop import Timeloop
from datetime import timedelta
from bs4 import BeautifulSoup
import requests
import datetime
import mysql.connector
from mysql.connector import Error
import pickle
import json

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

def make_insert(mycursor, loc, start_date, due_date, size, url, price, lat, lon, maanden):
    """
    Insert data into database table of mysql
    """
    call = "INSERT INTO kamernet (loc, start_date, due_date, size, url, price, lat, lon, tijd)"
    call += " VALUES ('{}','{}','{}',{},'{}','{}', {}, {}, {});".format(loc,
                                                               start_date,
                                                               due_date,
                                                               size,
                                                               url,
                                                               price,
                                                               lat,
                                                               lon,
                                                               maanden
                                                               )
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
            url = tiles.find('a').attrs['href']
            all_data.append(tiles.text+';'+ url)


        page += 1
        c = len(ads)


    ts = time.time()
    st = datetime.datetime.fromtimestamp(ts).strftime('%Y-%m-%d %H:%M:%S')
    st = st.replace(' ','_').replace(':','_')
    file =  "data"+st+".p"
    return all_data, file


def latlon_by_term(searchterm):
    YOUR_APP_ID = "icnkexRkeE1jpTvEhi8G"
    YOUR_APP_CODE = "b75GL1eDwQ11BAp6kO-jkA"
    url = f"https://geocoder.api.here.com/6.2/geocode.json?app_id={YOUR_APP_ID}&app_code={YOUR_APP_CODE}&searchtext={searchterm.replace(' ','+')}"
    response = requests.get(url)
    d = json.loads(response.text)
    lldict = d['Response']['View'][0]['Result'][0]['Location']['NavigationPosition'][0]
    return lldict['Latitude'], lldict['Longitude']

def save(e, file):

    streetdict = pickle.load( open( "streets2Latlon_dict.p", "rb" ) )
    conn = connect()
    mycursor = conn.cursor()

    now = file[4:14].split('-')
    now = [int(i) for i in now]
    scrape_date = file[4:14]

    for single in e:
        try:
            single, url = single.split(';')
            l = single.split('-')
            if 'Kamer' in l[2]:
                l.pop(0)

            loc = l[0].strip()[2:]
            price = (int(''.join([i for i in l[1] if i.isdigit()])))
            incl = (('incl' in l[2]))

            ind = (l[2].index('m2'))
            size = (int(l[2][ind-3:ind-1].strip()))

            if not 'Onbepaalde tijd' in single:
                onbep = 0 ##
            else:
                onbep = -1

            then = '20' + l[4][1:3] +'-' + l[3] + "-" +l[2][-2:]
            street = loc[:-9]+ " Amsterdam Netherlands"
            try:
                lat = streetdict[street][0]
                lon = streetdict[street][1]
            except:
                lat, lon = latlon_by_term(street)
                print(lat, lon)

            call = make_insert(mycursor,loc,
                            scrape_date+' '+file[15:-2].replace('_', ':'),
                            then,
                            size,
                            url,
                            price,
                            lat,
                            lon,
                            onbep
                           )
        except Exception as x:
            print(x)
    conn.commit()

tl = Timeloop()

@tl.job(interval=timedelta(hours=1))
def sample_job_every_5s():
    all_data, file = run()
    save(all_data, file)

if __name__ == "__main__":
    all_data, file = run()
    save(all_data, file)
    tl.start(block=True)
