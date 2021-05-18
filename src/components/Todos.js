//convention for naming is SentenceCase for component names

import React, { Component } from 'react';
import TodoItem from './TodoItem';

import PropTypes from 'prop-types';

class Todos extends Component {

  render() {
    //console.log(this.props.todos);

    //.map() function to loop through the todos array and pass each item into a arrow fn using a lambda variable
    // should use "key" when using .map() to name each element for identification/location purposes
    return this.props.todos.map( lambda_todo => (
        // pass in each lambda_todo to the TodoItem component as a prop (for further use within the TodoItem component)
        <TodoItem key={lambda_todo.id} todo={lambda_todo} 
        markComplete={this.props.markComplete}
        delTodo={this.props.delTodo}/>
    ));
  }
}

// PropTypes
Todos.propTypes = {
    todos: PropTypes.array.isRequired
}

export default Todos;
