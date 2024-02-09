import { useAuth } from '../contexts/AuthContext';
import { useState } from 'react'
export default function HabitRow(props) {
    const [habits, setHabits] = useState(props.habits)
    const { token, logoutToken } = useAuth();
    return (
        <tr>
            <td>{props.title}</td>
            {props.habits.map(habit => (
                <td key={habit.id}>
                    <input type='checkbox' />
                </td>))}
        </tr>);
}