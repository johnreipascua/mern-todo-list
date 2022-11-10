import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toggle, handleChangeTaskModal, toggleCompleted, editTask } from '../features/taskSlice';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Form, FormGroup, Input, Label } from 'reactstrap';
export default function TaskModal() {
    const dispatch = useDispatch();
    const { isOpen, taskModal } = useSelector((store) => store.task);

    return (
        <Modal isOpen={isOpen} centered={true}>
            <ModalHeader>Edit Task</ModalHeader>
            <ModalBody>
                <Form className='d-flex flex-column'>
                    <Label><strong>Date Added: </strong>{taskModal.date && taskModal.date.substring(0, 10)}</Label>
                    <FormGroup floating>
                        <Input
                            id="task"
                            name="task"
                            placeholder="e.g. take out the trash"
                            type="text"
                            value={taskModal.task}
                            onChange={e => dispatch(handleChangeTaskModal(e.target.value))}
                            onKeyPress={e => e.key === 'Enter' && e.preventDefault}
                        />
                        <Label for="task">Task:</Label>
                    </FormGroup>
                    <FormGroup switch>
                        <Input type="switch" checked={taskModal.completed}
                            onChange={() => dispatch(toggleCompleted())}
                        />
                        <Label check>Completed</Label>
                    </FormGroup>
                </Form>
            </ModalBody>
            <ModalFooter>
            <Button color="success" outline={true}
                onClick={(e) => {
                    e.preventDefault
                    const payload = {
                        id: taskModal._id,
                        task: taskModal.task,
                        completed: taskModal.completed
                    }
                    dispatch(editTask(payload))
                }}
            >
                Edit
            </Button>{' '}
            <Button color="secondary" outline={true} onClick={() => dispatch(toggle())}>Cancel</Button>
            </ModalFooter>
        </Modal>
    )
}