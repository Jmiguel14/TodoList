import React, {useEffect, useState} from "react";

const TodoListExt = () => {
    console.log('Testing SSH!!')
    const [users, setUsers] = useState(null);
    const [userId, setUserId] = useState(1);
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        fetch(`https://jsonplaceholder.typicode.com/users/${userId}`)
            .then((data) => {
                return data.json();
            })
            .then((dataJSON) => {
                setUsers(dataJSON);
            })
    }, [userId]);

    useEffect(()=> {
        fetch(`https://jsonplaceholder.typicode.com/users/${userId}/todos`)
            .then((data) => {
                return data.json();
            })
            .then((dataJSON) => {
                setTasks(dataJSON);
                //console.log(dataJSON);
            })
    }, [userId])

    const handleAddTask = () => {
        const title = document.querySelector('#task').value;

        if (title !== '') {
            setTasks(prevState => [...prevState, {title}]);
            document.querySelector('#task').value = '';
        } else {
            alert('Ingrese una tarea');
        }
    };

    const handleCompleteTask = ( index ) => {
        setTasks( ( prevState ) => {
            const taskUpdated = [ ...prevState ];
            taskUpdated[ index ].completed = true;
            return taskUpdated;
        });
    };

    const handleDeleteTask = (index) => {
        setTasks((prevState) => {
            return prevState.filter((task, i) => i !== index);
        });
    };

    const showUserLeft = () => {
        setUserId(userId-1)
    }

    const showUserRight = () => {
        setUserId(userId+1)
    }

    return (
        <div>
            {
                userId > 1 ?
                <button onClick={showUserLeft}>Anterior</button>
                    : ''
            }
            {
                userId <= 10 ?
                    <button onClick={showUserRight}>Siguiente</button>
                    : ''
            }

            <h2>Información del Usuario</h2>
            {
                users ?
                    <ul>
                        <li>Nombre: {users.name}</li>
                        <li>Usuario: {users.username}</li>
                        <li>Email: {users.email}</li>
                        <li>Sitio Web: {users.website}</li>
                        <li>Teléfono: {users.phone}</li>
                    </ul>
                    :
                    <div style={{margin: '30px'}}>
                        <div className="spinner"></div>
                    </div>
            }
            <div>
                <label htmlFor='task'>Tarea</label>
                <input type='text' id='task'/>

                <button onClick={handleAddTask}>Agregar Tarea</button>
            </div>

            <h2>Lista de tareas ({tasks.length} en total)</h2>
            <table>
                <thead>
                <tr>
                    <th>Nombre</th>
                    <th>Estado</th>
                    <th>Eliminar</th>
                </tr>
                </thead>

                <tbody>
                {
                    tasks.map((task, index) => (
                            <tr key={index}>
                                <td>{task.title}</td>
                                <td>
                                    {
                                        task.completed
                                            ? <div style={{background: '#29FFB4'}}>Completada</div>
                                            : <button onClick={ () => handleCompleteTask( index ) } style={{background: '#FFD21A'}}>Marcar como completada</button>
                                    }
                                </td>
                                <td>
                                    <button onClick={() => handleDeleteTask(index)} style={{background: '#ff4f29'}}>Eliminar</button>
                                </td>
                            </tr>
                        )
                    )
                }
                </tbody>
            </table>
        </div>
    );
}


export default TodoListExt;