# DataVisualisation
D3 show off resp


# Proposal project

Scraping (maybe live updating by server and database) Kamernet.nl and visualizing the result in a more interactive way.
Also makes it  possiple to predict your room price (linear regression model).

###visualisations:
 * Custom map
 * Calander view of upload freqency
 * Tree visualisation of neighbourhood arrangement in Amsterdam.
 * Small graphs of trends


Of course they are linked, showing when stuff is uploaded and all room information.

Probably only for amsterdam, since more features are more impressive then more cities. Flask backend, own server, python preprocessing, d3 visuals, map + street view --> average for the month, histogram for room size, scatter plot for roomsize and price. and many more.


# Data

Sources:
* [Kamernet](https://kamernet.nl/)
* [Gemeente](http://data.amsterdam/)
* [Instagram](https://www.instagram.com/developer/)

Data is scraped from kamernet, parsed into DataFrames with collums like, loaction, rent, size, furnitured, start data and up-time.
De Data from Asmterdam is mostly .xlxs files wich need to be cleaned and merged.
The insta data is retrieved by API, to retrive local pictures.

# D3 blocks

For the visualisation part I'm using the D3 Libarie. A few pieces of code will function as examples.
* [Tide tree](https://observablehq.com/@d3/tidy-tree)
* [Calander view](http://bl.ocks.org/oyyd/859fafc8122977a3afd6)

