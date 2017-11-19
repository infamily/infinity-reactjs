import React, { Component } from 'react';

class Home extends Component {
  constructor() {
    super();
    this.state = {
      search: 'english'
    }
  }

  render() {
    const Header = () => {
      return this.state.search === 'english' 
      ? <div className="header">
          <h1 className="topics__title en">Infinity Family</h1>
          <form className="topics__search">
            <input type="search" className="topics__search-input" />
            <button className="en">Search</button>
          </form>
        </div>
      : <div className="header">
          <h1 className="topics__title zh">无界家庭</h1>
          <form className="topics__search">
            <input type="search" className="topics__search-input" />
            <button className="zh">Search in Chineese</button>
          </form>
        </div>;
    }

    return (
      <div className="main">
        <article className="topics">
          <div className="topics__content">
            <Header />
            <div className="topics__list"></div>
          </div>
        </article>
      </div>
    );
  }
}

export default Home;
