import React, { Component } from 'react';
import PropTypes from 'prop-types';

class TodoItem extends Component {

    // Styling (dynamic) for our todos (dynamic styling, based on the state of the todo object)
    getStyle = () => {
        return {
            background: "#f4f4f4",
            padding: "10px",
            borderBottom: "1px #ccc dotted",
            textDecoration: this.props.todo.completed ? "line-through" : "none",
        }
    }
    
    buttonStyle = {
        background: "#ff0000",
        color: "#fff",
        border: "none",
        padding: "5px 9px",
        borderRadius: "50%",
        cursor: "pointer",
        float: "right"
    }

    render() {
        //Destructuring instead of using this .props. ... 
        const { id, title } = this.props.todo;
        return (
            <div style={this.getStyle()}>
                <p>
                    <input type="checkbox" onChange={this.props.markComplete.bind(this, id)}/>
                    {"  " + title}
                    <button style={this.buttonStyle} onClick={this.props.delTodo.bind(this, id)}>x</button>
                </p>
            </div>
        )
    }
}

// Stlying - JSX allows styling to be inline, however, it 1)needs double curly braces, and 2)camelCase.
/* Eg. <div style={{ backgroundColor:"#f4f4f4"}}> //It is similar to CSS syntax

    Another way to do it is using variables/objects, of even a function (as we used above):
    const itemStyle = {
        backgroundColor: "#f4f4f4"
    }   
    <div style={itemStyle}>
*/

// PropTypes - kind of like validating the props that a component should have
TodoItem.propTypes = {
    todo: PropTypes.object.isRequired,
    markComplete: PropTypes.func.isRequired,
    delTodo: PropTypes.func.isRequired
}

export default TodoItem;