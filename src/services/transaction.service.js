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

  async getCurrencies() {
    if (this.currencies) return this.currencies;
    
    try {
      const { data } = await axios.get(`${serverService.api}/currencies/`);
      this.currencies = data;
      return data;
    } catch (e) {
      console.error(e);
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
