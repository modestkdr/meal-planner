import React from 'react';

var RecipesList = React.createClass({

  getItems(){
  	var items = this.props.items;
  	var result = [];

  	for(var item in items) {
  		result.push(
  			<li  draggable="true" className="col-md-4" key={item}>
  				<img width='100' height='100' src={items[item].image} />
  				<div>{items[item].name}</div>
  			</li>
  		);
  	}
  	return result;
  },

  render() {
    return (
      <section>
      	<ul className="list-unstyled draggable-list">
      		{this.getItems()}
      	</ul>
      </section>
    );
  }

});

module.exports = RecipesList;
