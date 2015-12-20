import React from 'react';
var moment = require('moment');

var Calendar = React.createClass({

	getItems(dateStr){
		var result = [];
		var items = this.props.mealCalendarItems;
		for(var index in items){
			if(items[index].planned_for.indexOf(dateStr) > -1) {
				result.push(
					<li key={index}>
						<div>{moment(items[index].planned_for).format('hA')}</div>
						<p>{items[index].text}</p>
					</li>
				);
			}
		}
		return result;
	},

	render() {
		return (
			<section className="col-md-8">
				<h3>{this.props.headingText}</h3>				
				<section className="col-sm-6 col-md-4 calendar-day">
					<h4>Today ({moment().add(0, 'days').format('MMM Do')})</h4>
					<hr/>
					<ul className="list-unstyled">
						{this.getItems(moment().add(0, 'days').format('YYYY-MM-DD'))}
					</ul>
				</section>
				<section className="col-sm-6 col-md-4 calendar-day">
					<h4>Tomorrow ({moment().add(1, 'days').format('MMM Do')})</h4>
					<hr/>
					<ul className="list-unstyled">
						{this.getItems(moment().add(1, 'days').format('YYYY-MM-DD'))}
					</ul>					
				</section>
				<section className="col-sm-6 col-md-4 calendar-day">
					<h4>Day After Tomorrow ({moment().add(2, 'days').format('MMM Do')})</h4>
					<hr/>
					<ul className="list-unstyled">
						{this.getItems(moment().add(2, 'days').format('YYYY-MM-DD'))}
					</ul>					
				</section>
			</section>
		);
	}
});

module.exports = Calendar;