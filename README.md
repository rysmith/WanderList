# WanderList

WanderList is for people who want to get information about a place they are
moving to.  Simply go to the website, sign up enter a location, then get information about home prices, demographic information, and restaurants.  Find it online at [www.wanderlist.info](http://www.wanderlist.info).

# Architecture

WanderList is built on the MEAN stack via [meanjs](http://meanjs.org/).  It uses [MongoLab](https://mongolab.com/) for hosting the database and [Heroku](https://www.heroku.com/) for hosting.
The Yo [meanjs generator](http://meanjs.org/generator.html) was used to scaffold the app, and [Bootstrap](http://getbootstrap.com/) for the CSS.

# APIs

WanderList uses the [Zillow API](http://www.zillow.com/howto/api/APIOverview.htm) for demographic and home prices.  The [Yelp API](https://www.yelp.com/developers) is used for the list of restaurants.
The [Google Maps API](https://developers.google.com/maps/) is used to display the maps.

# Up Coming Features

* Allow comparisons between two locations
* Add historical weather data via the [Dark Skies API](https://developer.forecast.io/)
* Allow users to input preferences and suggest locations that meet the specified criteria
