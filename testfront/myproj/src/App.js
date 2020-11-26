import React from 'react';
import logo from './server.svg';
import "./App.css";

class App extends React.Component{
  constructor(props){
    super(props);
    this.state={
      newItem:"",
      list:[]
    }
  }

  addItem(todovalue){
    if(todovalue!==""){
      const newItem={
        id:Date.now(),
        value:todovalue,
        isDone:false
      };
      const list=[...this.state.list];
      list.push(newItem);

      this.setState({
      list,
        newItem:""
      });
    }
  }

  deleteItem(id){
  const list=[...this.state.list];
  const updadatedlist=list.filter(item =>item.id !==id);
  this.setState({list:updadatedlist});
  }

  updateInput(input)
  {
    this.setState({newItem:input});
  }

  render()
  {
    return(
      <div className="root">
      <img src={logo} height="200" width="200" classname="logo"/>
      <h1 classname="app-title">This is ToDO App</h1>
      <div classname="container" >
      Add an item <br />
      <input type="text" 
       classname="input-text" 
       placeholder="write a ToDo"
       required
       value={this.state.newItem}
       onChange={e =>this.updateInput(e.target.value)} 
       />
      <button 
      classname="add-btn"
      onClick={()=>this.addItem(this.state.newItem)}
      disabled={!this.state.newItem.length}
      >
      Add Todo
      </button>
        <div classname="list">
          <ul>
          {this.state.list.map(item=>{
            return(
              <li key={item.id}>
              <input
              type="checkbox"
              name="isDone"
              checked={item.isDone}
              onChange={()=>{}}
              />
              {item.value}
              <button
              className="btn"
              onClick={()=>this.deleteItem(item.id)}

              >Delete</button>
              </li>
            )
          })}
          </ul>
        </div>
      </div>
      </div>
    );
  }
}

export default App;
