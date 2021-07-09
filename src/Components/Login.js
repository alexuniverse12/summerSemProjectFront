import React, {useState} from 'react'
import { useHistory } from "react-router-dom";

const Login = () => {
    const history =  useHistory();
    const [emailState, setEmailState] = useState("");
    const [passwordState, setPassState] = useState("");
    const [err, setErr] = useState(false);

    const routeChange = (path) => {  
        history.push(path);
    }

    const handleErrors = (response) => {
        if (!response.ok) {
            throw Error(response.statusText);
        }
        return response;
    }
    
    const onSubmit = async (e) => {
        e.preventDefault();

        const dataToSend = {
            Email: emailState,
            Password: passwordState
        };
        
        await fetch("https://localhost:5001/login", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            credentials: "include",
            body: JSON.stringify(dataToSend)
        }).then(handleErrors).then(response => routeChange("/userNotes")).catch(err => {console.log(err); setErr(true)} );
    }

    return (
        <div className = 'login' >
            <h1>Login</h1>
            <form>
                <input placeholder = "email" value = {emailState}  onChange = {e => setEmailState(e.target.value)} />
                <input placeholder = "password" value = {passwordState} onChange = {e => setPassState(e.target.value)} />
                <button onClick = {(e) => onSubmit(e)} >Submit</button>
                <div>{err ? "Invalid Credentials" : ""}</div>
            </form>
        </div>
    
)}

export default Login