# Bitcoin Holding Bot
This bot buys bitcoin through binance. 

How to use

- In a .env file, define the ENVIRONMENT type, it can be "testnet" or "production" (the production is where you'll use real money. I recommend the testnet if it's your fist time trying the bot).
Example: ENVIRONMENT=testnet.
- In the same .env file, define your personal API key and secret key that binance provides for you.
Example: API_KEY="************"
         SECRET_KEY="**********"
- Define the pair of currency you want to buy (probably BTC/USDT) and the amount of money you're going to use in each order.
Example: SYMBOL="BTCUSDT"
         QUOTE_QUANTITY="10.00"

  Now you can run the bot
- In the terminal, inside your folder, run "npm install".
- In the terminal, inside your folder, run "node botbtchold" (or the name of the .js archive if you changed it). Press ctrl + c to stop it.
- You can also use pm2 to run it so you can close your tabs. 

*IMPORTANT*: The testnet from binance can show unreal prices, don't worry, if the code is running, everything is ok. Try it in the real binance api "production" with a small money amount
This isn't an investment recommendation.
