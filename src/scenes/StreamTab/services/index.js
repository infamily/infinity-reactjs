import axios from 'axios';
import langService from '../../../services/lang.service';
import serverService from '../../../services/server.service';

export async function getSchemas() {
  const lang = langService.current;
  try {
    const { data } = await axios.get(`${serverService.api}/schemas/?lang=${lang}`);
    return data.results;
  } catch (e) {
    console.error(e);
  }
}