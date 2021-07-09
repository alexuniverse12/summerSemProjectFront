import React from 'react';
import ReactDOM from 'react-dom';
import AppRouter from './Routers/AppRouter';

const App = () => (
    <AppRouter/>   
)

ReactDOM.render(<App/ >, document.querySelector('#root'))