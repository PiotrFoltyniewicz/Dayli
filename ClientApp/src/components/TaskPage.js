import { useAuth } from '../contexts/AuthContext'
import { Calendar } from 'react-calendar'
import { useState, useEffect, useRef } from 'react'
import 'react-calendar/dist/Calendar.css';
import { CircularProgressbar } from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css';

function TaskPage() {

    const { token } = useAuth();
    const [chosenDate, setChosenDate] = useState(new Date());
    const currentDate = new Date();
    const [tasks, setTasks] = useState([]);
    const [todayStats, setTodayStats] = useState(null);
    const [weekStats, setWeekStats] = useState(null);
    const [monthStats, setMonthStats] = useState(null);
    const [daysWithTasks, setDaysWithTasks] = useState([]);
    const [newTask, setNewTask] = useState('')
    const newTaskTextRef = useRef(null)


    async function getTodayStats() {
        let currentDate = new Date();

        let response = await fetch(`/api/task/stats/${currentDate.getFullYear()}-${currentDate.getMonth() + 1}-${currentDate.getDate()}:${currentDate.getFullYear()}-${currentDate.getMonth() + 1}-${currentDate.getDate()}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        });

        if (response.ok) {
            let data = await response.json();
            setTodayStats(data);
        }
    }

    async function getWeekStats() {
        let currentDate = new Date();
        let prevDate = new Date(new Date().setDate(new Date().getDate() - 7));

        let response = await fetch(`/api/task/stats/${prevDate.getFullYear()}-${prevDate.getMonth() + 1}-${prevDate.getDate()}:${currentDate.getFullYear()}-${currentDate.getMonth() + 1}-${currentDate.getDate()}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        });

        if (response.ok) {
            let data = await response.json();
            setWeekStats(data);
        }
    }

    async function getMonthStats() {
        let currentDate = new Date();
        let prevDate = new Date(new Date().setDate(new Date().getDate() - 30));

        let response = await fetch(`/api/task/stats/${prevDate.getFullYear()}-${prevDate.getMonth() + 1}-${prevDate.getDate()}:${currentDate.getFullYear()}-${currentDate.getMonth() + 1}-${currentDate.getDate()}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        });

        if (response.ok) {
            let data = await response.json();
            setMonthStats(data);
        }
    }

    async function getDaysWithTasks(date) {
        let response = await fetch(`/api/task/stats/calendar/${date.getFullYear()}-${date.getMonth() + 1}-${1}:${date.getFullYear()}-${date.getMonth() + 1}-${new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        });

        if (response.ok) {
            let data = await response.json();
            data = data.map(date => new Date(date))
            setDaysWithTasks(data);
        }
    }

    async function getTasks() {
        const taskResponse = await fetch(`/api/task/${chosenDate.getFullYear()}-${chosenDate.getMonth() + 1}-${chosenDate.getDate()}`, {
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

    useEffect(() => {
        getTasks();
        getTodayStats();
        getWeekStats();
        getMonthStats();
        getDaysWithTasks(chosenDate);
    }, [chosenDate]);
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
            <div key={task.id} className='taskElement'>
                <input type='checkbox' defaultChecked={task.status} onChange={() => changeTaskStatus(task.id)} />
                {task.title}
                <input type='submit' className='taskElement--deleteButton' value='❌' onClick={() => handleDeleteTask(task.id)} />
            </div>))
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

        getTodayStats();
        getWeekStats();
        getMonthStats();
    }

    function highlightCalendarTiles({ date, view }) {
        for (let day of daysWithTasks) {
            if (date.getTime() === day.getTime()) {
                return <div className='calendarTile--tasksNotDone' ></div>;
            }
        }
    }

    function onCalendarMonthChange({ action, activeStartDate, value, view }) {
        getDaysWithTasks(activeStartDate);
    }

    function handleAddTaskChange(event) {
        setNewTask(event.target.value)
    }

    async function handleNewTaskSubmit() {
        if (newTask.length ===  0) {
            alert("Task description can't be empty")
            return;
        }
        var year = chosenDate.toLocaleDateString('default', { year: 'numeric' });
        var month = chosenDate.toLocaleDateString('default', { month: '2-digit' });
        var day = chosenDate.toLocaleDateString('default', { day: '2-digit' });
        var date = year + '-' + month + '-' + day; 

        const task = {
            id: 0,
            date: date,
            title: newTask,
            status: false
        };
        const response = await fetch('/api/task/create', {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(task),
        });
        if (!response.ok) {
            console.log('Error')
        }
        setNewTask('');
        newTaskTextRef.current.value = '';
        getTasks();
        getTodayStats();
        getWeekStats();
        getMonthStats();
    }
    
    async function handleDeleteTask(id) {
        const response = await fetch(`/api/task/delete/${id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`
            },
        });
        if (!response.ok) {
            console.log('Error')
        }
        getTasks();
        getTodayStats();
        getWeekStats();
        getMonthStats();
    }

    return (
        <div className='taskPage'>
            <header className='taskPage--header'>
                <h1>Welcome to the Task Page</h1>
                <h2>{`Today is ${currentDate.getDate()} ${convertToMonthName(currentDate.getMonth())} ${currentDate.getFullYear()}`}</h2>
            </header>
            <main className='taskPage--main'>
                <Calendar
                    className='taskPage--calendar'
                    onChange={setChosenDate}
                    onActiveStartDateChange={onCalendarMonthChange}
                    tileContent={highlightCalendarTiles} />
                <section className='taskPage--main--taskList'>
                    <h3>{`Tasks for ${chosenDate.getDate()} ${convertToMonthName(chosenDate.getMonth())} ${chosenDate.getFullYear()}`}</h3>
                    {tasks.length > 0 ? renderTasks() : 'There is nothing we can do'}   
                    <div className='taskPage--main--addTask'>
                        <input className='taskPage--main--addTask--text' ref={newTaskTextRef} type='text' onChange={handleAddTaskChange} />
                        <input className='taskPage--main--addTask--button' type='submit' value='➕' onClick={handleNewTaskSubmit} />
                    </div>
                </section>
                <section className='taskPage--main--stats'>
                    <h3>Tasks completed today</h3>
                {todayStats === null || todayStats.totalTasks === 0 ? 'There are no tasks' :
                        <CircularProgressbar
                            className='taskPage--main--stats--circleProgressbar'
                            value={todayStats.tasksDone}
                            maxValue={todayStats.totalTasks}
                            text={`${Math.round(todayStats.percentage * 100)}%`}
                        />}
                    <h3>Tasks completed this week</h3>
                    {weekStats === null || weekStats.totalTasks === 0 ? 'There are no tasks' :
                        <CircularProgressbar
                            className='taskPage--main--stats--circleProgressbar'
                            value={weekStats.tasksDone}
                            maxValue={weekStats.totalTasks}
                            text={`${Math.round(weekStats.percentage * 100)}%`}
                        />}
                        
                    <h3>Tasks completed this month</h3>
                    {monthStats === null || monthStats.totalTasks === 0 ? 'There are no tasks' :
                        <CircularProgressbar
                            className='taskPage--main--stats--circleProgressbar'
                            value={monthStats.tasksDone}
                            maxValue={monthStats.totalTasks}
                            text={`${Math.round(monthStats.percentage * 100)}%`}
                        />}
                </section>
            </main>
            <section className='task-Page--advancedStats'>
                <h1>Advanced statistics</h1>
            </section>
        </div>)
}
export default TaskPage