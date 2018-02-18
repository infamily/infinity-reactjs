import axios from 'axios';
import langService from 'services/lang.service';
import serverService from 'services/server.service';

export async function getChildren(id) {
  const lang = langService.current;
  try {
    const { data } = await axios.get(`${serverService.api}/topics/?children=${id}&lang=${lang}`);
    return data.results;
  } catch (e) {
    console.error(e);
  }
}

export async function getParents(id) {
  const lang = langService.current;
  try {
    const { data } = await axios.get(`${serverService.api}/topics/?parents=${id}&lang=${lang}`);
    return data.results;
  } catch (e) {
    console.error(e);
  }
} 