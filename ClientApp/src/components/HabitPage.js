import { useAuth } from '../contexts/AuthContext'
import { Calendar } from 'react-calendar'
import { useState, useEffect, useRef } from 'react'
import 'react-calendar/dist/Calendar.css';
import { CircularProgressbar } from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css';
import HabitRow from './HabitRow';

function HabitPage() {

    const { token } = useAuth();
    const chosenDate = new Date();
    const [habits, setHabits] = useState([]);
    const [habitList, setHabitList] = useState([]);
    const newHabitTextRef = useRef(null);
    const [newHabit, setNewHabit] = useState([]);

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

    async function getHabitList() {
        const habitListResponse = await fetch(`/api/habitList`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        });

        if (habitListResponse.ok) {
            const habitListData = await habitListResponse.json();
            setHabitList(habitListData);
        }
    }

    useEffect(() => {
        getHabits();
        getHabitList();
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

    function renderHabits() {
        let toRender = [];
        for (let name of habitList) {
            const habitsToRow = []
            for (let habitGroup of habits) {
                for (let habit of habitGroup.habits) {
                    if (habit !== null && habit.title === name.title) {
                        habitsToRow.push(habit);
                    }
                }
            }
            toRender.push(<HabitRow key={name.id} handleDeleteHabit={() => deleteHabit(name.id)} title={name.title} habits={habitsToRow} />)
        }
        return toRender;
    }

    function renderDayColumns() {
        const daysInMonth = new Date(chosenDate.getFullYear(), chosenDate.getMonth() + 1, 0).getDate()
        const toRender = []
        for (let i = 0; i < daysInMonth; i++) {
            toRender.push(<th key={i}>{i + 1}</th>);
        }
        return toRender;
    }

    function handleAddHabitChange(event) {
        setNewHabit(event.target.value)
    }

    async function handleNewHabitSubmit() {
        if (newHabit.length === 0) {
            alert("Habit name can't be empty")
            return;
        }
        const response1 = await fetch(`/api/habitList/add/${newHabit}`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });
        const habitId = await response1.text();
        if (!response1.ok) {
            console.log('Error')
        }
        else {
            const date = chosenDate;
            const response2 = await fetch(`/api/habit/create/${date.getFullYear()}-${date.getMonth() + 1}-${1}:${date.getFullYear()}-${date.getMonth() + 1}-${new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()}`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({array: [{ id: habitId, title: newHabit }]}),
            });
            if (!response2.ok) {
                console.log('Error')
            }
        }
        setNewHabit('');
        newHabitTextRef.current.value = '';
        getHabits();
        getHabitList();
    }

    async function deleteHabit(id) {
        const response = await fetch(`/api/habitList/delete/${id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`
            },
        });
        if (!response.ok) {
            console.log('Error')
        }
        getHabits();
        getHabitList();
    }

    return (
        <div className='habitPage'>
            <header className='habitPage--header'>
                <h1>Welcome to the Habit Page</h1>
                <h2>{`Today is ${chosenDate.getDate()} ${convertToMonthName(chosenDate.getMonth())} ${chosenDate.getFullYear()}`}</h2>
            </header>
            <main className='habitPage--main'>
                <section className='habitPage--main--habitList'>
                    <h3>{`Habits for ${convertToMonthName(chosenDate.getMonth())} ${chosenDate.getFullYear()}`}</h3>
                    <table className='habitPage--main--habitTable'>
                        <thead>
                            <tr>
                                <th>Habit</th>
                                {renderDayColumns()}
                            </tr>
                        </thead>
                        <tbody>
                            {(habits.length !== 0 && habitList.length !== 0) && renderHabits()}
                        </tbody>
                        <tfoot className='tableFoot'>
                            <tr>
                                <td>
                                    <input type='text' ref={newHabitTextRef} onChange={handleAddHabitChange} />
                                    <input type='submit' value='➕' onClick={handleNewHabitSubmit} />
                                </td>
                            </tr>
                        </tfoot>
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