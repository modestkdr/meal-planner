import React from 'react';
var moment = require('moment-timezone');
import {  Link } from 'react-router';

var Calendar = React.createClass({

	getItems(dateObj){
		var result = [];
		var items = this.props.mealCalendarItems;

		for(var index in items){
			
			var itemDateObj = moment.tz(items[index].planned_for, "America/New_York");

			if(dateObj.month() === itemDateObj.month() && 
				dateObj.date() === itemDateObj.date() && 
				dateObj.year() === itemDateObj.year()) {
				
				if(items[index].mealType === 'recipe') {
					var recipeUrl = "/recipe/" + items[index].recipeId;

					result.push(
						<li className="list-group-item" key={index}>
							<div>
								<Link to={recipeUrl}>
									{items[index].text}
								</Link> at {moment.tz(items[index].planned_for, "America/New_York").format('hA')}
							</div>
						</li>
					);
				} else {
					result.push(
						<li className="list-group-item" key={index}>
							<div>
								{items[index].text} at {moment.tz(items[index].planned_for, "America/New_York").format('hA')}
							</div>
						</li>
					);
				}
			}
		}
		return result;
	},

	render() {
		return (
			<section className="col-md-12">
				<h2 className='text-center'>{this.props.headingText}</h2>
				<section className="col-md-3 calendar-day">
					<h4>{moment().tz("America/New_York").add(0, 'days').format('dddd')}, {moment().tz("America/New_York").add(0, 'days').format('MMM Do')}</h4>
					<hr/>
					<ul className="list-group">
						{this.getItems(moment().tz("America/New_York").add(0, 'days'))}
					</ul>
				</section>
				<section className="col-md-3 calendar-day">
					<h4>{moment().tz("America/New_York").add(1, 'days').format('dddd')}, {moment().tz("America/New_York").add(1, 'days').format('MMM Do')}</h4>
					<hr/>
					<ul className="list-group">
						{this.getItems(moment().tz("America/New_York").add(1, 'days'))}
					</ul>
				</section>
				<section className="col-md-3 calendar-day">
					<h4>{moment().tz("America/New_York").add(2, 'days').format('dddd')}, {moment().tz("America/New_York").add(2, 'days').format('MMM Do')}</h4>
					<hr/>
					<ul className="list-group">
						{this.getItems(moment().tz("America/New_York").add(2, 'days'))}
					</ul>
				</section>
				<section className="col-md-3 calendar-day">
					<h4>{moment().tz("America/New_York").add(3, 'days').format('dddd')}, {moment().tz("America/New_York").add(3, 'days').format('MMM Do')}</h4>
					<hr/>
					<ul className="list-group">
						{this.getItems(moment().tz("America/New_York").add(3, 'days'))}
					</ul>
				</section>
			</section>
		);
	}
});

module.exports = Calendar;