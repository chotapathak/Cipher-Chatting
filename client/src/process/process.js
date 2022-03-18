import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import './process.css';

function Process() {
    const [ play, setPlay] = useState(false);

    const state = useSelector((state) => state.ProcessReducer);

    const defaultOption = {
        loop: true,
        autoplay: true,
    }

return (
    <div className='process'>
        <h5>
            Secrect word: <span>"Hello World"</span>
        </h5>
        <div className='incoming'>
            <h4>Incoming Data</h4>
            <p>{state.cypher}</p>
        </div>
        <div className='crypt'>
            <h4> Decypted Data</h4>
            <p>{state.text}</p>
        </div>
    </div>
);
}

export default Process;