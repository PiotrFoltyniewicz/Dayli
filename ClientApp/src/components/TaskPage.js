import { useAuth } from '../contexts/AuthContext'
import { Calendar } from 'react-calendar'
import { useState } from 'react'
import 'react-calendar/dist/Calendar.css';
function TaskPage() {

    const { loginToken } = useAuth()
    const [chosenDate, setChosenDate] = useState(new Date())

    function convertToWeekName(n) {
        switch (n) {
            case 0:
                return 'Saturday'
        }
    }

    return (
        <div className='taskPage'>
            <aside>
                <Calendar onChange={setChosenDate} />
            </aside>
            <main className='taskPage--main'>
                {`${chosenDate.getUTCDay()} ${chosenDate.getDate()}`}
                <section className='taskPage--main--taskList'>
                    {/*TUTAJ LISTA TASKOW*/}
                    <button>Add task</button>
                </section>
                <section className='taskPage--stats'>
                    {/*WYKRES NA DZISIAJ*/}
                    {/*WYKRES NA TYDZIEÑ*/}
                    {/*WYKRES NA MIESI¥C*/}
                </section>
            </main>
        </div>)
}
export default TaskPage