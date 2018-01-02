import axios from 'axios';
import serverService from '../../../../services/server.service';

export async function get(id) {
  try {
    const { api } = serverService;
    const { data } = await axios.get(api + '/user_balance/?id=' + id);
    return data[0];
  } catch (error) {
    console.error(error);
  }
}