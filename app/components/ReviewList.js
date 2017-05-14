import React from 'react'
import ReactStars from 'react-stars'
import moment from 'moment'
var ReviewList = React.createClass({

  getInitialState: function() {
    return {
      items: this.props.reviews,
    };
  },

onDeleteReview:function(id){
  this.props.onDeleteReview(id);
},

 
  renderList: function() {
    var that = this;
    return this.state.items.map(function(item) {
      //let ts = new moment(item.timestamp).format("YYYY-MM-DD HH:mm")
      let ts = new moment(item.timestamp).fromNow();
      return (<li className="review-list-group-item" key={ item.id }>
                <div className="formatted-content">
                  <ReactStars edit={ false } value={ item.rating } />
                  <div>
                    { item.text }
                  </div>
                  <div className="review-item-footer">
                    <span className="right">by: <i>{ item.user }</i></span>   
                    <span className="left"><i>{ ts }</i></span>
                  </div>
                 <button className="button--primary button--small" 
                      onClick={that.onDeleteReview.bind(that,item.id)}>delete
                  </button>
                </div>
              </li>)
    })
  },

  render: function() {
    var that = this
    if (this.state.items && this.state.items.length) {
      return (
        <ul className="review-list-group">
          { this.renderList() }
        </ul>
        );
    }
    return (<h6 className="align--center">No Reviews for this Event</h6>)
  }

});
export default ReviewList;
