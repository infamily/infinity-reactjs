import axios from 'axios';
import langService from './lang.service';
import serverService from './server.service';

class TopicViewService {

  async createTopic(data) {
    const lang = langService.current;
    const { type, title, text, parents, categories, is_draft } = data;
    try {
      const parameters = {
        title: '.:' + lang + ':' + title,
        body: '.:' + lang + '\n' + text,
        languages: [lang],
        type, 
        parents,
        categories,
        is_draft,
      };

      const { data } = await axios.post(serverService.api + '/topics/', parameters);
      return data;
    } catch (e) {
      console.error(e);
    }
  }

  async updateTopic(data) {
    const lang = langService.current;
    const { type, title, text, parents, categories, id, is_draft } = data;
    try {
      const parameters = {
        title: '.:' + lang + ':' + title,
        body: '.:' + lang + '\n' + text,
        languages: [lang],
        type,
        parents,
        categories,
        is_draft,
      };

      const { data } = await axios.patch(`${serverService.api}/topics/${id}/`, parameters);
      return data;
    } catch (e) {
      console.error(e);
    }
  }

  async deleteTopic(id) {
    try {
      await axios.delete(`${serverService.api}/topics/${id}/`);
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

  async getCategories() {
    try {
      const { current } = langService;
      const categories = await axios.get(`${serverService.api}/types/?category=1&is_category=1&lang=${current}`);
      return categories.data;
    } catch (e) {
      console.error(e);
    }
  } 
}

const topicViewService = new TopicViewService();
export default topicViewService;
