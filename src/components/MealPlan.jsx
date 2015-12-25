import React from 'react';
import GroceryStore from '../stores/GroceryStore';
import RecipeStore from '../stores/RecipeStore';


var MealPlan = React.createClass({

	_onDragOver(e){
  		if (e.preventDefault) e.preventDefault(); 
    	e.dataTransfer.dropEffect = 'copy';
    	//console.log('drag over');
    	//console.log(e.dataTransfer.getData('recipe'));
    	return false;
  	},

	_onDrop(e) {
		if (e.stopPropagation) e.stopPropagation();
		var droppedEntity;
		//console.log('data transfer drop');

		if(e.dataTransfer.getData('recipe')) {
			droppedEntity = RecipeStore.find(e.dataTransfer.getData('recipe'));
		}

		if(e.dataTransfer.getData('item')) {
	      	droppedEntity = GroceryStore.find(e.dataTransfer.getData('item'));
		}

		//console.log(droppedEntity);

		this.props.mealPlanOnEntityDrop(droppedEntity);

	    return false;
  	},

  	_getDroppedEntity() {

  		var result = '';
  		if(typeof this.props.droppedEntity !== 'undefined' && 
  			typeof this.props.droppedEntity.text !== 'undefined'){
  			result = this.props.droppedEntity.text;
  		}
  		if(typeof this.props.droppedEntity !== 'undefined' && 
  			typeof this.props.droppedEntity.recipeName !== 'undefined'){
  			result = this.props.droppedEntity.recipeName;
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

	getFormBtn() {
			return (<button onClick={this._onFormSubmit} type="submit" className="btn btn-default">Submit</button>);		
	},

	getInputTimestampField() {
			return (<input onChange={this._onChange} id="newMealTimestamp" type="datetime-local" 
				    	className="form-control" />);
	},

	render() {
		return (
			<section onDrop={this._onDrop} onDragOver={this._onDragOver}>
				<h3>{this.props.headingText}</h3>
				<div className="well well-sm">Drag and drop a recipe or an item from pantry here</div>
		        <div className="clearfix"></div>
				<form>
					<div className="form-group">
					    <div>{this._getDroppedEntity()}</div>
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