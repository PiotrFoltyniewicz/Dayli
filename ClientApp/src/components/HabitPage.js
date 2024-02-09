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
            toRender.push(<HabitRow key={name.title} title={name.title} habits={habitsToRow} />)
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