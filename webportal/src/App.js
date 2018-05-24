import React, { Component } from 'react';
import './App.css';
import Person from './Person/Person';
import Header from './Header/Header';

class App extends Component {

    constructor() {
        super();
        this.name="Naruto";


};

    state={
        persons:[
            {name:"Rat Man",age:27},
            {name:"Raptor", age:29}
        ]
    };

    stateChangeHandler=()=>{
        this.setState(
            {
                persons:[
                    {name:"HitMan2",age:47},
                    {name:"Saittama",age:30}
                ]
            }
        );

    };
    stateRevertHandler=()=>{
      this.setState(
          {
              persons:[
                  {name:"Rat Man",age:27},
                  {name:"Raptor", age:29}
              ]
          }
      );
    };

    //Event Handler

    eventHandler=(event)=>{
      this.setState(
          {
              persons:[
                  {name:"Rat Man",age:27},
                  {name:event.target.value, age:29}
              ]
          }
      )
    };

  render() {
    return (
        <div className="App">
            <h1>OZUMAKI</h1>
            <h2>{this.name}</h2>
            <Header/>
            <button onClick={this.stateChangeHandler}>Change</button>
            <Person name={this.state.persons[0].name} age={this.state.persons[0].age} click={this.stateChangeHandler.bind(this)}> IS BATMAN</Person>
            <Person name={this.state.persons[1].name} age={this.state.persons[1].age} event={this.eventHandler.bind(this)}/>
            <button onClick={this.stateRevertHandler.bind(this)}>Revert</button>
        </div>

   //   React.createElement('div',{className:'App'},React.createElement('h1',null,'WORKING'))
    );
  }
}

export default App;
