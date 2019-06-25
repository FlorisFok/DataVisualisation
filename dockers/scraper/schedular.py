
from timeloop import Timeloop
from datetime import timedelta
from bs4 import BeautifulSoup
import time
import requests
import datetime
import mysql.connector
from mysql.connector import Error
import pickle
import json
import lxml
import os

# Not best safety, but it's better than nothing :)
NUM_PASS = [50, 48, 49, 57, 109, 121, 115, 113, 108, 64, 101, 101, 110, 104, 101, 105, 100, 50, 52]

def connect():
    """
    Connect to MySQL database
    """
    try:
        # Please dont hack me
        conn = mysql.connector.connect(host='80.112.130.100',
                                       database='first',
                                       user='root',
                                       password= ''.join([chr(i) for i in NUM_PASS]))
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

def save_log(mycursor, count):
    """
    Insert data into database table of mysql
    """
    ts = time.time()
    st = datetime.datetime.fromtimestamp(ts).strftime('%Y-%m-%d %H:%M:%S')
    call = "INSERT INTO kamernet_log (count, date)"
    call += " VALUES ({},'{}');".format(count, st)
    mycursor.execute(call)
    return call

def send_text(mycursor, count):
    '''
    Sends a text via the "free" api.
    It works, but my credit is 0.
    '''
    if count == 0:
        return False

    apikey = "pv2qrvPYWFo-oeTduhVKH3uQlFt7lpOrIcFKtlPrhX"
    address = "http://api.txtlocal.com/send/?"
    if count > 1:
        message = "their are {} new rooms".format(count)
    else:
        message = "their is one new room"
    message = message.replace(' ','+').lower()
    sender = "RoboFloris"
    mycursor.execute("SELECT * FROM kamernet_sms")
    persons = mycursor.fetchall()

    numbers = ''
    for num in persons:
        numbers = numbers + num[1] + ','

    url = address + "apikey=" + apikey + "&numbers=" + numbers[:-1] + "&message=" + message + "&sender=" + sender
    response = requests.get(url)

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
        # request page
        r  = requests.get(site + "?pageno={}".format(page))
        data = r.text
        soup = BeautifulSoup(data, "lxml")

        # Get all the rooms and their text
        ads = soup.find_all('div', {'class':'tile-data'})
        for tiles in ads:
            # Could invest in fancies scraping, but this worked fine.
            url = tiles.find('a').attrs['href']
            # Url attribute wasn't in the text
            all_data.append(tiles.text+';'+ url)


        page += 1
        c = len(ads)

    # Before this automation it saved it with this Timestamp
    # No it is just a bit weird to make the stamp here, but it not bad.
    ts = time.time()
    st = datetime.datetime.fromtimestamp(ts).strftime('%Y-%m-%d %H:%M:%S')
    st = st.replace(' ','_').replace(':','_')
    file =  "data"+st+".p"
    return all_data, file


def latlon_by_term(searchterm):
    '''
    Get lat and Longitude from address, not in the street dict, these results
    Are added to the dict, in this way we never search the same term twice!
    '''
    YOUR_APP_ID = "icnkexRkeE1jpTvEhi8G"
    YOUR_APP_CODE = "b75GL1eDwQ11BAp6kO-jkA"

    # Send rewuest with all info
    url = f"https://geocoder.api.here.com/6.2/geocode.json?app_id={YOUR_APP_ID}&app_code={YOUR_APP_CODE}&searchtext={searchterm.replace(' ','+')}"
    response = requests.get(url)
    d = json.loads(response.text)

    # Retrieve only the lat and long of the very complex API response.
    lldict = d['Response']['View'][0]['Result'][0]['Location']['NavigationPosition'][0]
    return lldict['Latitude'], lldict['Longitude']

def save(e, file):
    '''
    Parse the data scraped and insert it MYSQL
    '''

    # Since pickles don't work, i needed to convert it to json.txt
    with open('streetlocations.txt') as json_file:
        streetdict = json.load(json_file)

    # Connect to database
    conn = connect()
    mycursor = conn.cursor()

    # This is the weird part, because it first loaded files in the beta version
    # convert file name to dates
    now = file[4:14].split('-')
    now = [int(i) for i in now]
    scrape_date = file[4:14]

    new = 0
    for single in e:
        try:
            # Get url
            single, url = single.split(';')

            # Split the rest
            l = single.split('-')
            if 'Kamer' in l[2]:
                l.pop(0)

            # somethings numbers join the text ~ stupid kamernet
            loc = l[0].strip()
            if loc[1].isdigit():
                loc = loc[2:]

            # Extracted all the data
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

            # Machine learning street dictonairy here! :P
            try:
                lat = streetdict[street][0]
                lon = streetdict[street][1]
            except:
                # Self learning dictonairy
                lat, lon = latlon_by_term(street)
                streetdict[street] = (lat, lon)

            # Insert in my sql
            call = make_insert(mycursor,loc,
                            scrape_date+' '+file[15:-2].replace('_', ':'),
                            then,
                            size,
                            url,
                            price,
                            lat,
                            lon,
                            onbep)
            new += 1

        except Exception as x:
            print(x)

    # Save count and send text
    save_log(mycursor, new)
    send_text(mycursor, new)

    # Commit queue
    conn.commit()

tl = Timeloop()

# Run every hour
@tl.job(interval=timedelta(hours=1))
def sample_job_every_hour():
    all_data, file = run()
    save(all_data, file)

if __name__ == "__main__":
    # Start with a scrape, so i can check within 1 min if anything broke
    all_data, file = run()
    save(all_data, file)
    tl.start(block=True)
