import { useAuth } from '../contexts/AuthContext'
import { Calendar } from 'react-calendar'
import { useState, useEffect, useRef } from 'react'
import 'react-calendar/dist/Calendar.css';
import { CircularProgressbar } from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css';

function NotePage() {

    const { token } = useAuth();
    const [chosenDate, setChosenDate] = useState(new Date());
    const currentDate = new Date();
    const [notes, setNotes] = useState([]);
    const [daysWithNotes, setDaysWithNotes] = useState([]);
    const [newNote, setNewNote] = useState('')
    const newNoteTextRef = useRef(null)
    const [editedNoteId, setEditedNoteId] = useState(null)


    async function getDaysWithNotes(date) {
        let response = await fetch(`/api/note/stats/calendar/${date.getFullYear()}-${date.getMonth() + 1}-${1}:${date.getFullYear()}-${date.getMonth() + 1}-${new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        });

        if (response.ok) {
            let data = await response.json();
            data = data.map(date => new Date(date))
            setDaysWithNotes(data);
        }
    }

    async function getNotes() {
        const noteResponse = await fetch(`/api/note/${chosenDate.getFullYear()}-${chosenDate.getMonth() + 1}-${chosenDate.getDate()}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        });

        if (noteResponse.ok) {
            const noteData = await noteResponse.json();
            setNotes(noteData);
        }
    }

    useEffect(() => {
        getNotes();
        getDaysWithNotes(chosenDate);
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

    function renderNotes() {
        return notes.map(note => (
            <div key={note.id} className='noteElement'>
                {editedNoteId === note.id ?
                    <textarea className='noteElement--text' value={note.note} onChange={(event) => handleEditNoteChange(event, note.id)} /> :
                    note.note}

                {editedNoteId === note.id ?
                    <input type='submit' className='noteElement--saveButton' value='💾' onClick={() => handleSaveNote(note.id)} /> :
                    <input type='button' className='noteElement--editButton' value='✏️' onClick={() => handleEditNote(note.id)} />}
                <input type='submit' className='noteElement--deleteButton' value='❌' onClick={() => handleDeleteNote(note.id)} />
            </div>))
    }

    function highlightCalendarTiles({ date, view }) {
        for (let day of daysWithNotes) {
            if (date.getTime() === day.getTime()) {
                return <div className='calendarTile--daysWithNotes' ></div>;
            }
        }
    }

    function onCalendarMonthChange({ action, activeStartDate, value, view }) {
        getDaysWithNotes(activeStartDate);
    }

    function handleAddNoteChange(event) {
        setNewNote(event.target.value)
    }

    async function handleNewNoteSubmit() {
        if (newNote.length ===  0) {
            alert("Note can't be empty")
            return;
        }

        var year = chosenDate.toLocaleDateString('default', { year: 'numeric' });
        var month = chosenDate.toLocaleDateString('default', { month: '2-digit' });
        var day = chosenDate.toLocaleDateString('default', { day: '2-digit' });
        var date = year + '-' + month + '-' + day; 

        const note = {
            id: 0,
            date: new Date(date),
            note: newNote
        };
        const response = await fetch('/api/note/create', {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(note),
        });
        if (!response.ok) {
            console.log('Error')
        }
        setNewNote('');
        newNoteTextRef.current.value = '';
        getNotes();
    }
    
    async function handleDeleteNote(id) {
        const response = await fetch(`/api/note/delete/${id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`
            },
        });
        if (!response.ok) {
            console.log('Error')
        }
        getNotes();
    }

    async function handleEditNote(id) {
        setEditedNoteId(id)
    }

    function handleEditNoteChange(event, id) {
        setNotes(prev => {
            return prev.map(note => note.id === id ? { ...note, note: event.target.value } : note)
        });
    }

    //TODO
    async function handleSaveNote(id) {
        let note = null;
        for (let temp of notes) {
            if (temp.id === id) {
                note = temp;
                break;
            }
        }
        if (note.note.length === 0) {
            alert('Note can\'t be empty');
            return;
        }
        const response = await fetch(`/api/note/update/${id}`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(note),
        });
        if (!response.ok) {
            console.log('Error');
        }
        setEditedNoteId(null);
        getNotes();
    }

    return (
        <div className='notePage'>
            <header className='notePage--header'>
                <h1>Welcome to the note Page</h1>
                <h2>{`Today is ${currentDate.getDate()} ${convertToMonthName(currentDate.getMonth())} ${currentDate.getFullYear()}`}</h2>
            </header>
            <main className='notePage--main'>
                <Calendar
                    className='notePage--calendar'
                    onChange={setChosenDate}
                    onActiveStartDateChange={onCalendarMonthChange}
                    tileContent={highlightCalendarTiles} />
                <section className='notePage--main--noteList'>
                    <h3>{`Notes for ${chosenDate.getDate()} ${convertToMonthName(chosenDate.getMonth())} ${chosenDate.getFullYear()}`}</h3>
                    {notes.length > 0 ? renderNotes() : 'There are no notes'}   
                    <div className='notePage--main--addNote'>
                        <textarea className='notePage--main--addNote--text' ref={newNoteTextRef} onChange={handleAddNoteChange}/>
                        <input className='notePage--main--addNote--button' type='submit' value='➕' onClick={handleNewNoteSubmit} />
                    </div>
                </section>
                <section className='notePage--main--pinnedNotes'>
                    <h3>Pinned notes</h3>
                
                </section>
            </main>
        </div>)
}
export default NotePage