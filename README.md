# Bitcoin Holding Bot
## 🇺🇸 English description

This bot buys bitcoin through binance. 

How to use

- In a .env file, define the ENVIRONMENT type, it can be "testnet" or "production" (the production is where you'll use real money. I recommend the testnet if it's your fist time trying the bot).
Example: ENVIRONMENT=testnet.
- In the same .env file, define your personal API key and secret key that binance provides for you.
Example: API_KEY="12345678"
         SECRET_KEY="12345678"
- Define the pair of currency you want to buy (in testnet only BTC/USDT works) and the amount of money you're going to use in each order.
Example: SYMBOL="BTCUSDT"
         QUOTE_QUANTITY="10.00"

  Now you can run the bot
- In the terminal, inside your folder, run "npm install".
- In the terminal, inside your folder, run "node botbtchold" (or the name of the .js archive if you changed it). Press ctrl + c to stop it.
- You can also use pm2 to run it so you can close your tabs. 

*IMPORTANT*: The testnet from binance can show unreal prices, don't worry, if the code is running, everything is ok. Try it in the real binance api "production" with a small money amount
This isn't an investment recommendation.





## 🇧🇷 Descrição em português

Este bot compra bitcoins através da Binance.

Como usar

- Em um arquivo .env, defina o tipo de ENVIRONMENT, que pode ser "testnet" ou "production" (a production é onde você usará dinheiro real. Recomendo a testnet se for sua primeira vez testando o bot).
Exemplo: ENVIRONMENT=testnet.
- No mesmo arquivo .env, defina sua chave de API pessoal e a chave secreta que a Binance fornece.
Exemplo: API_KEY="12345678"
         SECRET_KEY="12345678"
- Defina o par de moedas que deseja comprar (no testnet só funciona BTC/USDT) e a quantia que usará em cada ordem.
Exemplo: SYMBOL="BTCUSDT"
         QUOTE_QUANTITY="10.00"

  Agora você pode executar o bot.
- No terminal, dentro da sua pasta, execute "npm install".
- No terminal, dentro da sua pasta, execute "node botbtchold" (ou o nome do arquivo .js, caso tenha alterado). Pressione Ctrl + C para interromper a execução.
- Você também pode usar o pm2 para executá-lo e fechar suas abas.

*IMPORTANTE*: A rede de testes da Binance pode mostrar preços irreais; não se preocupe, se o código estiver em execução, está tudo certo. Experimente na API real da Binance "production" com uma pequena quantia em dinheiro. 
Isso não é uma recomendação de investimento.
