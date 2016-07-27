import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { createContainer } from 'meteor/react-meteor-data';
import { Tasks } from '../api/tasks.js';


import Task from './Task.jsx';


// App component - represents the whole app
class App extends Component {

  constructor(props) {
    super(props);
 
    this.state = {
      hideCompleted: false,
    };
  }


handleSubmit(event) {
    event.preventDefault();

    // Find the text field via the React ref
    const title = ReactDOM.findDOMNode(this.refs.titleInput).value.trim(); 
    const price = ReactDOM.findDOMNode(this.refs.priceInput).value.trim(); 
    const description = ReactDOM.findDOMNode(this.refs.descriptionInput).value.trim();
    const daysAgo = ReactDOM.findDOMNode(this.refs.daysAgoInput).value.trim();
    const image = ReactDOM.findDOMNode(this.refs.imageInput).value.trim();

Tasks.insert({
      title,
      price,
      description,
      daysAgo,
      image,
      createdAt: new Date(), // current time
    });

    // Clear form
    ReactDOM.findDOMNode(this.refs.titleInput).value = '';
    ReactDOM.findDOMNode(this.refs.priceInput).value = '';
    ReactDOM.findDOMNode(this.refs.descriptionInput).value = '';
    ReactDOM.findDOMNode(this.refs.daysAgoInput).value = '';
    ReactDOM.findDOMNode(this.refs.imageInput).value = '';
  }

toggleHideCompleted() {
    this.setState({
      hideCompleted: !this.state.hideCompleted,
    });
  }
 

renderTasks() {
    let filteredTasks = this.props.tasks;
    if (this.state.hideCompleted) {
      filteredTasks = filteredTasks.filter(task => !task.checked);
    }
    return filteredTasks.map((task) => (
      <Task key={task._id} task={task} />
    ));
  }

  render() {
    return (
      <div className="container">
        <header>

           <h1>Material ({this.props.incompleteCount + ' items'})</h1>

          <form className="new-task" onSubmit={this.handleSubmit.bind(this)} >
            <input
              type="text"
              ref="titleInput"
              placeholder="Type to add new tasks"
            />
            <input
              type="text"
              ref="priceInput"
              placeholder="Price"
            />
            <input
              type="text"
              ref="descriptionInput"
              placeholder="Description"
            />
            <input
              type="text"
              ref="daysAgoInput"
              placeholder="Days Ago"
            />
            <input
              type="text"
              ref="imageInput"
              placeholder="Image"
            />
            <input type="button" type="submit" />
          </form>
        </header>
        <br/><br/><br/>
        <article>
          {this.renderTasks()}
        </article>
         <br/><br/><br/>
      </div>
    );
  }
}

          // <label className="hide-completed">
          //   <input
          //     type="checkbox"
          //     readOnly
          //     checked={this.state.hideCompleted}
          //     onClick={this.toggleHideCompleted.bind(this)}
          //   />
          //   Hide Completed Tasks
          // </label>

App.propTypes = {
  tasks: PropTypes.array.isRequired,
  incompleteCount: PropTypes.number.isRequired,
};

export default createContainer(() => {
  return {
    tasks: Tasks.find({}).fetch(),
    incompleteCount: Tasks.find({ checked: { $ne: true } }).count(),
  };
}, App);