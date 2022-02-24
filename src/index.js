const axios = require("axios");
const express = require("express")
const { json } = require("express")
require('dotenv').config()

const app = express();



app.use(json())
app.listen(3333)

app.get('/', async(req, res) => {
    res.send("hello world")
})

app.get('/summoner/:summonerName', async(req, res) => {
    const { summonerName } = req.params
    const summonerInResponse = await axios
    .get(`${process.env.LOL_URL}/lol/summoner/v4/summoners/by-name/${summonerName}`,
        { headers: { 'X-Riot-Token': process.env.LOL_KEY } })
    .catch(e => {
        return res.status(e.response.status).json(e.response.data)
    })
    // console.log(summonerInResponse)
    res.send(summonerInResponse.data)
})

app.get('/masteries/:summonerName', async(req, res) => {
    const { summonerName } = req.params
    const summonerInResponse = await axios
    .get(`${process.env.LOL_URL}/lol/summoner/v4/summoners/by-name/${summonerName}`,
        { headers: { 'X-Riot-Token': process.env.LOL_KEY } })
    .catch(e => {
        return res.status(e.response.status).json(e.response.data)
    })
    const summonerId = summonerInResponse.data.id; 

    const masteries = await axios
    .get(`${process.env.LOL_URL}/lol/champion-mastery/v4/champion-masteries/by-summoner/${summonerId}`,
        { headers: { 'X-Riot-Token': process.env.LOL_KEY } })
    .catch(e => {
        return res.status(e.response.status).json(e.response.data)
    })
    const idChampion = {};
    const champions = await axios
    .get(process.env.LOL_CHAMPIONS)
    .catch(error => {
        console.log("Não foi possível encontrar os dados")
        console.log(error);
        return 0;
    })
    const allChamps = champions.data.data;
    Object.keys(allChamps).forEach(champion => {
        idChampion[allChamps[champion].key] = allChamps[champion].id;
    })
    // console.log(idChampion);
    // console.log(masteries);
    const resposta = [];
    masteries.data.forEach((maestria) => {
        resposta.push({champion: idChampion[maestria.championId], nivel: maestria.championLevel, pontos: maestria.championPoints, paraProximoNivel: maestria.championPointsUntilNextLevel, emblemas: maestria.tokensEarned })
    })
    res.send(resposta)
})

app.get('/pegarEmblemas/:summonerName', async(req, res) => {
    const { summonerName } = req.params
    const summonerInResponse = await axios
    .get(`${process.env.LOL_URL}/lol/summoner/v4/summoners/by-name/${summonerName}`,
        { headers: { 'X-Riot-Token': process.env.LOL_KEY } })
    .catch(e => {
        return res.status(e.response.status).json(e.response.data)
    })
    console.log(summonerInResponse.data)
    const summonerId = summonerInResponse.data.id; 

    const masteries = await axios
    .get(`${process.env.LOL_URL}/lol/champion-mastery/v4/champion-masteries/by-summoner/${summonerId}`,
        { headers: { 'X-Riot-Token': process.env.LOL_KEY } })
    .catch(e => {
        return res.status(e.response.status).json(e.response.data)
    })
    const idChampion = {};
    const champions = await axios
    .get(process.env.LOL_CHAMPIONS)
    .catch(error => {
        console.log("Não foi possível encontrar os dados")
        console.log(error);
        return 0;
    })
    const allChamps = champions.data.data;
    Object.keys(allChamps).forEach(champion => {
        idChampion[allChamps[champion].key] = allChamps[champion].id;
    })
    // console.log(idChampion);
    // console.log(masteries);
    const resposta = [];
    masteries.data.forEach((maestria) => {
        if((maestria.championLevel == 5 && maestria.tokensEarned != 2) || (maestria.championLevel == 6 && maestria.tokensEarned != 3))
            resposta.push(idChampion[maestria.championId])
    })
    res.send(resposta)
})

app.get('/param5/:summonerName', async(req, res) => {
    const { summonerName } = req.params
    const summonerInResponse = await axios
    .get(`${process.env.LOL_URL}/lol/summoner/v4/summoners/by-name/${summonerName}`,
        { headers: { 'X-Riot-Token': process.env.LOL_KEY } })
    .catch(e => {
        return res.status(e.response.status).json(e.response.data)
    })
    const summonerId = summonerInResponse.data.id; 

    const masteries = await axios
    .get(`${process.env.LOL_URL}/lol/champion-mastery/v4/champion-masteries/by-summoner/${summonerId}`,
        { headers: { 'X-Riot-Token': process.env.LOL_KEY } })
    .catch(e => {
        return res.status(e.response.status).json(e.response.data)
    })
    const idChampion = {};
    const champions = await axios
    .get(process.env.LOL_CHAMPIONS)
    .catch(error => {
        console.log("Não foi possível encontrar os dados")
        console.log(error);
        return 0;
    })
    const allChamps = champions.data.data;
    Object.keys(allChamps).forEach(champion => {
        idChampion[allChamps[champion].key] = allChamps[champion].id;
    })
    // console.log(idChampion);
    // console.log(masteries);
    const resposta = [];
    masteries.data.forEach((maestria) => {
        if(maestria.championLevel == 4)
            resposta.push({champion: idChampion[maestria.championId], nivel: maestria.championLevel, pontos: maestria.championPoints, paraProximoNivel: maestria.championPointsUntilNextLevel})
    })
    res.send(resposta)
})