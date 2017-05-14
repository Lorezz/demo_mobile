import React from 'react';
import ReviewForm from './ReviewForm';
import ReviewList from './ReviewList';

const ReviewBox = React.createClass({

  getInitialState: function() {
    return {
      reviews: []
    }
  },

  s4: function() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  },

  guid: function() {
    return this.s4() + this.s4() + '-' + this.s4() + '-' + this.s4() + '-' +
      this.s4() + '-' + this.s4() + this.s4() + this.s4();
  },

  newReview: function(item) {
    const list = this.state.reviews;
    item.id = this.guid();
    item.user = this.current_user();
    list.unshift(item)
    this.setState({
      reviews: list
    })
  },

  current_user: function() {
    if (this.props.user) {
      return this.props.user.name
    }
    return "Anonymus";
  },


  deleteReview: function(id) {
    const list = this.state.reviews;
    function matchesEl(el) {
      return el.id === id;
    }
    list.splice(list.findIndex(matchesEl), 1);
    this.setState({
      reviews: list
    });

  },

  render: function() {
    return (
      <div>
        <div className='container'>
          <ReviewForm
                      message=''
                      rate={ 1 }
                      onReviewSubmit={ this.newReview } />
          <hr/>
          <ReviewList
                      reviews={ this.state.reviews }
                      onDeleteReview={ this.deleteReview } />
        </div>
      </div>
      );
  }
});

export default ReviewBox;


