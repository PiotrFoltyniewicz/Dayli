import { useEffect, useState } from "react";
import { useAuth } from '../contexts/AuthContext'

function LoggedHome() {

    const { token } = useAuth();
    const [todayTasks, setTodayTasks] = useState([1]);
    const [todayHabits, setTodayHabits] = useState([]);
    const [todayNote, setTodayNote] = useState([]);

    useEffect(() => {
        async function GetTodayTasks() {
            const response = await fetch('/api/Task/all', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    // JAK WYSŁAĆ TEN TOKEN??!!!?! >:(
                    'Authorization': 'Bearer ' + token
                },
            });
            const data = await response.json();
            const output = data.map(x => (
                <label className='task'>
                    <input type='checkbox' checked={x.status} />
                    {x.title}
                </label>))
            setTodayTasks(output);
        }
        GetTodayTasks();
    }, []);

    
    return (
        <div className='home--content' >
            { /* Jakieś brane nazwy uzytkownika */}
            <h1>Welcome back</h1>
            <div className='home--userContent'>
                <div className='home--userContent--tasks'>
                    <h2>Today tasks</h2>
                    { todayTasks.length > 0 ? todayTasks : null}
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
