import gspread
from oauth2client.service_account import ServiceAccountCredentials
import time

MENS_COL = 1
BIER_COL = 2
PILS_COL = 3
TIME_COL = 4
CREDIT_COL = 5
STAT_COL = 6

STATIE = 3.90
BOTTLES = 24
ZWERVER = 0.35
PREMIUM = 0.60
# Gives some flexability to small price changes
PRICE_BARRIER = 0.5

def use_sheet(name = 'Test'):
	'''
	Connect with api
	'''
	scope = ['https://spreadsheets.google.com/feeds',
	         'https://www.googleapis.com/auth/drive']

	creds = ServiceAccountCredentials.from_json_keyfile_name('Database-6141813cd99e.json', scope)
	client = gspread.authorize(creds)

	sheet  = client.open(name).sheet1

	return sheet


def set_up(sheet):
	'''
	Set up, if got empty sheet (mannually activation)
	usage:
	cmd: ...path_to_file>python
	import mdoel
	sheet = model.use_sheet("name")
	set_up(sheet)

	OR

	Run as main
	'''
	try:
		sheet.update_cell(1, MENS_COL, 'Mensen')
		sheet.update_cell(1, BIER_COL, 'Lager')
		sheet.update_cell(1, PILS_COL, 'Pils')
		sheet.update_cell(1, TIME_COL, 'Laatste biertje')
		sheet.update_cell(1, CREDIT_COL, 'Biertjes tegoed')
	except:
		return 1
	return 0


def add_beer(mens, biertjes, niveau):
	'''
	Mens (str), stuff (list), finds row of mens, adds stuff
	'''
	sheet = use_sheet()

	row_num = find_mens_row(mens, sheet)

	if float(niveau) < PRICE_BARRIER:
		update(sheet, row_num, mens, BIER_COL, int(biertjes))
	else:
		update(sheet, row_num, mens, PILS_COL, int(biertjes))

	tijd = time_stamp()
	sheet.update_cell(row_num, TIME_COL, tijd)

	return 0


def add_krat(mens, niveau, krat):
	'''
	Add krat
	'''
	sheet = use_sheet()
	row_num = find_mens_row(mens, sheet)
	update(sheet, row_num, mens, CREDIT_COL,
		   int(krat)*BOTTLES*float(niveau))

	return 0


def add_stat(mens, stat):
	'''
	Add statiegeld
	'''
	sheet = use_sheet()
	row_num = find_mens_row(mens, sheet)
	update(sheet, row_num, mens, STAT_COL, int(stat)*STATIE)

	return 0


def get_all():
	'''
	Get all beer consumed, combined both cheap and premium pils
	Can be used for future projects to track alc. %.
	'''
	sheet = use_sheet()

	mens_list = sheet.col_values(MENS_COL)
	beer_list1 = sheet.col_values(BIER_COL)
	beer_list2 = sheet.col_values(PILS_COL)

	beer_list = []

	for b,b2 in zip(beer_list1[1:], beer_list2[1:]):
		try:
			beer_list.append((int(b), int(b2)))
		except:
			beer_list.append((0, 0))

	return mens_list[1:], beer_list

def get_names():
	'''
	Get all beer consumed, combined both cheap and premium pils
	Can be used for future projects to track alc. %.
	'''
	sheet = use_sheet()
	mens_list = sheet.col_values(MENS_COL)

	return mens_list[1:]

def null(sheet,mens,row_num):
	"""
	Makes sure you start with empty row
	"""
	sheet.update_cell(row_num, BIER_COL, 0)
	sheet.update_cell(row_num, PILS_COL, 0)
	sheet.update_cell(row_num, CREDIT_COL, 0)
	sheet.update_cell(row_num, STAT_COL, 0)


def update(sheet, row_num, mens, COL, new_values):
	'''
	Checks if cell is empty to place value, otherwise add to old value
	'''
	print(new_values)
	try:
		old_value = int(sheet.cell(row_num, COL).value)
		print('old', old_value)
		sheet.update_cell(row_num, COL, float(new_values) + old_value)
	except:
		sheet.update_cell(row_num, COL, float(new_values))


def find_mens_row(mens, sheet):
	'''
	Find the correct row of a person
	'''
	name_list = sheet.col_values(MENS_COL)

	try:
		row_num = name_list.index(mens) + 1
	except:
		row_num = len(name_list) + 1
		sheet.update_cell(row_num, MENS_COL, mens)

	return row_num


def time_stamp():
	'''
	Get local time, and make nice string
	'''
	tijd = (str(time.gmtime().tm_mday) + "/" +
			str(time.gmtime().tm_mon) + "/" +
			str(time.gmtime().tm_year) + ' || ' +
			str(time.gmtime().tm_hour) + ':' +
			str(time.gmtime().tm_min) + '.')
	return tijd

def wbw():
	pass

if __name__ == '__main__':
	sheet = use_sheet()
	set_up(sheet)
