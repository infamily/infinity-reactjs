import texts from './content';
import axios from 'axios';
import serverService from './server.service';

class Language {
  constructor() {
    this.languages = [
      {
        "lang": "en",
        "name": "English",
        "enabled": true
      },
      {
        "lang": "lt",
        "name": "Lietuvių",
        "enabled": true
      },
      {
        "lang": "ru",
        "name": "Русский",
        "enabled": true
      },
      {
        "lang": "cn",
        "name": "中文",
        "enabled": true
      },
    ];

    this.current = this.languages[0].lang;
    this.language = this.languages[0];

    this.loadLanguages();
    this.setDefault();
  }

  loadLanguages = async () => {
    const { api_servers, api } = serverService;
    const server = api || api_servers[1] + '/api/v1';

    const { data } = await axios.get(server + '/language_names/');
    const filtered = data.filter(lang => lang.enabled);
    this.languages = filtered;
  }
  
  setDefault() {
    //get lang from localStorage
    const set = this.getSetting(); 
    
    if (set) {
      this.current = set.lang.lang;
      this.language = set.lang;
    } else {
      const browser_language = navigator.language || navigator.userLanguage;
      let default_language = browser_language.substr(0, 2).toLowerCase();
      if (default_language === 'zh') { default_language = 'cn'; };

      const lang = this.languages.find(lang => lang.lang === default_language);
      
      if (lang) {
        this.current = lang.lang;
        this.language = lang;
      }
    }
  }

  async changeLang(num) {
    this.current = this.languages[num].lang;
    this.language = this.languages[num];
    await this.saveSetting(this.language);
  }

  saveSetting(lang) {
    localStorage["lang_inf"] = JSON.stringify(lang);
  }

  getSetting() {
    const raw = localStorage["lang_inf"];
    if (!raw) return null;

    const lang = JSON.parse(raw);
    return {
      lang
    };
  }

  getServers() {
    const { servers } = texts.utils;
    return servers[this.current] || servers['en'];
  }
 
  homeContent() {
    return texts.main[this.current] || texts.main['en'];
  }

  howContent() {
    return texts.how[this.current] || texts.how['en'];
  }
  
  whatContent() {
    return texts.what[this.current] || texts.what['en'];
  }
}

const langService = new Language();
export default langService;