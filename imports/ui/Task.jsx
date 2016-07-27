import React, { Component, PropTypes } from 'react';
import { Tasks } from '../api/tasks.js';

 
// Task component - represents a single todo item
export default class Task extends Component {
  toggleChecked() {
    // Set the checked property to the opposite of its current value
    Tasks.update(this.props.task._id, {
      $set: { checked: !this.props.task.checked },
    });
  }
 
  deleteThisTask() {
    Tasks.remove(this.props.task._id);
  }

  render() {
    // Give tasks a different className when they are checked off,
    // so that we can style them nicely in CSS
    const taskClassName = this.props.task.checked ? 'checked' : '';

    return (
      <section>
        <img src={'http://placehold.it/380x' + this.props.task.height + 
        '/' + this.props.task.color.bg + '/' + this.props.task.color.text + 
        '&text='+this.props.task.num} className="img-responsive repeated-img"/>
        <p className='itemCaption'>
          <span className='productTitle'>{this.props.task.title}</span>
          <span className={this.props.task.price == 'FREE' ? 'free' : 'price'}>
            {this.props.task.price}
          </span>
        </p>
      </section>
    );
  }
}
 
Task.propTypes = {
  // This component gets the task to display through a React prop.
  // We can use propTypes to indicate it is required
  task: PropTypes.object.isRequired,
};