import axios from 'axios';
import langService from './lang.service';
import serverService from './server.service';

class TopicViewService {

  async createTopic(data, token) {
    const lang = langService.current;
    const { type, title, text, parents, categories, is_draft } = data;
    try {
      const headers = { 'Authorization': 'Token ' + token };
      const parameters = {
        title: '.:' + lang + ':' + title,
        body: '.:' + lang + '\n' + text,
        languages: [lang],
        type, 
        parents,
        categories,
        is_draft,
      };

      const { data } = await axios.post(serverService.api + '/topics/', parameters, { headers });
      return data;
    } catch (e) {
      console.error(e);
    }
  }

  async updateTopic(data, token) {
    const lang = langService.current;
    const { type, title, text, parents, categories, id, is_draft } = data;
    try {
      const headers = { 'Authorization': 'Token ' + token };
      const parameters = {
        title: '.:' + lang + ':' + title,
        body: '.:' + lang + '\n' + text,
        languages: [lang],
        type,
        parents,
        categories,
        is_draft,
      };

      const { data } = await axios.patch(`${serverService.api}/topics/${id}/`, parameters, { headers });
      return data;
    } catch (e) {
      console.error(e);
    }
  }

  async deleteTopic(id, token) {
    try {
      const headers = { 'Authorization': 'Token ' + token };
      await axios.delete(`${serverService.api}/topics/${id}/`, { headers });
      return 'success';
    } catch (e) {
      console.error(e);
    }
  }

  async search(query, flag) {
    const { current } = langService;
    const f = flag || '';
     
    try {
      const { data } = await axios.get(`${serverService.api}/topics/?search=${query}&lang=${current}&type=${f}`); 
      return data;
    } catch(e) {
      console.error(e);
    }
  } 

  async getCategories(token) {
    try {
      const { current } = langService;
      const headers = { 'Authorization': 'Token ' + token };

      const categories = await axios.get(`${serverService.api}/types/?category=true&lang=${current}`, { headers });
      return categories.data;
    } catch (e) {
      console.error(e);
    }
  } 
}

const topicViewService = new TopicViewService();
export default topicViewService;