import React, {useEffect, useState} from 'react';
import logo from '../images/logo.svg';
import '../styles/App.css';
import UserTasksList from "./UserTasksList";
import UserInfo from "./UserInfo";
import {Button, Col, message, Modal, Row} from "antd";
import UserTaskForm from "./UserTaskForm";


const App = () => {
    const [users, setUsers] = useState(null);
    const [UserId, setUserId] = useState(1);
    const [tasks, setTasks] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [showCreateTaskModal, setShowCreateTaskModal] = useState(false);

    useEffect(() => {

        const getUser = async () => {
            const data = await fetch(`https://jsonplaceholder.typicode.com/users/${UserId}`)
            const jsonUser = await data.json();

            setUsers(jsonUser);
        };
        getUser();

        const getTask = async () => {
            const data = await fetch(`https://jsonplaceholder.typicode.com/users/${UserId}/todos`)
            const jsonTask = await data.json();

            setTasks(jsonTask);

            setIsLoading(false);
        }
        getTask();

    }, [UserId]);


    const handleAddTask = () => {
        const title = document.querySelector('#task').value;

        if (title !== '') {
            setTasks(prevState => [...prevState, {title}]);
            document.querySelector('#task').value = '';
        } else {
            alert('Ingrese una tarea');
        }
    };

    const handleCompleteTask = (index) => {
        setTasks((prevState) => {
            const taskUpdated = [...prevState];
            taskUpdated[index].completed = true;
            return taskUpdated;
        });
        message.success('Felicidades has completado una tarea :D');
    };

    const handleDeleteTask = (index) => {
        setTasks((prevState) => {
            return prevState.filter((task, i) => i !== index);
        });
        message.warn('Has eliminado una tarea...');
    };

    const showPrevUser = () => {
        setUserId((prevUserId) => prevUserId - 1);
    }

    const showNextUser = () => {
        setUserId((prevUserId) => prevUserId + 1)
    }

    return (
        <>
            <Row type="flex" justify="center">
                <Col>
                    <Button type={'primary'} disabled={UserId < 2} onClick={showPrevUser}>Anterior</Button>
                </Col>
                <Col>
                    <Button type="primary" disabled={UserId >= 10} onClick={showNextUser}>Siguiente</Button>
                </Col>
            </Row>
            {
                users ? <UserInfo users={users}/>
                    :
                    <div style={{margin: '60px'}}>
                        <div className="spinner"></div>
                    </div>
            }

            <Row style={{marginTop: 40, marginBottom: 20}}>
                <Col>
                    <Button type="primary" onClick={()=>setShowCreateTaskModal(true)} >Nueva tarea</Button>
                    <Button danger onClick={()=>setTasks([])}>Eliminar todas las tareas X(</Button>
                </Col>
            </Row>


            <UserTasksList tasks={tasks}
                       onCompleteTask={handleCompleteTask}
                       onDeleteTask={handleDeleteTask}
                       isLoading={isLoading}
                       setShowCreateTaskModal={setShowCreateTaskModal}
            />

            <Modal
                title="Crear una nueva tarea"
                visible={showCreateTaskModal}
                footer={null}
                onCancel={()=>setShowCreateTaskModal(false)}
            >
                <UserTaskForm onAddTask={handleAddTask}/>
            </Modal>
        </>
    );
}

export default App;
