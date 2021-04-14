import React, { Component } from 'react';
import './NewTodoForm.css';

import { v4 as uuidv4 } from 'uuid';

class NewTodoForm extends Component {
	constructor(props) {
		super(props);
		this.state = {
			newTodo: ''
		};
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleChange = this.handleChange.bind(this);
	}
	handleSubmit(evt) {
		evt.preventDefault();
		const theTodo = {
			id: uuidv4(), 
			task: this.state.newTodo,
			isCompleted: false
		}
		this.props.addItem(theTodo);
		this.setState({ newTodo: '' });
	}
	handleChange(evt) {
		this.setState({
			[evt.target.name]: evt.target.value
		});
	}
	render() {
		return (
			<form className='NewTodoForm' onSubmit={this.handleSubmit}>
				<label htmlFor='new-todo' />
				<input id='new-todo' name='newTodo' value={this.state.newTodo} onChange={this.handleChange} placeholder='Add to the Todo List' />
				<button>add todo</button>
			</form>
		);
	}
}

export default NewTodoForm;
