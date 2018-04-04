import axios from 'axios';
import serverService from 'services/server.service';

export async function postPayment(data, platform) {
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

    const response = await axios.post(api + '/payments/', {
      request: formatted,
      platform: platform,
      provider: platform,
    });

    return { data: response, error: null };
  } catch (error) {
    return { data: null, error };
  }
}
