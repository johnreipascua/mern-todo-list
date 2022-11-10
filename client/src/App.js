import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Navigation from './components/Navigation';
import AddTask from './components/AddTask';
import TaskList from './components/TaskList';
import TaskModal from './components/TaskModal';
import { useDispatch, useSelector } from 'react-redux';
import { getAllTasks } from './features/taskSlice';
import { Container } from 'reactstrap'
import { useEffect } from 'react';
import BounceLoader from "react-spinners/BounceLoader";

function App() {
    const dispatch = useDispatch();
    const { loading } = useSelector((store) => store.task);
    
    useEffect(() => {
        dispatch(getAllTasks());
    },[dispatch])

    return (
        <> { loading ? 
            <div className='loading'>
                <BounceLoader
                    color={'#36d7b7'}
                    loading={loading}
                    size={80}
                    aria-label="Loading Spinner"
                    data-testid="loader"
                />
                <br/>
                Connecting to server...
            </div>
             : 
            <>
                <TaskModal />
                <Navigation />
                <Container className='mt-4 mb-5'>
                    <AddTask />
                    <TaskList />
                </Container></> }
        </>
    )
}

export default App;
