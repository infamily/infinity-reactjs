import axios from 'axios';
import langService from './lang.service';
import configs from '../configs';

class TopicViewService {
  constructor() {
    this.api = configs.api;

    this.requestCategories = this.requestCategories.bind(this);
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
      
      console.log('parameters', parameters)
    } catch (e) {
      console.error(e);
    }
  }

  async search(query) {
    try {
      const { current } = langService;
      const { data } = await axios.get(`${this.api}/topics/?search=${query}&lang=${current}`); 
      return data;
    } catch(e) {
      console.error(e);
    }
  }

  async getCategories(token) {
    const cat_from_ls = this.getDataFromLS('categories');
    return cat_from_ls ? cat_from_ls : this.requestCategories(token);
  }

  async requestCategories(token) {
    try {
      const { current } = langService;
      const headers = { 'Authorization': 'Token ' + token };
  
      const categories = await axios.get(this.api + '/types/?category=true&lang=' + current, { headers });
      this.saveDataToLS('categories', categories.data);
      return categories.data;
    } catch (e) {
      console.error(e);
    }
  }

  saveDataToLS(name, data) {
    const lname = "inf:" + name;
    localStorage[lname] = JSON.stringify(data);
  }

  getDataFromLS(name) {
    const lname = "inf:" + name;
    const data = JSON.parse(localStorage[lname]);
    return data;
  }
 
}

const topicViewService = new TopicViewService();
export default topicViewService;