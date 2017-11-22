import texts from './content';

class Language {
  constructor() {
    this.languages = ["cn", "en", "ru", "lt"]; 
    this.language_names = ["中文", "English", "Русский", "Lietuvių"];
    
    // english default
    this.lang_index = 1;
    this.current = this.languages[this.lang_index];
    
    // reset default by user language
    this.setDefault();
  }
  
  setDefault() {
    const browser_language = navigator.language || navigator.userLanguage;
    let default_language = browser_language.substr(0, 2).toLowerCase();
    if (default_language == 'zh') { default_language = 'cn'; };

    const default_index = this.languages.indexOf(default_language);
    if( default_index > -1) {
      this.current = default_language;
      this.lang_index = default_index;
    }
  }

  changeLang(num) {
    if(num < 0 || num > this.languages.length) return;
    this.current = this.languages[num];
  }
 
  homeContent() {
    return texts.main[this.lang_index]
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