class Language {
  constructor() {
    this.languages = ['english']
    this.current = this.languages[0];
  }

  changeLang(num) {
    if(num < 0 || num > this.languages.length) return;
    this.current = this.languages[num];
  }
}

export default Language;