import React, {useEffect} from 'react'
import {useHistory} from "react-router-dom";

const MainPage = () => {
    const history =  useHistory();

    const routeChange = (path) =>{  
        history.push(path);
    }

    const handleErrors = (response) => {
        if (!response.ok) {
            throw Error(response.statusText);
        }
        return response;
    }

    useEffect(() => {
        const checkLoged = async () => {
            await fetch("https://localhost:5001/user", {
                method: "GET",
                headers: {"Content-Type": "application/json"},
                credentials: "include",
            }).then(handleErrors).then(response => routeChange("/userNotes")).catch(err => console.log(err));
        }   
        checkLoged();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    
    
    
    return (
        <div className = 'main' >
            <h1>Notes</h1>
            <button onClick = {() => routeChange("/register")} >Sign Up</button>
            <button onClick = {() => routeChange("/login")} >Login</button>
        </div>
    
)}

export default MainPage