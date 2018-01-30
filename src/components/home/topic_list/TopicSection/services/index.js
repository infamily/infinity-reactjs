import axios from 'axios';
import langService from '../../../../../services/lang.service';
import serverService from '../../../../../services/server.service';

export async function getChildren(id) {
  const lang = langService.current;
  try {
    const { data } = await axios.get(`${serverService.api}/topics/?parents=${id}&lang=${lang}`);
    return data.results;
  } catch (e) {
    console.error(e);
  }
}

export async function getParents(parents) {
  const formatted = [];

  for (let link of parents) {
    const parednt_id = link.match(/topics\/(\d+)/)[1];
    const topic = await getTopic(parednt_id);
    formatted.push(topic);
  }

  return formatted;
} 

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