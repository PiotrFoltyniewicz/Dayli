import { useAuth } from '../contexts/AuthContext'
import { Calendar } from 'react-calendar'
import { useState, useEffect } from 'react'
import 'react-calendar/dist/Calendar.css';
import { CircularProgressbar } from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css';

function TaskPage() {

    const { token } = useAuth();
    const [chosenDate, setChosenDate] = useState(new Date());
    const currentDate = new Date();
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        async function getTasks() {
            const taskResponse = await fetch('/api/task/today', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
            });

            if (taskResponse.ok) {
                const taskData = await taskResponse.json();
                setTasks(taskData);
            }
        }
        getTasks();
    }, []);
    function convertToMonthName(n) {
        switch (n) {
            case 0:
                return 'January';
            case 1:
                return 'February';
            case 2:
                return 'March';
            case 3:
                return 'April';
            case 4:
                return 'May';
            case 5:
                return 'June';
            case 6:
                return 'July';
            case 7:
                return 'August';
            case 8:
                return 'September';
            case 9:
                return 'October';
            case 10:
                return 'November';
            case 11:
                return 'December';
            default:
                return 'Error';
        }
    }

    function renderTasks() {
        return tasks.map(task => (
            <label key={task.id} className='taskElement'>
                <input type='checkbox' defaultChecked={task.status} onChange={() => changeTaskStatus(task.id)} />
                {task.title}
            </label>))
    }

    async function changeTaskStatus(id) {
        setTasks(prev => {
            return prev.map(task => task.id === id ? { ...task, status: !task.status } : task)
        });

        let updatedTask = {};
        for (let task of tasks) {
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
        <div className='taskPage'>
            <header className='taskPage--header'>
                <h1>Welcome to the Task Page</h1>
                <h2>{`Today is ${currentDate.getUTCDate()} ${convertToMonthName(currentDate.getUTCMonth())} ${currentDate.getUTCFullYear()}`}</h2>
            </header>
            <div className='taskPage--wrapper'>
                <aside>
                    { /* jak mo¿liwe to daæ kropki przy dniach gdzie s¹ taski do zrobienia i haczyki jak wszystkie zrobione*/}
                    <Calendar onChange={setChosenDate} />
                </aside>
                <main className='taskPage--main'>
                    <section className='taskPage--main--taskList'>
                        <h3>{`Tasks for ${chosenDate.getUTCDate()} ${convertToMonthName(chosenDate.getUTCMonth())} ${chosenDate.getUTCFullYear()}`}</h3>
                        {tasks.length > 0 ? renderTasks() : 'There is nothing we can do'}                                     
                        <button>Add task</button>
                    </section>
                    <section className='taskPage--main--stats'>
                        <h3>Tasks completed today</h3>
                        <CircularProgressbar className='taskPage--main--stats--circleProgressbar'/>
                        <h3>Tasks completed this week</h3>
                        <CircularProgressbar className='taskPage--main--stats--circleProgressbar'/>
                        <h3>Tasks completed this month</h3>
                        <CircularProgressbar className='taskPage--main--stats--circleProgressbar'/>
                    </section>
                </main>
            </div>
            <section className='task-Page--advancedStats'>
                <h3>Advanced statistics</h3>
            </section>
        </div>)
}
export default TaskPage