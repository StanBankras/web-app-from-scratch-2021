# Coinevents - Web app from scratch

This project is my best attempt to build a modern web app from scratch, without any frameworks or big packages to do the hard work. It's totally new to me,
but I think going back to the roots is a good thing to learn how a framework really works.

![Actor diagram](https://github.com/StanBankras/web-app-from-scratch-2021/blob/master/public/img/front-page.png?raw=true)

![Actor diagram](https://github.com/StanBankras/web-app-from-scratch-2021/blob/master/public/img/detail-page.png?raw=true)

## [Live website](https://stanbankras.github.io/web-app-from-scratch-2021/)

## Table of contents
* [Coinpaprika API](https://github.com/StanBankras/web-app-from-scratch-2021#coinpaprika-api)
* [Concept](https://github.com/StanBankras/web-app-from-scratch-2021#concept)
* [Features](https://github.com/StanBankras/web-app-from-scratch-2021#features)
* [Actor diagram](https://github.com/StanBankras/web-app-from-scratch-2021#actor-diagram)
* [Interaction diagram](https://github.com/StanBankras/web-app-from-scratch-2021#interaction-diagram)
* [Installation](https://github.com/StanBankras/web-app-from-scratch-2021#installation)
* [License](https://github.com/StanBankras/web-app-from-scratch-2021#features)

## :sweet_potato: Coinpaprika API
I have chosen to work with the [Coinpaprika API](https://api.coinpaprika.com/). It's an API that has data of all live cryptocurrencies, ranked based on marketcap. The API is open, always free to use and very friendly to use. Using the API I can retrieve data per coin like on which exchanges it is listed, tweets related to the coin and upcoming events for the coin.

**Base URL**
The base URL of this API is `https://api.coinpaprika.com/v1/`.

**Endpoints used in this project**:
* `/coins` - Retrieve all coins listed on Coinpaprika as object with their corresponding coin-id
* `/coins/${id}/ohlcv/historical` - Retrieve day to day historical price data from a coin
* `/coins/${id}/markets` - Retrieve trading markets that are active for this coin
* `/coins/${id}/twitter` & `/coins/${id}/events` - Retrieve latest Tweets & events by this coin's project

**Rate limit**

Coinpaprika limits the amount of requests per IP to [10 per second](https://api.coinpaprika.com/#section/Rate-limit). Make sure to handle this when using the API.

## :pencil2: Concept
The concept is to make an alternative to [Coinpaprika](https://coinpaprika.com/) where I show upcoming events and most recent tweets of a project, instead of raw data. This could help a normal person to better understand what is about to happen to the project that is behind the coin.

## :rocket: Features
:heavy_check_mark: Most recent tweet of all top 20 cryptos

:heavy_check_mark: Most latest event of all top 20 cryptos

:heavy_check_mark: Monthly price chart per coin

:heavy_check_mark: Find out which pairs the coin is traded against and where

## Actor diagram
![Actor diagram](https://github.com/StanBankras/web-app-from-scratch-2021/blob/master/public/img/actor-diagram-2.png?raw=true)

## Interaction diagram
![Interaction diagram](https://github.com/StanBankras/web-app-from-scratch-2021/blob/master/public/img/interaction-diagram-2.png?raw=true)

## :gear: Installation
**1. Clone the repository**

```git clone https://github.com/StanBankras/web-app-from-scratch-2021.git```

**2. Open the project with a liveserver**

Visual Studio Code offers a good live server that opens right from the code editor: [Live server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer). 

## License
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)


<!-- How about a section that describes how to install this project? 🤓 -->

<!-- ...but how does one use this project? What are its features 🤔 -->

<!-- What external data source is featured in your project and what are its properties 🌠 -->

<!-- Maybe a checklist of done stuff and stuff still on your wishlist? ✅ -->
