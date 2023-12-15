import { useEffect, useState } from "react";
import { useAuth } from '../contexts/AuthContext'

function LoggedHome() {

    const { token } = useAuth();
    const [todayTasks, setTodayTasks] = useState([]);
    const [todayHabits, setTodayHabits] = useState([]);
    const [todayNote, setTodayNote] = useState([]);

    // Getting initial data from database
    useEffect(() => {
        async function getTodayTasks() {
            const response = await fetch('/api/task/today', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
            });

            if (response.ok) {
                const data = await response.json();
                setTodayTasks(data);
            }
        }
        // TODO
        async function getTodayHabits() {
            const response = await fetch('/api/task/today', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
            });

            if (response.ok) {
                const data = await response.json();
                setTodayTasks(data);
            }
        }

        // TODO
        async function getTodayNotes() {
            const response = await fetch('/api/task/today', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
            });

            if (response.ok) {
                const data = await response.json();
                setTodayTasks(data);
            }
        }

        getTodayTasks();
    }, []);

    // Maps array of objects of todayTasks to displayable format
    function renderTodayTasks() {
        return todayTasks.map(task => (
            <label key={task.id} className='task'>
                <input type='checkbox' defaultChecked={task.status} onChange={() => changeTaskStatus(task.id)} />
                {task.title}
            </label>))
    }


    // Updates state of todayTasks and updates task status in database
    async function changeTaskStatus(id) {
        setTodayTasks(prev => {
            return prev.map(task =>  task.id === id ? { ...task, status: !task.status } : task )
        });
        
        let updatedTask = {};
        for (let task of todayTasks) {
            if (task.id === id) {
                updatedTask = { ...task, status: !task.status }
                break;
            }
        }
        const response = await fetch(`/api/task/update/${id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(updatedTask)
        });
        
    }

    return (
        <div className='home--content' >
            { /* Jakieś brane nazwy uzytkownika */}
            <h1>Welcome back</h1>
            <div className='home--userContent'>
                <div className='home--userContent--tasks'>
                    <h2>Today tasks</h2>
                    { todayTasks.length > 0 ? renderTodayTasks() : null}
                </div>
                <div className='home--userContent--habits'>
                    <h2>Habit tracker</h2>
                </div>
                <div className='home--userContent--notes'>
                    <h2>Todays note</h2>
                </div>
            </div>
        </div>
    )
}
export default LoggedHome;
