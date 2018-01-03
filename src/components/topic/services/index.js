import axios from 'axios';
import langService from '../../../services/lang.service';
import serverService from '../../../services/server.service';

async function getTopic(id) {
  try {
    const getTopic = lang => axios.get(`${serverService.api}/topics/${id}/?lang=${lang || ''}`);
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

function getComments(id, lang) {
  return new Promise((resolve, reject) => {
    axios.get(`${serverService.api}/comments/?topic=${id}&lang=${lang}`)
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
  getTopic
}