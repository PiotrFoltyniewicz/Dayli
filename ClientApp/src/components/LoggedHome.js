import { useEffect } from "react";
import { useAuth } from '../contexts/AuthContext'

function LoggedHome() {

    const { token } = useAuth();
    let todayTasks = []

    useEffect(() => {
        todayTasks = GetTodayTasks();
    }, [])

    async function GetTodayTasks() {
        const response = await fetch('/api/Task/all', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
        });
        const data = await response.json();
        return data;
    }
    return (
        <div className='home--content' >
            { /* Jakieś brane nazwy uzytkownika */}
            <h1>Welcome back</h1>
            <div className='home--userContent'>
                <div className='home--userContent--tasks'>
                    <h2>Today tasks</h2>
                    { todayTasks }
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
