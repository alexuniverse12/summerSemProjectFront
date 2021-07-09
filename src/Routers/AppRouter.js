import React from 'react'
import  {BrowserRouter, Route, Switch} from 'react-router-dom'
import Login from '../Components/Login'
import Register from '../Components/Register'
import UserNotes from '../Components/UserNotes'
import MainPage from '../Components/MainPage'



const AppRouter = () => (
        <BrowserRouter>
            <Switch> 
                <Route exact path='/' component = {MainPage} />
                <Route path='/register' component = {Register} /> 
                <Route path='/login' component = {Login} /> 
                <Route path='/userNotes' component = {UserNotes} /> 
            </Switch>
        </BrowserRouter>
)


export default AppRouter