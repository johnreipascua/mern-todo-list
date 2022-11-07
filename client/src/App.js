import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Navigation from './components/Navigation';
import AddTask from './components/AddTask';
import TaskList from './components/TaskList';
import TaskModal from './components/TaskModal';
import { useDispatch } from 'react-redux';
import { getAllTasks } from './features/taskSlice';
import { Container } from 'reactstrap'
import { useEffect } from 'react';

function App() {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getAllTasks());
    },[dispatch])
    return (
        <>
            <TaskModal />
            <Navigation />
            <Container className='mt-4 mb-5'>
                <AddTask />
                <TaskList />
            </Container>
        </>
    )
}

export default App;
