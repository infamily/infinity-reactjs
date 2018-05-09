import axios from 'axios';
import langService from 'services/lang.service';
import serverService from 'services/server.service';

const axiosNoToken = axios.create(); // to get data from other servers

async function getTopic(id) {
  try {
    const api = serverService.api;

    const getTopic = lang =>
      axiosNoToken.get(`${api}/topics/${id}/?lang=${lang || ''}`);
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
    const api = serverService.api;
    const { data } = await axiosNoToken.get(
      `${api}/topics/?parents=${id}&lang=${lang}`
    );
    return data.results;
  } catch (e) {
    console.error(e);
  }
}

async function getParents(id, lang) {
  try {
    const api = serverService.api;
    const { data } = await axiosNoToken.get(
      `${api}/topics/?children=${id}&lang=${lang}`
    );
    return data.results;
  } catch (e) {
    console.error(e);
  }
}

async function getComments(id, lang) {
  try {
    const api = serverService.api;
    const { data } = await axiosNoToken.get(
      `${api}/comments/?topic=${id}&lang=${lang}`
    );
    return data.results;
  } catch (e) {
    console.error(e);
  }
}

export default {
  getComments,
  getTopic,
  getChildren,
  getParents
};
