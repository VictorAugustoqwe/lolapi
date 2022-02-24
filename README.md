Esse projeto tem como objetivo criar uma api utilizadno axios para entender mais sobre apis requisições utilizando o axios e consultando a API do league of legends.
o script auto chama as funções sem requisitar a api

getM7 retorna os campeões que o invocador pode receber emblemas de maestria

getM5 retorna os campeões que o invocador tem maestria 4

getChest retorna os caméões que o invocador não tem baú

a api possui as rotas:

get('/summoner/:summonerName') - retorna o invocador

get('/masteries/:summonerName') - retorna as maestrias do invocador

get('/pegarEmblemas/:summonerName') - retorna os campeões que o invocador pode receber emblemas de maestria

get('/param5/:summonerName') - retorna os campeões que o invocador tem maestria 4 em ordem de maior pontuação

generateChampionIds é um script que retorna um objeto com o id de cada champion na api do leagueoflegends

para funcionar é necessário ter node, usar npm i para instalar as dependencias necessárias criar um .env com as seguintes linhas:

LOL_KEY = (código de acesso a api que deve ser obtido no painel de desenvolvedor da riot em: https://developer.riotgames.com/apis)

LOL_URL = https://br1.api.riotgames.com

LOL_CHAMPIONS = http://ddragon.leagueoflegends.com/cdn/11.20.1/data/en_US/champion.json

após isso basta executar index.js caso se deseje rodar o servidor

ou auto.js para executar o script com base no usuário passado no início do arquivo na variável summonerName

ou generateChampionIds para se ter um objeto com o id de cada champion na api do leagueoflegends
