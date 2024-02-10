import { useAuth } from '../contexts/AuthContext';
import { useState } from 'react'
export default function HabitRow(props) {
    const [habits, setHabits] = useState(props.habits)
    const { token, logoutToken } = useAuth();

    async function changeHabitStatus(id) {


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

    return (
        <tr>
            <td>{props.title}</td>
            {props.habits.map(habit => (
                <td key={habit.id}>
                    <input type='checkbox' defaultChecked={habit.status} onChange={() => changeHabitStatus(habit.id) } />
                </td>))}
            <td>
                <input type='button' value='❌' onClick={props.handleDeleteHabit} />
            </td>
        </tr>);
}