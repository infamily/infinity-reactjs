import axios from 'axios';
import serverService from './server.service';

class TransactionService {
  constructor() {
    this.currencies = null;
  }
  
  async createTransaction(data, comment, user) {
    const { payment_amount, payment_currency } = data;

    try {
      const headers = { 'Authorization': 'Token ' + user.token };
      
      const parameters = {
        comment: comment.url,
        payment_amount,
        payment_currency,
        payment_sender: user.id,
      }; 

      const { data } = await axios.post(serverService.transactions + '/transactions/', parameters, { headers });

      return data;
    } catch(e) {
      console.error(e);
    } 
  }
  
  async updateTransaction(id, text, token) {
    try {
      const headers = { 'Authorization': 'Token ' + token };
      const parameters = {
        
      }; 

      const { data } = await axios.patch(`${serverService.transactions}/transactions/${id}/`, parameters, { headers });
      data.text = text;

      return data;
    } catch(e) {
      console.error(e);
    } 
  }

  async deleteTransaction(id, data, comment, user) {
    try {
      const headers = { 'Authorization': 'Token ' + user.token }; 
      await axios.delete(`${serverService.transactions}/transactions/${id}/`, { headers });
      return 'success';
    } catch(e) {
      console.error(e);
    }
  }

  async getCurrencies() {
    if (this.currencies) return this.currencies;
    
    try {
      const { data } = await axios.get(`${serverService.transactions}/currencies/`);
      this.currencies = data;
      return data;
    } catch (e) {
      console.error(e);
    }
  } 
  
  async getTransactions(id) {
    try {
      const { data } = await axios.get(`${serverService.transactions}/transactions/?comment=${id}`);
      return data;
    } catch (e) {
      console.error(e);
    }
  } 
}

const transactionService = new TransactionService();
export default transactionService;