require('dotenv').config();

// assinar chamada da api da binance
const crypto = require("crypto");

// requisições http
const axios = require("axios");

// save state
const fs = require('fs');

const ENVIRONMENT = process.env.ENVIRONMENT || 'testnet';
const SYMBOL = process.env.SYMBOL;
const QUOTE_QUANTITY = process.env.QUOTE_QUANTITY;
const API_KEY = process.env.API_KEY;
const SECRET_KEY = process.env.SECRET_KEY;

const API_URLS = { testnet: "https://testnet.binance.vision", production: "https://api.binance.com" };
const API_URL = API_URLS[ENVIRONMENT];
const STATE_FILE = 'state.json';

const DIP_THRESHOLD_PERCENTAGE = 1.0;

// Identificar erros

if (!API_KEY || !SECRET_KEY || !SYMBOL || !QUOTE_QUANTITY) {
    console.error("ERRO: Uma ou mais variáveis de ambiente estão faltando.");
    console.error("Verifique se o seu arquivo .env está completo com API_KEY, SECRET_KEY, SYMBOL e QUOTE_QUANTITY.");
    process.exit(1);
}

console.log(`--- Iniciando o Bot em modo: ${ENVIRONMENT.toUpperCase()} ---`);
console.log(`--- Operando o par: ${SYMBOL} com valor de ${QUOTE_QUANTITY} ---`);
console.log(`--- Gatilho de compra: Preço atual <= ${DIP_THRESHOLD_PERCENTAGE}% acima da mínima de 24h ---`);

// Funções para carregar e salvar as posições das médias
function loadState() {
    if (fs.existsSync(STATE_FILE)) {
        console.log("Arquivo de estado encontrado! Carregando...");
        const stateJSON = fs.readFileSync(STATE_FILE);
        return JSON.parse(stateJSON);
    }
    console.log("Nenhum arquivo de estado encontrado. Criando um novo...");
    return { lastPurchaseTimestamp: 0 };
}

function saveState(state) {
    const stateJSON = JSON.stringify(state, null, 2);
    fs.writeFileSync(STATE_FILE, stateJSON);
}

// Parâmetros para execução da ordem

async function start() {
    try {
        const state = loadState();
        const now = Date.now();
        const twentyFourHours = 24 * 60 * 60 * 1000;

        // Verifica se já houve compra nas últimas 24h
        if (now - state.lastPurchaseTimestamp < twentyFourHours) {
            const timeSinceLastBuy = Math.floor((now - state.lastPurchaseTimestamp) / (60 * 1000));
            console.clear();
            console.log(`Compra realizada há ${timeSinceLastBuy} minutos. Aguardando o período de 24 horas...`);
            return;
        }

        // Busca dados das últimas 24h (velas de 1 hora)
        const { data } = await axios.get(`${API_URL}/api/v3/klines?symbol=${SYMBOL}&interval=1h&limit=24`);

        const currentPrice = parseFloat(data[data.length - 1][4]);

        // Calcula a mínima das últimas 24 velas
        const low24h = Math.min(...data.map(candle => parseFloat(candle[3])));

        // Define o preço gatilho para a compra
        const buyThresholdPrice = low24h * (1 + (DIP_THRESHOLD_PERCENTAGE / 100));

        console.clear();
        console.log(`Preço Atual (${SYMBOL}): ${currentPrice.toFixed(2)}`);
        console.log(`Mínima das últimas 24h: ${low24h.toFixed(2)}`);
        console.log(`Gatilho de Compra (Preço <=): ${buyThresholdPrice.toFixed(2)}`);

        // Verifica se o preço atual atingiu o gatilho
        if (currentPrice <= buyThresholdPrice) {
            console.log("Queda significativa detectada! Preço atual está próximo da mínima de 24h.");
            console.log("Criando ordem de compra...");

            await newOrder(SYMBOL, QUOTE_QUANTITY, "buy");

            saveState({ lastPurchaseTimestamp: Date.now() });
        } else {
            console.log("Aguardando uma queda de preço mais acentuada para comprar...");
        }
    } catch (err) {
        console.error("Ocorreu um erro no loop principal:", err.message);
    }
}

// Função para criar ordem 

async function newOrder(symbol, quoteQuantity, side) {
    const order = { 
        symbol, 
        side, 
        type: "MARKET", 
        quoteOrderQty: quoteQuantity,
        timestamp: Date.now() 
    };

    const signature = crypto
        .createHmac("sha256", SECRET_KEY)
        .update(new URLSearchParams(order).toString())
        .digest("hex");

    order.signature = signature;

    try {
        const { data } = await axios.post(
            `${API_URL}/api/v3/order`,
            new URLSearchParams(order).toString(),
            { headers: { "X-MBX-APIKEY": API_KEY } }
        );
        console.log("Ordem criada com sucesso:", data);
    } catch (err) {
        console.error("Erro ao criar a ordem:", err.response ? err.response.data : err.message);
    }
}

setInterval(start, 300000);
start();