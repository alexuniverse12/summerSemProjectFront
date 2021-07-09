import React, { useState, useEffect } from 'react'
import { useHistory } from "react-router-dom";

const UserNotes = () => {
    const history =  useHistory();
    const [notesData, setNotes] = useState(null);
    const [status, setStatus] = useState(0);
    const [note, setNote] = useState("");

    const routeChange = (path) =>{  
        history.push(path);
    }

    useEffect(() => {
        const getData = async () => {
            
            const userNotes = await fetch("https://localhost:5001/user/getAllNotes", {
                method: "GET",
                headers: {"Content-Type": "application/json"},
                credentials: "include",
            }).catch(err => console.log(err));
            

            const un = userNotes;
            const unj = await userNotes.json() // user data in json

            await setStatus(un.status);

            await setNotes(unj);      
        }; 

        getData();
    })
    // }, [note, notesData, status])

    const onSubmit = async (e) => {
        e.preventDefault();

        const dataToSend = {
            noteContent: note,
            creationDate: new Date().toString()
        };
        
        await fetch("https://localhost:5001/user/addNote", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            credentials: "include",
            body: JSON.stringify(dataToSend)
        }).catch(err => console.log(err));
        setNote("")
    }

    const onLogout = async (e) => {
        e.preventDefault();

        await fetch("https://localhost:5001/logout", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            credentials: "include",
        }).catch(err => console.log(err)).then(routeChange("/"));
        setNote("")
    }


    const onDelete = async (not, e) => {
        e.preventDefault();

        const dataToSend = {
            noteId: not.noteId,
            noteContent:  not.noteContent,
            creationDate: not.creationDate
        };
        
        await fetch("https://localhost:5001/user/deleteNote", {
            method: "DELETE",
            headers: {"Content-Type": "application/json"},
            credentials: "include",
            body: JSON.stringify(dataToSend)
        }).catch(err => console.log(err));
        
        setNote("")
    } 

    

    if(status === 200){
        return (
            <div className = 'main' >
                <button onClick = {(e) => onLogout(e)} >Logout</button>
                <h1>Your Notes</h1>
                <div>
                <input placeholder = "note" value = {note}  onChange = {e => setNote(e.target.value)} />
                <button onClick = {(e) => onSubmit(e)} >Add Note</button>
                </div>
                <div>
                    {status === 200 && notesData && notesData.notes ?  notesData.notes.sort((a,b) => (Date.parse(a.creationDate) - Date.parse(b.creationDate))).map((note) => (
                        <div key = {note.noteId} >
                            <p>{note.noteContent}</p>
                            <button onClick = {(e) => onDelete(note, e) }>Delete Note</button>
                        </div>)) :  " "}
                </div>
            </div>
        );
    } else {
        return (
            <div className = 'main' >
                <h1>Not Authorized</h1>
            </div>
        );
        
    }
    
}

export default UserNotes