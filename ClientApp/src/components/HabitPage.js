import { useAuth } from '../contexts/AuthContext'
import { Calendar } from 'react-calendar'
import { useState, useEffect, useRef } from 'react'
import 'react-calendar/dist/Calendar.css';
import { CircularProgressbar } from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css';

function HabitPage() {

    const { token } = useAuth();
    const [chosenDate, setChosenDate] = useState(new Date());
    const currentDate = new Date();
    const [habits, sethabits] = useState([]);
    const [todayStats, setTodayStats] = useState(null);
    const [weekStats, setWeekStats] = useState(null);
    const [monthStats, setMonthStats] = useState(null);
    const [daysWithhabits, setDaysWithhabits] = useState([]);
    const [newhabit, setNewhabit] = useState('')
    const newhabitTextRef = useRef(null)


    async function getTodayStats() {
        let currentDate = new Date();

        let response = await fetch(`/api/habit/stats/${currentDate.getFullYear()}-${currentDate.getMonth() + 1}-${currentDate.getDate()}:${currentDate.getFullYear()}-${currentDate.getMonth() + 1}-${currentDate.getDate()}`, {
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

        let response = await fetch(`/api/habit/stats/${prevDate.getFullYear()}-${prevDate.getMonth() + 1}-${prevDate.getDate()}:${currentDate.getFullYear()}-${currentDate.getMonth() + 1}-${currentDate.getDate()}`, {
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

        let response = await fetch(`/api/habit/stats/${prevDate.getFullYear()}-${prevDate.getMonth() + 1}-${prevDate.getDate()}:${currentDate.getFullYear()}-${currentDate.getMonth() + 1}-${currentDate.getDate()}`, {
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

    async function getDaysWithhabits(date) {
        let response = await fetch(`/api/habit/stats/calendar/${date.getFullYear()}-${date.getMonth() + 1}-${1}:${date.getFullYear()}-${date.getMonth() + 1}-${new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        });

        if (response.ok) {
            let data = await response.json();
            data = data.map(date => new Date(date))
            setDaysWithhabits(data);
        }
    }

    async function gethabits() {
        const habitResponse = await fetch(`/api/habit/${chosenDate.getFullYear()}-${chosenDate.getMonth() + 1}-${chosenDate.getDate()}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        });

        if (habitResponse.ok) {
            const habitData = await habitResponse.json();
            sethabits(habitData);
        }
    }

    useEffect(() => {
        gethabits();
        getTodayStats();
        getWeekStats();
        getMonthStats();
        getDaysWithhabits(chosenDate);
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

    function renderhabits() {
        return habits.map(habit => (
            <label key={habit.id} className='habitElement'>
                <input type='checkbox' defaultChecked={habit.status} onChange={() => changehabitStatus(habit.id)} />
                {habit.title}
                <input type='submit' className='habitElement--deleteButton' value='❌' onClick={() => handleDeletehabit(habit.id)} />
            </label>))
    }

    async function changehabitStatus(id) {
        sethabits(prev => {
            return prev.map(habit => habit.id === id ? { ...habit, status: !habit.status } : habit)
        });

        let updatedhabit = {};
        for (let habit of habits) {
            if (habit.id === id) {
                updatedhabit = { ...habit, status: !habit.status }
                break;
            }
        }
        const response = await fetch(`/api/habit/update/${id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(updatedhabit)
        });

        getTodayStats();
        getWeekStats();
        getMonthStats();
    }

    function highlightCalendarTiles({ date, view }) {
        for (let day of daysWithhabits) {
            if (date.getTime() === day.getTime()) {
                return <div className='calendarTile--habitsNotDone' ></div>;
            }
        }
    }

    function onCalendarMonthChange({ action, activeStartDate, value, view }) {
        getDaysWithhabits(activeStartDate);
    }

    function handleAddhabitChange(event) {
        setNewhabit(event.target.value)
    }

    async function handleNewhabitSubmit() {
        if (newhabit.length ===  0) {
            alert("habit description can't be empty")
            return;
        }
        const habit = {
            id: 0,
            date: new Date(chosenDate.toLocaleDateString()),
            title: newhabit,
            status: false
        };
        const response = await fetch('/api/habit/create', {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(habit),
        });
        if (!response.ok) {
            console.log('Error')
        }
        setNewhabit('');
        newhabitTextRef.current.value = '';
        gethabits();
        getTodayStats();
        getWeekStats();
        getMonthStats();
    }
    
    async function handleDeletehabit(id) {
        const response = await fetch(`/api/habit/delete/${id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`
            },
        });
        if (!response.ok) {
            console.log('Error')
        }
        gethabits();
        getTodayStats();
        getWeekStats();
        getMonthStats();
    }

    return (
        <div className='habitPage'>
            <header className='habitPage--header'>
                <h1>Welcome to the habit Page</h1>
                <h2>{`Today is ${currentDate.getDate()} ${convertToMonthName(currentDate.getMonth())} ${currentDate.getFullYear()}`}</h2>
            </header>
            <main className='habitPage--main'>
                <Calendar
                    className='habitPage--calendar'
                    onChange={setChosenDate}
                    onActiveStartDateChange={onCalendarMonthChange}
                    tileContent={highlightCalendarTiles} />
                <section className='habitPage--main--habitList'>
                    <h3>{`habits for ${chosenDate.getDate()} ${convertToMonthName(chosenDate.getMonth())} ${chosenDate.getFullYear()}`}</h3>
                    {habits.length > 0 ? renderhabits() : 'There is nothing we can do'}   
                    <div className='habitPage--main--addhabit'>
                        <input className='habitPage--main--addhabit--text' ref={newhabitTextRef} type='text' onChange={handleAddhabitChange} />
                        <input className='habitPage--main--addhabit--button' type='submit' value='➕' onClick={handleNewhabitSubmit} />
                    </div>
                </section>
                <section className='habitPage--main--stats'>
                    <h3>habits completed today</h3>
                {todayStats === null || todayStats.totalhabits === 0 ? 'There are no habits' :
                        <CircularProgressbar
                            className='habitPage--main--stats--circleProgressbar'
                            value={todayStats.habitsDone}
                            maxValue={todayStats.totalhabits}
                            text={`${Math.round(todayStats.percentage * 100)}%`}
                        />}
                    <h3>habits completed this week</h3>
                    {weekStats === null || weekStats.totalhabits === 0 ? 'There are no habits' :
                        <CircularProgressbar
                            className='habitPage--main--stats--circleProgressbar'
                            value={weekStats.habitsDone}
                            maxValue={weekStats.totalhabits}
                            text={`${Math.round(weekStats.percentage * 100)}%`}
                        />}
                        
                    <h3>habits completed this month</h3>
                    {monthStats === null || monthStats.totalhabits === 0 ? 'There are no habits' :
                        <CircularProgressbar
                            className='habitPage--main--stats--circleProgressbar'
                            value={monthStats.habitsDone}
                            maxValue={monthStats.totalhabits}
                            text={`${Math.round(monthStats.percentage * 100)}%`}
                        />}
                </section>
            </main>
            <section className='habitPage--advancedStats'>
                <h1>Advanced statistics</h1>
            </section>
        </div>)
}
export default HabitPage