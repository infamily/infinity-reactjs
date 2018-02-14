import axios from 'axios';
import langService from '../../../services/lang.service';
import serverService from '../../../services/server.service';
const withoutToken = axios.create();

async function getTopic(id, server = null) {
  try {
    const serverLink = 'https://' + server;
    const isServerValid = server && serverService.api_servers.find(item => item === serverLink);
    const api = isServerValid ? serverLink : serverService.api;
    
    const getTopic = lang => withoutToken.get(`${api}/topics/${id}/?lang=${lang || ''}`);
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

async function getChildren(id, lang) {
  try {
    const { data } = await withoutToken.get(`${serverService.api}/topics/?parents=${id}&lang=${lang}`);
    return data.results;
  } catch (e) {
    console.error(e);
  }
}

function getComments(id, lang) {
  return new Promise((resolve, reject) => {
    withoutToken.get(`${serverService.api}/comments/?topic=${id}&lang=${lang}`)
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
}