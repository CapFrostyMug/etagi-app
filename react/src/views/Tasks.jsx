import {useEffect, useState} from "react";
import axiosClient from "../axios-client";
import TaskForm from "./TaskForm";
import {Button, Table} from "react-bootstrap";
import EditTaskModal from "./editTaskModal";

export default function Tasks() {

    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(false);
    const [newTaskModalShowed, setNewTaskModalShowed] = useState(false);
    const [currentTask, setCurrentTask] = useState(null);
    const [editTaskModalShowed, setEditTaskModalShowed] = useState(false);
    const [selectsData, setSelectsData] = useState(null);

    useEffect(() => {
        getTasks();
    }, []);

    useEffect(() => {
        axiosClient.get('todo-list-extra-data')
            .then(({data}) => {
                setSelectsData(data);
            })
    }, []);

    const handleSubmitForm = (formData) => {
        setTasks([formData, ...tasks]);
        axiosClient.post('todo-list', formData);
    };

    const handleSubmitEditForm = (formData, taskId) => {
        setTasks((prevState) => {
            return prevState.map((el) => {
                if (el.id === taskId) {
                    return {
                        ...el,
                        ...formData,
                    };
                }
                return el;
            })
        })
        axiosClient.put(`/todo-list/${taskId}`, formData);
    };

    const handleEditTask = (event, task) => {
        event.preventDefault();
        setCurrentTask(task);
        setEditTaskModalShowed(true);
    };

    const getTasks = () => {
        setLoading(true);
        axiosClient.get('/todo-list')
            .then(({data}) => {
                setLoading(false);
                setTasks(data.data);
            })
            .catch(() => {
                setLoading(false);
            })
    };

    return (
        <div>
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                <h1>TODO List</h1>
                <Button onClick={() => setNewTaskModalShowed(true)} variant="dark">
                    + создать новую задачу
                </Button>
            </div>
            <TaskForm
                newTaskModalShowed={newTaskModalShowed}
                setNewTaskModalShowed={setNewTaskModalShowed}
                onSubmit={handleSubmitForm}
                selectsData={selectsData}
            />
            {
                currentTask != null &&
                (
                    <EditTaskModal
                        onSubmit={handleSubmitEditForm}
                        editTaskModalShowed={editTaskModalShowed}
                        setEditTaskModalShowed={setEditTaskModalShowed}
                        task={currentTask}
                        selectsData={selectsData}
                    />
                )
            }

            <div className="taskDesk">
                {
                    !Boolean(tasks.length) &&
                    <p>В настоящее время у вас нет задач</p>
                }
                <Table striped bordered hover>
                    {
                        Boolean(tasks.length) &&
                        (
                            <thead>
                            <tr>
                                <th>Задача</th>
                                <th>Приоритет</th>
                                <th>Дата окончания</th>
                                <th>Ответственный</th>
                                <th>Статус</th>
                            </tr>
                            </thead>
                        )
                    }
                    <tbody>
                    {
                        Boolean(tasks.length) &&
                        tasks.map((user) => (
                            <tr key={user.id} onClick={(e) => handleEditTask(e, user)}>
                                <td className='notake'>{user.title}</td>
                                <td className='notake'>{user.priority.name}</td>
                                <td className='notake'>{user.date_end}</td>
                                <td className='notake'>{user.executor}</td>
                                <td className='notake'>{user.status.name}</td>
                            </tr>
                        ))
                    }
                    </tbody>
                </Table>
            </div>
        </div>
    )
}
