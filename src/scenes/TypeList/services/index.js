import axios from 'axios';
import langService from 'services/lang.service';
import serverService from 'services/server.service';

const getId = url => url.match(/types\/(.*)\//)[1]; // get type id
const localTypes = {};

export async function getTypes() {
  const lang = langService.current;
  if (localTypes.data && lang === localTypes.lang) return localTypes.data; // to avoid excess requests for types

  try {
    const { data } = await axios.get(
      `${serverService.api}/types/?lang=${lang}`
    );
    const types = data.map(item => {
      item.id = getId(item.url);
      return item;
    });
    localTypes.data = types;
    localTypes.lang = lang;
    return types;
  } catch (e) {
    console.error(e);
  }
}
