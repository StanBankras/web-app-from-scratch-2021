# Web app from scratch

## [Live website](https://stanbankras.github.io/web-app-from-scratch-2021/)

## Description
This project is my best attempt to build a modern web app from scratch, without any frameworks or big packages to do the hard work. It's totally new to me,
but I think going back to the roots is a good thing to learn how a framework really works.

<!-- Add a nice poster image here at the end of the week, showing off your shiny frontend 📸 -->

## Table of contents
* Chosen API
* Concept
* Installation
* Features
* Check/wishlist
* License

## Chosen API
I have chosen to work with the [Coinpaprika API](https://api.coinpaprika.com/). It's an API that has data of all live cryptocurrencies, ranked based on marketcap. The API is open, always free to use and very friendly to use. Using the API I can retrieve data per coin like on which exchanges it is listed, tweets related to the coin and upcoming events for the coin.

Endpoints used in this project:
* `/coins` - Retrieve all coins listed on Coinpaprika as object with their corresponding coin-id
* `/coins/${id}/ohlcv/historical` - Retrieve day to day historical price data from a coin
* `/coins/${id}/markets` - Retrieve trading markets that are active for this coin
* `/coins/${id}/twitter` & `/coins/${id}/events` - Retrieve latest Tweets & events by this coin's project

## Concept
The concept is to make an alternative to [Coinpaprika](https://coinpaprika.com/) where I show upcoming events and most recent tweets of a project, instead of raw data. This could help a normal person to better understand what is about to happen to the project that is behind the coin.

## Actor diagram
![Actor diagram](https://github.com/StanBankras/web-app-from-scratch-2021/blob/master/public/img/actor-diagram.png?raw=true)

## Interaction diagram
![Interaction diagram](https://github.com/StanBankras/web-app-from-scratch-2021/blob/master/public/img/interaction-diagram.png?raw=true)

## Installation

## Features

## Check/wishlist

## License
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)


<!-- Maybe a table of contents here? 📚 -->

<!-- How about a section that describes how to install this project? 🤓 -->

<!-- ...but how does one use this project? What are its features 🤔 -->

<!-- What external data source is featured in your project and what are its properties 🌠 -->

<!-- Maybe a checklist of done stuff and stuff still on your wishlist? ✅ -->

<!-- How about a license here? 📜 (or is it a licence?) 🤷 -->
