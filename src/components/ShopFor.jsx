import React from 'react';
var GroceryStore = require('../stores/GroceryStore');
var ShopForList = require('./ShopForList');

var ShopFor = React.createClass({


  render: function() {    
    return (
      <section id="shopFor">
      	<h3>Shop For</h3>
      	<ShopForInput onSave={this._onSave}
           placeholder="a new item.." />
      	<ShopForList items={this.props.items} />        
      </section>
    );
  }

});

module.exports = ShopFor;
