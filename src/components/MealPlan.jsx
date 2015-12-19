import React from 'react';
import GroceryStore from '../stores/GroceryStore';

var MealPlan = React.createClass({

	_onDragOver(e){
  		if (e.preventDefault) e.preventDefault(); 
    	e.dataTransfer.dropEffect = 'copy';
    	return false;
  	},

	_onDrop(e) {
		if (e.stopPropagation) e.stopPropagation();
      	var droppedItem = GroceryStore.find(e.dataTransfer.getData('item'));
      	this.props.mealPlanOnItemDrop(droppedItem);
	    return false;
  	},

  	_getDroppedItem(){
  		var result = '';
  		if(typeof this.props.droppedItem !== 'undefined'){
  			result = this.props.droppedItem.text;
  		}
  		return result;
  	},

  	_onFormSubmit(e) {
		e.preventDefault();
		this.props.mealPlannerFormSubmit(this.state.newMealTimestamp);
	},

	_onChange(e) {
		if(e.target.id === 'newMealTimestamp') {
			this.setState({
				'newMealTimestamp':this.getDateTimeStr(e.target.value)
			});
		}
	},

	getDateTimeStr(datetime){
		var newDate = new Date(datetime);
		return newDate.getFullYear() + '-' + 
			   (newDate.getMonth() + 1) + '-' +
			   newDate.getDate() + ' ' +
			   newDate.getUTCHours() + ':' +
			   newDate.getUTCMinutes() + ':' +
			   newDate.getUTCSeconds();
	},

	getFormBtn(){
		if(typeof this.props.droppedItem !== 'undefined'){
			return (<button onClick={this._onFormSubmit} type="submit" className="btn btn-default">Submit</button>);
		} else {
			return '';
		}
	},

	getInputTimestampField(){
		if(typeof this.props.droppedItem !== 'undefined'){
			return (<input onChange={this._onChange} id="newMealTimestamp" type="datetime-local" 
				    	className="form-control" />);
		} else {
			return '';
		}
	},

	render() {
		return (
			<section onDrop={this._onDrop} onDragOver={this._onDragOver}>
				<h3>{this.props.headingText}</h3>
				<div className="well well-sm">Drag and drop items or recipes here</div>
		        <div className="clearfix"></div>
				<form>
					<div className="form-group">
					    <div>{this._getDroppedItem()}</div>
				  </div>
				  <div className="form-group">
				  	{this.getInputTimestampField()}
				  </div>
				  {this.getFormBtn()}					
				</form>			
			</section>
		);
	}
});

module.exports = MealPlan;