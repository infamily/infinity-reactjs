import axios from 'axios';
import serverService from './server.service';

class TransactionService {
  constructor() {
    this.currencies = null;
  }
  
  async createTransaction(data, comment, user) {
    const { payment_amount, payment_currency } = data;

    try {
      const parameters = {
        comment: comment.url,
        payment_amount,
        payment_currency,
        payment_sender: user.id,
      }; 

      const { data } = await axios.post(serverService.api + '/transactions/', parameters);

      return data;
    } catch(e) {
      console.error(e);
    } 
  }

  async deleteTransaction(id, data, comment, user) {
    try {
      await axios.delete(`${serverService.api}/transactions/${id}/`);
      return 'success';
    } catch(e) {
      console.error(e);
    }
  }

  getCurrencies = async () => {
    if (this.currencies && this.currencies.length) return this.currencies;
    
    try {
      const { data } = await axios.get(`${serverService.api}/currencies/`);
      const filtered = data.filter(item => item.enabled);
      this.currencies = filtered;
      return data;
    } catch (e) {
      console.error(e);
    }
  }

  async getUserBalance(id) {
    try {
      const { api } = serverService;
      const { data } = await axios.get(api + '/user_balance/?id=' + id);
      return data[0];
    } catch (error) {
      console.error(error);
    }
  }
  
  async getTransactions(id) {
    try {
      const { data } = await axios.get(`${serverService.api}/transactions/?comment=${id}`);
      return data;
    } catch (e) {
      console.error(e);
    }
  } 
}

const transactionService = new TransactionService();
export default transactionService;
