const axios = require("axios");
require('dotenv').config()

axios.get(process.env.LOL_CHAMPIONS)
    .then(response => {
        const allChamps = response.data.data;
        const idChampion = {};
        Object.keys(allChamps).forEach(champion => {
            idChampion[allChamps[champion].key] = allChamps[champion].id;
        })
        console.log(idChampion);
    })
    .catch(error => {
        console.log("Não foi possível encontrar os dados")
        console.log(error);
        return 0;
    })

