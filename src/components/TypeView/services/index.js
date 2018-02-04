import axios from 'axios';
import langService from '../../../services/lang.service';
import serverService from '../../../services/server.service';

export async function getType(id) {
  const lang = langService.current;
  try {
    const { data } = await axios.get(`${serverService.api}/types/${id}/?lang=${lang}`);
    return data;
  } catch (e) {
    console.error(e);
  }
}