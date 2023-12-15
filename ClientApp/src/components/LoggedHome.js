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
            const taskResponse = await fetch('/api/task/today', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
            });

            if (taskResponse.ok) {
                const taskData = await taskResponse.json();
                setTodayTasks(taskData);
            }
        }

        async function getTodayHabits() {
            const habitResponse = await fetch('/api/habit/today', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
            });

            if (habitResponse.ok) {
                const habitData = await habitResponse.json();
                setTodayHabits(habitData.habits);
            }
        }

        async function getTodayNote() {
            const noteResponse = await fetch('/api/note/today', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
            });

            if (noteResponse.ok) {
                const noteData = await noteResponse.json();
                setTodayNote(noteData);
            }
        }

        getTodayTasks();
        getTodayHabits();
        getTodayNote();
    }, []);

    // Maps array of objects of todayTasks to displayable format
    function renderTodayTasks() {
        return todayTasks.map(task => (
            <label key={task.id} className='task'>
                <input type='checkbox' defaultChecked={task.status} onChange={() => changeTaskStatus(task.id)} />
                {task.title}
            </label>))
    }

    function renderTodayHabits() {
        return todayHabits.map(habit => (
            <label key={habit.id} className='habit'>
                <input type='checkbox' defaultChecked={habit.status} onChange={() => changeHabitStatus(habit.id)} />
                {habit.title}
            </label>))
    }

    function renderTodayNote() {
        return (<p>{todayNote[0].note}</p>)
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

    async function changeHabitStatus(id) {
        setTodayHabits(prev => {
            return prev.map(habit => habit.id === id ? { ...habit, status: !habit.status } : habit)
        });

        let updatedHabit = {};
        for (let habit of todayHabits) {
            if (habit.id === id) {
                updatedHabit = { ...habit, status: !habit.status }
                break;
            }
        }
        const response = await fetch(`/api/habit/update/${id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(updatedHabit)
        });

    }

    return (
        <div className='home--content' >
            { /* Jakieś brane nazwy uzytkownika */}
            <h1>Welcome back</h1>
            <div className='home--userContent'>
                <div className='home--userContent--tasks'>
                    <h2>Today tasks</h2>
                    {todayTasks.length > 0 ? renderTodayTasks() : <p>There is nothing we can do</p>}
                </div>
                <div className='home--userContent--habits'>
                    <h2>Habit tracker</h2>
                    {todayHabits.length > 0 ? renderTodayHabits() : <p>There is nothing we can track</p>}
                </div>
                <div className='home--userContent--notes'>
                    <h2>Todays note</h2>
                    {todayNote.length > 0 ? renderTodayNote() : <p>There is nothing we have noted</p>}
                </div>
            </div>
        </div>
    )
}
export default LoggedHome;
