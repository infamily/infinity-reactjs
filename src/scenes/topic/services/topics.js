import axios from 'axios';
import langService from 'services/lang.service';
import serverService from 'services/server.service';
const axiosNoToken = axios.create(); // to get data from other servers

function getApi(server) {
  const serverLink = 'https://' + server;
  const isServerValid = server && serverService.api_servers.find(item => item === serverLink);
  return isServerValid ? serverLink : serverService.api;
}

async function getTopic(id, server = null) {
  try {
    const api = getApi(server);
    
    const getTopic = lang => axiosNoToken.get(`${api}/topics/${id}/?lang=${lang || ''}`);
    const _topic = await getTopic(' ');

    const { current } = langService;
    const { languages } = _topic.data;

    const index = languages.indexOf(current);
    const lang = languages[index > -1 ? index : 0];

    const { data } = await getTopic(lang);
    data.lang = lang;
    return data;
  } catch (e) {
    console.error(e);
  }
}

async function getChildren(id, lang, server = null) {
  try {
    const api = getApi(server);
    const { data } = await axiosNoToken.get(`${api}/topics/?children=${id}&lang=${lang}`);
    return data.results;
  } catch (e) {
    console.error(e);
  }
}

async function getParents(id, lang, server = null) {
  try {
    const api = getApi(server);
    const { data } = await axiosNoToken.get(`${api}/topics/?parents=${id}&lang=${lang}`);
    return data.results;
  } catch (e) {
    console.error(e);
  }
}

function getComments(id, lang, server = null) {
  const api = getApi(server);
  
  return new Promise((resolve, reject) => {
    axiosNoToken.get(`${api}/comments/?topic=${id}&lang=${lang}`)
      .then(function (response) {
        resolve(response.data.results);
      })
      .catch(function (error) {
        console.error(error);
        reject(error);
      });
  });
}

export default {
  getComments,
  getTopic,
  getChildren,
  getParents,
}