import axios from 'axios';
import server from 'services/server.service';

async function getHistory(id) {
  try {
    const { data } = await axios.get(
      server.api + '/contributions/?received_by=' + id
    );
    return data;
  } catch (error) {
    console.error(error);
  }
}

export async function getBalance(id) {
  try {
    const { data } = await axios.get(server.api + '/user_balance/?id=' + id);
    return data[0];
  } catch (error) {
    console.error(error);
  }
}

export default {
  getHistory,
  getBalance
};
