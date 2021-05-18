import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Todos from './components/Todos';
import AddTodo from './components/AddTodo';
import Header from './components/layout/Header';
import About from './components/pages/About';
import './App.css';
import axios from 'axios';

//Fetch API - regular javascript
//Axios - HTTP Library
class App extends Component {

  /*
    Different components can have their own state, but a lot of time we need a state
    that multiple components need to access.
    In this project/case, our todos need to go in a place where we can feed it down to 
    different components. Therefore, we're putting todos in our main app component state
  */

  //Sample data to work with
  /* 
    state = {
      todos: [ // todos is an array of objects
        {
          id: 1,
          title: 'Take out the trash',
          completed: false
        },
        {
          id: 2,
          title: 'Dinner with wife',
          completed: false
        },
        {
          id: 3,
          title: 'Meeting with boss',
          completed: false
        }
      ]
    }
  */

  //Pulling data from the API
  state = {
    todos: []
  }

  //To make initial requests, you wanna use a lifecycle method -- component DidMount
    componentDidMount() {
    axios.get("https://jsonplaceholder.typicode.com/todos?_limit=10")
    .then(res => this.setState({ todos: res.data }))
  }
  /*  axios.get("https://jsonplaceholder.typicode.com/todos?_limit=10") //gives us a promise
      .then(res => console.log(res.data)) //res gives us a response; it has a data property attached
      Doing console.log(res.data) to see what the response data looks like. 
      (Side note: Added ?_limit=10 to the URL to limit data to 10 objects)
  */

  //Mark the item complete
  markComplete = (id) => {
    //setState is a react method to set the state of a component
    //we're updating the state of the "completed" field using arrow function
    this.setState({ todos: this.state.todos.map( (lambda_todo) => {
            if (lambda_todo.id === id) {
               lambda_todo.completed = !lambda_todo.completed
            }
            return lambda_todo;
        })/* maps each lambda_todo to itself, except, it changes the "completed" attribute when
          it finds the lambda_todo with the id that is needed. Since this is done in an arrow
          function, there is a return statement for that function */
    });
  }
  
  // Delete Todo  //using spread operator
  delTodo = (id) => {
    // this.setState({ todos: [...this.state.todos.filter(todo => todo.id!== id)]
    // })
    axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`)
      .then(res => this.setState({ todos: [...this.state.todos.filter(todo => todo.id!== id)]
      }))
  }
  /* delTodo = (id) => {
      this.setState( {todos: this.state.todos.filter(todo => todo.id!== id)})
  } */

  // Add Todo 
  /*  Using spread operator here to add new todo (since we can't just 
      "change" our state object, we have to make a copy of it? (need more info here)) */
  addTodo = (inputText) => {
    // const newTodo = {
    //   id: 4,
    //   title: inputText, //in ES6 the key-value are the same so we can just write one thing
    //   completed: false
    // }
    // this.setState({ todos: [...this.state.todos, newTodo]})

    // Note: "title" and "completed" are the same keys/parameter-names from the API - these should match
    axios.post("https://jsonplaceholder.typicode.com/todos", {
      title : inputText, //the key title can also be written as a string "title"
      completed : false   //completed can also be written as "completed"
    }).then(res => this.setState({ todos: [...this.state.todos, res.data]}));
    //.then gives us a promise back
  }

  render() {  
    /* Take the todos array (of objects) from the main App component and pass it down to the 
       Todos component as a prop */
    return (
    // ==== if we wanna use the router, we have to wrap everything in that browser router ==== //
    <Router>
      <div className="App">
        <div className="container">
          <Header />
          <Route exact path="/" render={props => (
            <React.Fragment>
              <AddTodo addTodo={this.addTodo}/>
              <Todos todos={this.state.todos} markComplete={this.markComplete}
                  delTodo={this.delTodo}/>
            </React.Fragment>
          )} />
          <Route path="/about" component={About} />
        </div>
      </div>
    </Router>
    // ==== if we wanna use the router, we have to wrap everything in that browser router ==== //
    );
  }

}

export default App;


/* Structure of a basic React class/file

import React, { Component } from 'react';

class AddTodo extends Component {
  render() {    
    return (
            <div>            
            </div>
          )
    }
}
export default AddTodo;
*/