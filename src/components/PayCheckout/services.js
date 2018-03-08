import axios from 'axios';
import serverService from 'services/server.service';

export async function postPayment(data) {
  try {
    const { api } = serverService;
    const [exp_month, exp_year] = data.expiry.split('/');
    const formatted = {
      "amount": data.amount,
      "currency": data.currency,
      "card": {
        "number": data.number,
        "cvc": data.cvc,
        exp_month,
        exp_year,
      },
      "description": data.description,
    };

    const response = await axios.post(api + '/payments', {
      data: formatted,
    });

    return response;
  } catch (error) {
    console.error(error);
  }
}
