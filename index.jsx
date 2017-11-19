var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var IndexRoute = ReactRouter.IndexRoute;
var Link = ReactRouter.Link;
var browserHistory = ReactRouter.browserHistory;

console.log(location)
var RouteA = React.createClass({
  btnClickB() {
    browserHistory.push('/b');
  },
  btnClickC() {
    browserHistory.push('/c');
  },

  render() {
    return (
      <div>
        <h2>How</h2>
        <div>
          <button className="btn btn-default" onClick={this.btnClickB}>Home</button>
          <button className="btn btn-default" onClick={this.btnClickC}>About</button>
        </div>
      </div>
    );
  }
})

var RouteB = React.createClass({
  btnClickA() {
    browserHistory.push('/a');
  },

  btnClickC() {
    browserHistory.push('/c');
  },

  render() {
    return (
      <div>
        <h2>Home</h2>
        <div>
          <button className="btn btn-default" onClick={this.btnClickA}>How</button>
          <button className="btn btn-default" onClick={this.btnClickC}>About</button>
        </div>
      </div>
    );
  }
})

var RouteC = React.createClass({
  btnClickA() {
    browserHistory.push('/a');
  },

  btnClickB() {
    browserHistory.push('/b');
  },

  render() {
    return (
      <div>
        <h2>About</h2>
        <div>
          <button className="btn btn-default" onClick={this.btnClickA}>How</button>
          <button className="btn btn-default" onClick={this.btnClickB}>Home</button>
        </div>
      </div>
    );
  }
})

ReactDOM.render(
  <Router history={browserHistory}>
      <Route path="/" component={RouteA} />
      <Route path="/a" component={RouteA} />
      <Route path="/b" component={RouteB} />
      <Route path="/c" component={RouteC} />
      <Route path="*" component={RouteA} />
  </Router>,
  document.getElementById('container')
);
