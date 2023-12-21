import { useAuth } from '../contexts/AuthContext'
import { Calendar } from 'react-calendar'
import 'react-calendar/dist/Calendar.css';
function TaskPage() {

    const {loginToken } = useAuth()

    return (
        <div className='taskPage'>
            <aside>
                <Calendar />
            </aside>
            <main className='taskPage--main'>
                {/*DATA Z KALENDARZA*/}
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