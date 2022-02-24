const axios = require("axios");
require('dotenv').config()
const summonerName = "Reciclagem"


async function getM7(){
    const summonerInResponse = await axios
    .get(`${process.env.LOL_URL}/lol/summoner/v4/summoners/by-name/${summonerName}`,
        { headers: { 'X-Riot-Token': process.env.LOL_KEY } })
    .catch(e => {
        console.log(e);
        return -1
    })
    const summonerId = summonerInResponse.data.id; 
    
    const masteries = await axios
    .get(`${process.env.LOL_URL}/lol/champion-mastery/v4/champion-masteries/by-summoner/${summonerId}`,
        { headers: { 'X-Riot-Token': process.env.LOL_KEY } })
    .catch(e => {
        console.log(e);
        return -1
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
    console.log("Pegar m7:")
    console.log(resposta);
}

async function getM5(){
    const summonerInResponse = await axios
    .get(`${process.env.LOL_URL}/lol/summoner/v4/summoners/by-name/${summonerName}`,
        { headers: { 'X-Riot-Token': process.env.LOL_KEY } })
    .catch(e => {
        console.log(e);
        return -1
    })
    const summonerId = summonerInResponse.data.id; 

    const masteries = await axios
    .get(`${process.env.LOL_URL}/lol/champion-mastery/v4/champion-masteries/by-summoner/${summonerId}`,
        { headers: { 'X-Riot-Token': process.env.LOL_KEY } })
    .catch(e => {
        console.log(e);
        return -1
    })
    const idChampion = {};
    const champions = await axios
    .get(process.env.LOL_CHAMPIONS)
    .catch(error => {
        console.log("Não foi possível encontrar os dados")
        console.log(error);
        return -1;
    })
    const allChamps = champions.data.data;
    Object.keys(allChamps).forEach(champion => {
        idChampion[allChamps[champion].key] = allChamps[champion].id;
    })
    const resposta = [];
    masteries.data.forEach((maestria) => {
        if(maestria.championLevel == 4)
            resposta.push(idChampion[maestria.championId])
    })
    console.log("Pegar m5:")
    console.log(resposta)
}

async function getChest(){
    const summonerInResponse = await axios
    .get(`${process.env.LOL_URL}/lol/summoner/v4/summoners/by-name/${summonerName}`,
        { headers: { 'X-Riot-Token': process.env.LOL_KEY } })
    .catch(e => {
        console.log(e);
        return -1
    })
    const summonerId = summonerInResponse.data.id; 

    const masteries = await axios
    .get(`${process.env.LOL_URL}/lol/champion-mastery/v4/champion-masteries/by-summoner/${summonerId}`,
        { headers: { 'X-Riot-Token': process.env.LOL_KEY } })
    .catch(e => {
        console.log(e);
        return -1
    })
    const idChampion = {};
    const champions = await axios
    .get(process.env.LOL_CHAMPIONS)
    .catch(error => {
        console.log("Não foi possível encontrar os dados")
        console.log(error);
        return -1;
    })
    const allChamps = champions.data.data;
    Object.keys(allChamps).forEach(champion => {
        idChampion[allChamps[champion].key] = allChamps[champion].id;
    })
    const resposta = [];
    masteries.data.forEach((maestria) => {
        if(maestria.chestGranted == false)
            resposta.push(idChampion[maestria.championId])
    })
    console.log("Pegar bau:")
    console.log(resposta)
}
getM7();
getM5();
getChest();