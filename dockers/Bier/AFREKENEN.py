from selenium import webdriver
from selenium.webdriver.chrome.options import Options
import gspread
from oauth2client.service_account import ServiceAccountCredentials


URL = "https://wiebetaaltwat.nl/lists/4d0418db-caa2-481c-b5a5-98c3e4e2e3c2/expenses/new?order=desc&sort=payed_on"

MENS_COL = 1
BIER_COL = 2
PILS_COL = 3
TIME_COL = 4
CREDIT_COL = 5
STAT_COL = 6

ZWERVER = 0.35
PREMIUM = 0.60

class WBW(object):
    def __init__(self, url, back):
        if back:
            driver = self.background_driver()
        else:
            driver = None

        self.start_driver(url, driver)
        self.driver.implicitly_wait(10)

    def background_driver(self):
        CHROME_PATH = r"C:\Program Files (x86)\Google\Chrome\Application\chrome.exe" #"C:\Program Files (x86)\Google\Chrome"
        CHROMEDRIVER_PATH = r'C:/Webdrivers/chromedriver.exe'
        WINDOW_SIZE = "1920,1080"

        chrome_options = Options()
        chrome_options.add_argument("--headless")
        chrome_options.add_argument("--window-size=%s" % WINDOW_SIZE)
        chrome_options.binary_location = CHROME_PATH

        driver = webdriver.Chrome(executable_path=CHROMEDRIVER_PATH,
                                  chrome_options=chrome_options
                                 )

        return driver

    def start_driver(self, url, driver = None):
        if driver == None:
            driver = webdriver.Chrome(executable_path=r'C:/Webdrivers/chromedriver.exe')
        driver.get(url)
        self.driver = driver

    def login(self):
        inputs = self.driver.find_elements_by_css_selector("input")
        inputs[0].send_keys("florisfok5@gmail.com")
        inputs[1].send_keys("spinazie")
        btn = self.driver.find_elements_by_css_selector("button.expanded.button.ng-binding")
        btn[0].click()
        self.driver.implicitly_wait(10)

    def select_payer(self, name):
        payer = self.driver.find_element_by_name("payed_by_id")
        people = payer.find_elements_by_css_selector("option")

        people_in_wbw=[]
        for i in people:
            people_in_wbw.append(i.text)
            if i.text.lower() == name.lower():
                i.click()
                break
        else:
            print(name, "Not in WBW")
            print("People in WBW:", self.people)

        self.driver.implicitly_wait(10)

    def input_amount(self, credit):
        amountbox = self.driver.find_element_by_name("amount")
        amountbox.send_keys(str(credit))

        self.driver.implicitly_wait(10)

    def input_text(self, text):
        text_block = self.driver.find_element_by_name("name")
        text_block.send_keys(str(text))

        self.driver.implicitly_wait(10)

    def plusser(self, names):
        particapants_block = self.driver.find_elements_by_css_selector("div.participants.noselect")
        particapants = particapants_block[0].find_elements_by_css_selector("div.row.collapse")

        names = [i.lower() for i in names]
        for person in particapants:
            if person.text.lower() in names:
                plus = person.find_element_by_css_selector("a.btn.plus")
                plus.click()


        self.driver.implicitly_wait(10)

    def save_payment(self, new = False):
        btn = self.driver.find_elements_by_css_selector("button")
        for i in btn:
            if "Opslaan en nieuwe" == i.text and new:
                i.click()
            elif "Opslaan" == i.text and not new:
                i.click()

        self.driver.implicitly_wait(10)

def make_payment(URL, payer, amount, name_list, keep_open=False, back_ground=True):

    Payment = WBW(URL, back_ground)
    Payment.login()

    Payment.select_payer(payer)
    Payment.input_amount(amount)
    Payment.input_text("I'm a robot")
    Payment.plusser(name_list)
    Payment.save_payment(keep_open)
    return Payment

def get_credit():
    '''
    Calculates the credit everybody build
    '''

    scope = ['https://spreadsheets.google.com/feeds',
             'https://www.googleapis.com/auth/drive']

    creds = ServiceAccountCredentials.from_json_keyfile_name(
                r"C:\Users\s147057\Documents\CS50\Database-6141813cd99e.json", scope)

    client = gspread.authorize(creds)
    sheet  = client.open('Test').sheet1

    people = sheet.col_values(MENS_COL)[1:]
    betaald = sheet.col_values(CREDIT_COL)[1:]
    stats = sheet.col_values(STAT_COL)[1:]

    zwervers = sheet.col_values(BIER_COL)[1:]
    zwervers = [int(i)*ZWERVER for i in zwervers]
    premiums = sheet.col_values(PILS_COL)[1:]
    premiums = [int(i)*PREMIUM for i in premiums]

    credit = {}
    for i, name in enumerate(people):
        credit[name] = float(betaald[i]) - float(stats[i])/2 - zwervers[i] - premiums[i]


    return credit

def get_transactions(credit):
    '''
    Return a list of who gets what in de order, person who paid, person who needs to pay, amount
    '''
    def secondval(d):
        return d[1]

    cred = list(zip(credit.keys(), credit.values()))
    cred = [[i[0],int(i[1]*100)] for i in cred]
    cred.sort(key=secondval)

    down = 0
    up = len(cred) - 1
    transactions = []
    while up > down:
        print(up,down)
        minus = cred[down][1]
        plus = cred[up][1]

        if minus < 0 and plus > 0:
            if plus > abs(minus):
                plusleft = plus + minus
                cred[up][1] = plusleft
                cred[down][1] = 0
                transactions.append([cred[up][0], cred[down][0], abs(minus/100)])
                down+=1
            elif plus < abs(minus):
                minusleft = minus + plus
                cred[down][1] = minusleft
                cred[up][1] = 0
                transactions.append([cred[up][0], cred[down][0], abs((minus-minusleft)/100)])
                up-=1
            else:
                up-=1
                minus+=1
        else:
            break
    return cred, transactions

def null_it(cred):
    scope = ['https://spreadsheets.google.com/feeds',
             'https://www.googleapis.com/auth/drive']

    creds = ServiceAccountCredentials.from_json_keyfile_name(
                r"C:\Users\s147057\Documents\CS50\Database-6141813cd99e.json", scope)

    client = gspread.authorize(creds)
    sheet  = client.open('Test').sheet1

    name_list = sheet.col_values(MENS_COL)
    for person in cred:
        row_num = name_list.index(person[0]) + 1
        sheet.update_cell(row_num, BIER_COL, 0)
        sheet.update_cell(row_num, PILS_COL, 0)
        sheet.update_cell(row_num, STAT_COL, 0)

        if person[1] == 0:
            sheet.update_cell(row_num, CREDIT_COL, 0)
        else:
            sheet.update_cell(row_num, CREDIT_COL, (person[1]/100))

def WBW_eenheid(transactions):
    URL = "https://wiebetaaltwat.nl/lists/4d0418db-caa2-481c-b5a5-98c3e4e2e3c2/expenses/new?order=desc&sort=payed_on"
    for trans in transactions:
            make_payment(URL,
                         trans[0],
                         trans[2],
                         [trans[1]],
                         keep_open = False)

def main():
    credit = get_credit()
    cred, transactions = get_transactions(credit)
    null_it(cred)
    WBW_eenheid(transactions)

    for i,t in enumerate(transactions):
        print(i, ':', t)

    for c in cred:
        if c[1] != 0:
            print(c[0], "still has a depth of", c[1])

if __name__ == '__main__':
    main()
