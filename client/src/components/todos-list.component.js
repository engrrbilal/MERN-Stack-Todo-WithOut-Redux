import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import * as todos from '../apis/todos'

const Todo = props => (
    <tr>
        <td className={props.todo.todo_completed ? 'completed textLimit' : 'textLimit'}>{props.todo.todo_description}</td>
        <td className={props.todo.todo_completed ? 'completed textLimit' : 'textLimit'}>{props.todo.todo_responsible}</td>
        <td className={props.todo.todo_completed ? 'completed' : ''}>{props.todo.todo_priority}</td>
        <td>
            <Link to={"/edit/"+props.todo._id}>Edit</Link>
        </td>
    </tr>
)

export default class TodosList extends Component {

    constructor(props) {
        super(props);
        this.state = {todos: []};
    }

    componentDidMount() {
        todos.getAll().then(data=> {
            console.log("data",data)
            this.setState({todos: data});
        })
    }

    componentDidUpdate() {
        todos.getAll().then(data=> {
            this.setState({todos: data});
        })  
    }

    todoList() {
        return this.state.todos.map(function(currentTodo, i) {
            return <Todo todo={currentTodo} key={i} />;
        });
    }

    render() {
        return (
            <div>
                <h3>Todos List</h3>
                <table className="table table-striped" style={{ marginTop: 20 }}>
                    <thead>
                        <tr>
                            <th>Description</th>
                            <th>Responsible</th>
                            <th>Priority</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        { this.state.todos.length ? this.todoList(): <p className = "defaultTextStyle" >No todos added yet</p> }
                    </tbody>
                </table>
            </div>
        )
    }
}
