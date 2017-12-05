import axios from 'axios';
import langService from './lang.service';
import configs from '../configs';

class TopicViewService {
  constructor() {
    this.api = configs.api;
  }

  async createTopic(data, token) {
    const lang = langService.current;
    const { type, title, text, parents, categories } = data;
    try {
      const headers = { 'Authorization': 'Token ' + token };
      const parameters = {
        title: '.:' + lang + ':' + title,
        body: '.:' + lang + '\n' + text,
        languages: [lang],
        type, 
        parents,
        categories,
      };

      const { data } = await axios.post(this.api + '/topics/', parameters, { headers });
      return data;
    } catch (e) {
      console.error(e);
    }
  }

  async updateTopic(data, token) {
    const lang = langService.current;
    const { type, title, text, parents, categories, id } = data;
    try {
      const headers = { 'Authorization': 'Token ' + token };
      const parameters = {
        title: '.:' + lang + ':' + title,
        body: '.:' + lang + '\n' + text,
        languages: [lang],
        type,
        parents,
        categories,
      };

      console.log('parameters', parameters)      
      const { data } = await axios.patch(`${this.api}/topics/${id}/`, parameters, { headers });
      console.log('data', data)      
      return data;
    } catch (e) {
      console.error(e);
    }
  }

  async deleteTopic(id, token) {
    try {
      const headers = { 'Authorization': 'Token ' + token };
      await axios.delete(`${this.api}/topics/${id}/`, { headers });
      return 'success';
    } catch (e) {
      console.error(e);
    }
  }

  async search(query, flag) {
    const { current } = langService;
    const f = flag || '';
     
    try {
      const { data } = await axios.get(`${this.api}/topics/?search=${query}&lang=${current}&type=${f}`); 
      return data;
    } catch(e) {
      console.error(e);
    }
  } 

  async getCategories(token) {
    try {
      const { current } = langService;
      const headers = { 'Authorization': 'Token ' + token };

      const categories = await axios.get(`${this.api}/types/?category=true&lang=${current}`, { headers });
      return categories.data;
    } catch (e) {
      console.error(e);
    }
  } 
}

const topicViewService = new TopicViewService();
export default topicViewService;