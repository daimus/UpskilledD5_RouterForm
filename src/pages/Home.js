import {useState} from "react";
import _ from "lodash";
import ToDoList from "../components/ToDoList";
import Alert from "../components/Alert";

const HomePage = () => {
    const [todo, setTodo] = useState("");
    const [todos, setTodos] = useState([]);
    const [alertShown, setAlertShown] = useState(false);

    const handleCreate = (event) => {
        event.preventDefault();
        if (_.isEmpty(todo)) {
            setAlertShown(true)
            setTimeout(() => {
                setAlertShown(false)
            }, 3000)
            return
        }
        const todoInput = {
            id: Date.now(),
            checked: false,
            todo: todo,
        };
        setTodos([todoInput, ...todos]);
        setTodo("");
    };

    const handleCheck = (id, checked) => {
        const index = _.findIndex(todos, function (o) {
            return id === o.id;
        });
        const todosTemp = todos;
        todosTemp[index].checked = checked;
        setTodos(_.sortBy([...todosTemp], ['checked', 'id']));
    };

    const handleDelete = (id) => {
        let todosTemp = todos;
        todosTemp = _.filter(todosTemp, function (o) {
            return id !== o.id;
        });
        setTodos([...todosTemp]);
    };
    return (
        <>
            <div>
                <h1 className="text-center text-8xl font-medium tracking-widest mb-8">todo</h1>
                {
                    alertShown && <Alert variant="danger">
                        <span className="font-medium">Oops! 🚫</span>
                        Please fill out todo name
                    </Alert>
                }
                <form onSubmit={handleCreate}>
                    <div className="relative">
                        <input
                            type="search"
                            id="default-search"
                            className="block w-full p-4 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Create ToDo"
                            value={todo}
                            onChange={(event) => setTodo(event.target.value)}
                            autoComplete="off"
                        />
                        <button
                            type="submit"
                            className="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2"
                        >
                            Create
                        </button>
                    </div>
                </form>

                <div className="mt-12 gap-1">
                    {
                        todos.length > 0 ?
                            <ToDoList todos={todos}
                                      handleCheck={handleCheck}
                                      handleDelete={handleDelete}/> :
                            <Alert>Let's do some fun 🤟</Alert>
                    }
                </div>
            </div>
        </>
    );
};

export default HomePage;
