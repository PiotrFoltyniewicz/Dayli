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
    const [habits, setHabits] = useState([]);
    const [todayStats, setTodayStats] = useState(null);
    const [weekStats, setWeekStats] = useState(null);
    const [monthStats, setMonthStats] = useState(null);
    const [newHabit, setNewHabit] = useState('')
    const newHabitTextRef = useRef(null)

    async function getHabits() {
        const date = chosenDate;
        const habitResponse = await fetch(`/api/habit/${date.getFullYear()}-${date.getMonth() + 1}-${1}:${date.getFullYear()}-${date.getMonth() + 1}-${new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        });

        if (habitResponse.ok) {
            const habitData = await habitResponse.json();
            setHabits(habitData);
        }
    }

    useEffect(() => {
        getHabits();
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

    function renderHabits() {
        console.log(habits)
        return habits;
    }

    function renderDayColumns() {
        const daysInMonth = new Date(chosenDate.getFullYear(), chosenDate.getMonth() + 1, 0).getDate()
        const toRender = []
        for (let i = 0; i < daysInMonth; i++) {
            toRender.push(<td>{i + 1}</td>);
        }
        return toRender;
    }

    async function changeHabitStatus(id) {
        setHabits(prev => {
            return prev.map(habit => habit.id === id ? { ...habit, status: !habit.status } : habit)
        });

        let updatedHabit = {};
        for (let habit of habits) {
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

    function handleAddHabitChange(event) {
        setNewHabit(event.target.value)
    }

    async function handleNewHabitSubmit() {
        if (newHabit.length ===  0) {
            alert("Habit description can't be empty")
            return;
        }
        const habit = {
            id: 0,
            date: new Date(chosenDate.toLocaleDateString()),
            title: newHabit,
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
        setNewHabit('');
        newHabitTextRef.current.value = '';
        getHabits();
    }
    
    async function handleDeleteHabit(id) {
        const response = await fetch(`/api/habit/delete/${id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`
            },
        });
        if (!response.ok) {
            console.log('Error')
        }
        getHabits();
    }

    return (
        <div className='habitPage'>
            <header className='habitPage--header'>
                <h1>Welcome to the Habit Page</h1>
                <h2>{`Today is ${currentDate.getDate()} ${convertToMonthName(currentDate.getMonth())} ${currentDate.getFullYear()}`}</h2>
            </header>
            <main className='habitPage--main'>
                <section className='habitPage--main--habitList'>
                    <h3>{`Habits for ${convertToMonthName(chosenDate.getMonth())} ${chosenDate.getFullYear()}`}</h3>
                    <table className='habitPage--main--habitTable'>
                        <th>
                            <td>Habit</td>
                            {renderDayColumns()}

                        </th>
                        {renderHabits()}
                    </table>
                </section>
                <section className='habitPage--main--stats'>
                    <h3>Statistics till today</h3>
                </section>
            </main>
            <section className='habitPage--advancedStats'>
                <h1>Advanced statistics</h1>
            </section>
        </div>)
}
export default HabitPage