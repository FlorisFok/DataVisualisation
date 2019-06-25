from flask import Flask, redirect, render_template, request, jsonify
import json
from model import add_beer, get_all, add_krat, add_stat, get_names


app = Flask(__name__)

###############################################################################
beers =  range(1,25)
kratten = range(1,11)

## Select backend
# MODE = "CSV"
MODE = "google"


print(f"Back-end is using {MODE}")

temp_beer = 0
temp_name = ''
###############################################################################

# Reload templates when they are changed
app.config["TEMPLATES_AUTO_RELOAD"] = True


@app.after_request
def after_request(response):
    """Disable caching"""
    response.headers["Cache-Control"] = "no-cache, no-store, must-revalidate"
    response.headers["Expires"] = 0
    response.headers["Pragma"] = "no-cache"
    return response

@app.route("/")
def index():
    names = get_names()

    return render_template("index2.html", beers=beers, kratten = kratten, names=names)

@app.route("/krat")
def krat():
    names = get_names()
    return render_template("krat.html", beers=beers, kratten = kratten, names=names)

@app.route("/registrants")
def registrants():
    # Get some nice stats to show
    mens_list, beer_list = get_all()

    # Transfom stats to JSON
    data = {
	  "labels": [],
	  "series": [
	    {
	      "label": 'Zwerver',
	      "values": []
	    },
	    {
	      "label": 'Premium',
	      "values": []
	    },]
	};
    for mens, beer in zip(mens_list, beer_list):
        try:
            data["labels"].append(mens)
            data["series"][0]['values'].append(beer[0])
            data["series"][1]['values'].append(beer[1])
        except:
            pass

    # Return values for JavaScript Table
    return render_template("stats.html", data=json.dumps(data))


@app.route("/", methods=["POST"])
def index_back():
    names = get_names()
    return render_template("index2.html", beers=beers, kratten = kratten, names=names)


@app.route("/registrants", methods=["POST"])
def registrants_stats():
    return redirect("/registrants")


@app.route("/register", methods=["POST"])
def register():

    # Get all the forms
    temp_name = request.form.get("name")
    temp_beer = request.form.get("biertjes")
    temp_krat = request.form.get("kratten")
    temp_nivo = request.form.get("kwali")
    temp_stat = request.form.get("kratten2")

    # Check if they are filled in, takes action depending on mode
    if not temp_name:
        return render_template("failure.html", message = 'Please enter a name')

    elif not temp_beer and not temp_krat and not temp_nivo and not temp_stat:
        return render_template("failure.html",
               message = 'Please enter a a number of crates or bottles')

    elif not temp_krat and not temp_stat:
        if not temp_nivo:
            return render_template("failure.html",
                   message = 'Please enter the quality of the beer')

        add_beer(temp_name, temp_beer, temp_nivo)


    elif not temp_stat:
        if not temp_nivo:
            return render_template("failure.html",
                   message = 'Please enter the quality of the beer')

        add_krat(temp_name, temp_nivo, temp_krat)


    else:
        add_stat(temp_name, temp_stat)

    return redirect("/registrants")

if __name__ == '__main__':
    app.run(debug=True,host='0.0.0.0')
