import React, { Component } from 'react';
import PropTypes from 'prop-types';

class AddTodo extends Component {

    state = {
        inputText: "" 
    }

    /*  We can use e.target.value with e.target.name to match the 
        input value with the corresponding name parameter of the input component.
        This is helpful when we have multiple input fields and we don't want to create 
        multiple onChange event handlers to record the values of each input field.
        Example: 
            onChange = (e) => this.setState({ [e.target.name]: e.target.value});
            Here, the inputText above and the inputTextbox name below (if named the same i.e. inputText)
            will be dynamically updated using this event handler
     */

    //as we're typing in the inputTextbox, we're updating the state of the text along
    onChange = (e) => { 
        //console.log("e.target.name=",[e.target.name]) // = ["inputText"]
        this.setState({ [e.target.name]: e.target.value});
    }
    //onChange = (e) => this.setState({inputText: e.target.value});

    /*  Submit tries to submit to the actual file (just like in vanilla js) 
            and we don't want that, so we use preventDefault
        Passing the inputText upwards to add it to the list (component drilling upwards)
            through the addTodo() function
     */
    onSubmit = (e) => {
        //console.log("onSubmit, inputText=", this.state.inputText);
        e.preventDefault();
        this.props.addTodo(this.state.inputText);
        this.setState({ inputText: "" });
    }

    render() {
        return (
            <form onSubmit={this.onSubmit} style={{ display:"flex" }}>
                <input 
                    type="text"
                    name="inputText" //name="inputTextbox"
                    style={{ flex:"10", padding:"5px"}}
                    placeholder="Add Todo..."
                    value={this.state.inputText}
                    onChange={this.onChange}
                /> 
                <input
                    type="submit"
                    value="Submit"
                    className="btn"
                    style={{ flex:"1" }}
                />
            </form>
        )
    }
}

export default AddTodo;

AddTodo.propTypes = {
    addTodo: PropTypes.func.isRequired
}