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


async function getCategory(id) {
  try {
    const getCategory = lang => axios.get(`${serverService.api}/types/${id}/?lang=${lang || ''}`);
    const _category = await getCategory(' ');

    const { current } = langService;
    const { languages } = _category.data;

    const index = languages.indexOf(current);
    const lang = languages[index > -1 ? index : 0];

    const { data } = await getCategory(lang);
    data.lang = lang;
    return data;
  } catch (e) {
    console.error(e);
  }
}

export default {
  getCategory,
  getTopic,
}