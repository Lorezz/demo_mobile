import React from 'react';
import ReactStars from 'react-stars';

var ReviewForm = React.createClass({

  getInitialState: function() {
    return {
      text: this.props.message,
      rating: this.props.rate,
      pristine: true
    };
  },

  handleChange: function(event) {
    this.setState({
      text: event.target.value,
      pristine: false

    });
  },

  ratingChanged: function(newRating) {
    console.log(newRating)
    this.setState({
      rating: newRating,
      pristine: false
    });
  },

  addReview: function(e) {
    e.preventDefault();

    if (this.state.pristine) {
      return;
    }

    this.props.onReviewSubmit({
      text: this.state.text,
      rating: this.state.rating,
      timestamp: (new Date()).getTime()
    });
    this.setState({
      text: '',
      rating: 0,
      pristine: true
    });

  },
  render: function() {
    return (
      <div>
        <form className="form wrapper notitle" onSubmit={ this.addReview }>
          <div className='form__field'>
            <label className="form__label">
                Rate the place
            </label>
            <ReactStars onChange={ this.ratingChanged }
                        value={ this.state.rating }
                        size={ 46 } />
          </div>
          <div className='form__field'>
            <label className="form__label">
                Your impressions
            </label>
            <input className="form__input"
                      type="text"
                      value={ this.state.text }
                      onChange={ this.handleChange } />          
          </div>
          <div className='event__actions'>
            <button type="submit" className='btn button--primary button--small' >Review</button>
          </div>
        </form>
      </div>
      );
  }
});

export default ReviewForm;
