import axios from 'axios';
import langService from 'services/lang.service';
import serverService from 'services/server.service';

export async function getSchemas() {
  const lang = langService.current;
  try {
    const { data } = await axios.get(
      `${serverService.api}/schemas/?lang=${lang}`
    );
    return data.results;
  } catch (e) {
    console.error(e);
    return null;
  }
}

export async function getInstance(id) {
  const lang = langService.current;
  try {
    const { data } = await axios.get(
      `${serverService.api}/instances/?schema=${id}&lang=${lang}`
    );
    return data.results;
  } catch (e) {
    console.error(e);
    return null;
  }
}
