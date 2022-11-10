import React from 'react'
import { InputGroup, Input, Button } from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';
import { handleChangeTaskName, addTask } from '../features/taskSlice';

export default function AddTask() {
    const dispatch = useDispatch();
    const { taskName } = useSelector((store) => store.task);
    return (
        <div className='max-width m-auto mb-3'>
            <InputGroup>
                <Input 
                    required
                    value={taskName}
                    placeholder="e.g. take out the trash" 
                    onChange={e => {
                        dispatch(handleChangeTaskName(e.target.value));
                    }}
                    onKeyPress={e => e.key === 'Enter' && dispatch(addTask())}
                />
                <Button 
                    color="primary"
                    onClick={() => {
                        dispatch(addTask());
                    }}
                >
                    Add Task
                </Button>
            </InputGroup>
        </div>
    )
}
