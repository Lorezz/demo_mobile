import './css/main.css';
import React from 'react';
import ReactDOM from 'react-dom';
import ReviewBox from './components/ReviewBox';
var injectTapEventPlugin = require("react-tap-event-plugin");
injectTapEventPlugin();

const is_mobile = false;
const App = React.createClass({

  getInitialState() {
    return {
      info: "",
      event_info: ""
    }
  },

  componentDidMount() {
    console.log("did mount")
    let info = "Did Mount";
    this.setState({
      info: info
    });
    if (window.cordova) {
      console.log("ok");
      info += "- Cordova ";
      this.setState({
        info: info
      });
      const that = this;
      document.addEventListener("deviceready", this.onDeviceReady, false);

    }
  },

  onDeviceReady() {
    console.log(device);
    let info = "Device ready";
    info += "- " + JSON.stringify(device);

    this.setState({
      info: info
    });
  },

  componentWillUnmount() {
    console.log("will unmount")
  },

  doShare(e) {
    e.preventDefault();
    try{
        var options = {
          message: 'Wine Around Event', // not supported on some apps (Facebook, Instagram)
          subject: 'Wine Around Event', // fi. for email
          url: 'https://winearound-app-dev.herokuapp.com/#/events'
        }
        var onSuccess = function(result) {
          console.log("Share completed? " + result.completed); // On Android apps mostly return false even while it's true
          console.log("Shared to app: " + result.app); // On Android result.app is currently empty. On iOS it's empty when sharing is cancelled (result.completed=false)
        }
        var onError = function(msg) {
          console.log("Sharing failed with message: " + msg);
        }
        window.plugins.socialsharing.shareWithOptions(options, onSuccess, onError);
    }catch(err){
      alert("Ops, error on sharing")
    }
  },

  render() {
    return (
      <div>
        <header className="main-header">
          <h1 className="main-header__title">Demo App</h1>
        </header>
        <div className="event">
         <div className="formatted-content">
          <p className="align--center">... Event stuff ...</p>
          <h4 className="review-title">Review Event Place</h4>
          </div>
          <ReviewBox/>
          <hr/>
          <div className="share-container align--center">
            <a href="#" className="nav--link" onClick={ this.doShare }>share this page</a>
          </div>
        </div>

        </div>
      );
  },

});

ReactDOM.render(<App />, document.getElementById('app'));
