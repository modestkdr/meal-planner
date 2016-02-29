import React from 'react';
var AppActions = require('../actions/AppActions');

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
              <li className="list-group-item" key={index}>
                <div>
                  <Link to={recipeUrl}>
                    {items[index].text}
                  </Link> at {moment.tz(items[index].planned_for, "America/New_York").format('hA')}
                </div>
              </li>
      );
    } 
    else {
      return (
      <li className="list-group-item" key={index}>
        <div>
          {items[index].text} at {moment.tz(items[index].planned_for, "America/New_York").format('hA')}
        </div>
      </li>
      );
    }
  }
  
});

module.exports = CalendarItem;