import React from 'react';
var moment = require('moment');

var Calendar = React.createClass({

	getItems(dateStr){
		var result = [];
		var items = this.props.mealCalendarItems;
		for(var index in items){
			if(items[index].planned_for.indexOf(dateStr) > -1) {
				result.push(
					<li className="list-group-item" key={index}>
						<div>
							{items[index].text} at {moment(items[index].planned_for).format('hA')}
						</div>
					</li>
				);
			}
		}
		return result;
	},

	render() {
		return (
			<section className="col-md-12">
				<h2 className='text-center'>{this.props.headingText}</h2>
				<section className="col-md-3 calendar-day">
					<h4>{moment().add(0, 'days').format('dddd')}, {moment().add(0, 'days').format('MMM Do')}</h4>
					<hr/>
					<ul className="list-group">
						{this.getItems(moment().add(0, 'days').format('YYYY-MM-DD'))}
					</ul>
				</section>
				<section className=" col-md-3 calendar-day">
					<h4>{moment().add(1, 'days').format('dddd')}, {moment().add(1, 'days').format('MMM Do')}</h4>
					<hr/>
					<ul className="list-group">
						{this.getItems(moment().add(1, 'days').format('YYYY-MM-DD'))}
					</ul>					
				</section>
				<section className=" col-md-3 calendar-day">
					<h4>{moment().add(2, 'days').format('dddd')}, {moment().add(2, 'days').format('MMM Do')}</h4>
					<hr/>
					<ul className="list-group">
						{this.getItems(moment().add(2, 'days').format('YYYY-MM-DD'))}
					</ul>					
				</section>
				<section className=" col-md-3 calendar-day">
					<h4>{moment().add(3, 'days').format('dddd')}, {moment().add(3, 'days').format('MMM Do')}</h4>
					<hr/>
					<ul className="list-group">
						{this.getItems(moment().add(3, 'days').format('YYYY-MM-DD'))}
					</ul>					
				</section>
			</section>
		);
	}
});

module.exports = Calendar;