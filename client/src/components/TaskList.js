import React from 'react'
import { Card, CardBody, CardTitle, Button } from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';
import { getTask, deleteTask } from '../features/taskSlice'
import { FiEdit, FiTrash2, FiCircle, FiCheckCircle } from "react-icons/fi";

export default function TaskList() {
    const dispatch = useDispatch();
    const { tasks } = useSelector((store) => store.task);
    return (
        <div className='max-width m-auto d-flex flex-column gap-2'>
            {tasks.map((task) => {
                return (
                    <Card className='shadow-sm' key={task._id} id={task._id}>
                        <CardBody className='d-flex p-2'>
                            <CardTitle className={task.completed ? 'text-ellipsis completed' : 'text-ellipsis'}>
                                {task.completed ? <FiCheckCircle /> : <FiCircle />}  {task.task}
                            </CardTitle>
                            <div className='ms-auto d-flex flex-row gap-2'>
                                <Button color='success' outline={true}
                                    onClick={() => dispatch(getTask({id: task._id}))}
                                >
                                    <FiEdit />
                                </Button>
                                <Button color='danger' outline={true}
                                    onClick={() => {
                                        dispatch(deleteTask({id: task._id}))
                                    }}
                                ><FiTrash2 /></Button>
                            </div>
                        </CardBody>
                    </Card>
                )
            })}
        </div>
    )
}
