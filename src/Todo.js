import React, { Component } from 'react';
import './Todo.css';

class Todo extends Component {
	constructor(props) {
		super(props);
		this.state = {
			editedTodo: this.props.task,
			isCompleted: false,
			isEditing: false
		};
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.handleRemove = this.handleRemove.bind(this);
		this.handleEdit = this.handleEdit.bind(this);
		this.handleComplete = this.handleComplete.bind(this);
	}
	handleSubmit(evt) {
		evt.preventDefault();
		this.props.editTodo(this.props.id, {
			id: this.props.id,
			task: this.state.editedTodo
		});
		this.setState({ isEditing: false });
	}
	handleChange(evt) {
		this.setState({
			[evt.target.name]: evt.target.value
		});
	}
	handleRemove() {
		this.props.removeTodo(this.props.id);
	}
	handleEdit() {
		this.setState({ isEditing: true });
	}
	handleComplete() {
		this.props.completeTodo(this.props.id);
	}
	render() {
		const editForm = (
			<form className='Todo=edit' onSubmit={this.handleSubmit}>
				<input id='editForm' name='editedTodo' value={this.state.editedTodo} onChange={this.handleChange} />
				<button>Save</button>
			</form>
		);
		const completedTask = this.props.isCompleted ? 'done' : '';
		return (
			<div className='Todo'>
				{this.state.isEditing ? (
					editForm
				) : (
					<li>
						<div className={`Todo-task ${completedTask}`} onClick={this.handleComplete}>{this.props.task}</div>
						<div className='Todo-actions'>
							<i className='medium material-icons' onClick={this.handleComplete}>
								{this.props.isCompleted ? 'check_box' : 'check_box_outline_blank'}
							</i>
							<i className='medium material-icons' onClick={this.handleEdit}>
								mode_edit
							</i>
							<i className='medium material-icons' onClick={this.handleRemove}>
								delete
							</i>
						</div>
					</li>
				)}
			</div>
		);
	}
}

export default Todo;
