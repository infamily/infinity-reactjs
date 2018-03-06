import axios from 'axios';
import serverService from 'services/server.service';

export async function postPayment(token) {
  try {
    const { api } = serverService;
    const response = await axios.post(api + '/payments', {
      body: JSON.stringify(token),
    });
    console.log(response, 'resp')
    const data = await response.json();
    alert(`We are in business, ${data.email}`);
  } catch (error) {
    console.error(error);
  }
}
