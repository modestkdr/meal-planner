import React from 'react';
var AppActions = require('../actions/AppActions');
var moment = require('moment-timezone');
import {  Link } from 'react-router';

var CalendarItem = React.createClass({

  _removeFromCalendar(e){
  	if (e.preventDefault) e.preventDefault();
  	//console.log(this.props.item.text)
  	AppActions.removeItemFromCalendar(this.props.item.id);
  },

  render() {
  	var item = this.props.item;

    if(item.mealType === 'recipe') {

      var recipeUrl = "/recipe/" + item.recipeId;
      
      return (
              <li className="list-group-item">
                <div>
                  <Link to={recipeUrl}>
                    {item.text}
                  </Link> at {moment.tz(item.planned_for, "America/New_York").format('hA')}
                  <button onClick={this._removeFromCalendar} className="pull-right" 
                    type="button" aria-label="Remove">x</button>
                </div>
              </li>
      );
    } 
    else {
      return (
      <li className="list-group-item">
        <div>
          {item.text} at {moment.tz(item.planned_for, "America/New_York").format('hA')}
          <button onClick={this._removeFromCalendar} className="pull-right" 
            type="button" aria-label="Remove">x</button>
        </div>
      </li>
      );
    }
  }
  
});

module.exports = CalendarItem;