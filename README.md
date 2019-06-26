# Final project for Minor programming
An extended version of the Minor programming final project. Instead of only font-end, this project will go full-stack.

This web application will help students find a room with a more useable dashboard then the boring scrolling one of kamernet self. Not only will you find a room faster, you could check history if there are sometimes better options! 

# Video
[youtube](https://www.youtube.com/watch?v=IniJDpC2hZA)

# Usage
* [visit the site](http://app.foknet.nl/)
* run ``` python -m http.server 8080 ``` to see it at local host port 8080

# Components
* Ubuntu server running Apache2 with multiple docker containers, connected by a reversed proxy.
* Scraper targeted at Kamernet.nl, scraping hourly. (running on the server)
* MySQL database running on the server
* RESTful API with +10 calls, also running on the server
* The main [site](http://app.foknet.nl/) with 7 pages.

# Data

Sources:
* [Kamernet](https://kamernet.nl/)
* [Gemeente](http://data.amsterdam/)

Data is scraped from kamernet, parsed into DataFrames with collums like, loaction, rent, size, furnitured, start data, url and up-time.
De Data from Asmterdam is mostly .xlxs files wich need to be cleaned and merged and some GeoJsons

# D3 blocks

For the visualisation part I'm using the D3 Libarie. A few pieces of code will function as examples.
* [Map](http://bl.ocks.org/JulesBlm/918e2987805c7189f568d95a4e8855b4)
* [Calander view](https://bl.ocks.org/alansmithy/6fd2625d3ba2b6c9ad48)
* [Sunburst](https://bl.ocks.org/denjn5/e1cdbbe586ac31747b4a304f8f86efa5)
* [histogram](https://bl.ocks.org/d3noob/96b74d0bd6d11427dd797892551a103c)




