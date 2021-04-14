import React, { Component } from 'react';
import './TodoList.css';

import NewTodoForm from '../NewTodoForm/NewTodoForm';
import Todo from '../Todo/Todo';

class TodoList extends Component {
	constructor(props) {
		super(props);
		this.state = {
			todos: []
		};
		this.addItem = this.addItem.bind(this);
		this.removeTodo = this.removeTodo.bind(this);
		this.editTodo = this.editTodo.bind(this);
		this.toggleCompleteTodo = this.toggleCompleteTodo.bind(this);
    }
    componentDidMount() {
        const json = localStorage.getItem('allTodos');
        const allTodos = JSON.parse(json === null ? '[]' : json);
        this.setState({ todos: allTodos });
    }
    componentDidUpdate() {
        localStorage.setItem('allTodos', JSON.stringify(this.state.todos));
    }
	addItem(newTodo) {
		this.setState(oldState => {
			return { todos: [ ...oldState.todos, newTodo ] };
		});
	}
	removeTodo(uniqueId) {
		const newTodos = this.state.todos.filter(aTodo => {
			return aTodo.id !== uniqueId;
		});
		this.setState({ todos: newTodos });
	}
	editTodo(uniqueId, newTodo) {
		const editedTodos = this.state.todos.map(aTodo => {
			if (aTodo.id === uniqueId) {
				return newTodo;
			}
			return aTodo;
		});
		this.setState({ todos: editedTodos });
	}
	toggleCompleteTodo(uniqueId) {
		const completedTodos = this.state.todos.map(aTodo => {
			if (aTodo.id === uniqueId) {
				return { ...aTodo, isCompleted: !aTodo.isCompleted };
			}
			return aTodo;
		});
		this.setState({ todos: completedTodos });
	}
	render() {
		const allTodos = this.state.todos.map(aTodo => {
			return (
				<Todo
					key={aTodo.id}
					id={aTodo.id}
                    task={aTodo.task}
                    isCompleted={aTodo.isCompleted}
					removeTodo={this.removeTodo}
					editTodo={this.editTodo}
					completeTodo={this.toggleCompleteTodo}
				/>
			);
        });
        const emptyList = <p>There are no running Todos at hand</p>
		return (
			<div className='TodoList'>
				<h1>
					Todo List
					<span>Get things done, don't miss anything</span>
				</h1>
				<div className='TodoList-todos'> {this.state.todos.length === 0 ? emptyList : allTodos} </div>
				<NewTodoForm addItem={this.addItem} />
			</div>
		);
	}
}

export default TodoList;
