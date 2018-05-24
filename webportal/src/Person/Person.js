import React from 'react';
import './Person.css';

const person=(props)=>{
    return (
        <div className="Person">
            <p>Your Name is: {props.name}<br></br>
                Your Age is: {props.age}
            </p>

            <p>
                {props.children}
            </p>
            <input type="text" onChange={props.event}/>

        </div>


    );
}

export default person;