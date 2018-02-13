import axios from 'axios';
import langService from '../../../services/lang.service';
import serverService from '../../../services/server.service';

export async function getSchemas() {
  const lang = langService.current;
  try {
    const { data } = await axios.get(`${serverService.api}/schemas/?lang=${lang}`);

    const NullSchema = {
      name: 'None',
      url: 'null',
    };
    const withNull = [NullSchema].concat(data.results);
    return withNull;
  } catch (e) {
    console.error(e);
  }
}

export async function getInstances() {
  const lang = langService.current;
  try {
    const { data } = await axios.get(`${serverService.api}/instances/?lang=${lang}`);
    const formatted = data.results.map(item => {
      if (item.schema === null) item.schema = 'null';
      return item;
    });

    return formatted;
  } catch (e) {
    console.error(e);
  }
}