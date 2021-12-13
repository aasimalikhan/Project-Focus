import React from 'react';

import TodoList from './TodoList/TodoList'
import './Tasks.css'
import Fade from 'react-reveal/Fade';

// https://codepen.io/adam_leblanc/pen/OgQRwp

class App extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        items: []
      };
    }
  
    enterItem(e) {
      if (e.keyCode === 13) {
        let joined = this.state.items.concat({
          text: e.target.value,
          button: "edit",
          show: false,
          check: false,
          id: this.state.items.length + 1
        });
        this.setState({ items: joined });
        this.setLocalStorage(joined);
        e.target.value = "";
      }
    }
  
    deleteItem(id) {
      let newState = this.state;
      let index = newState.items.findIndex(item => item.id === id);
      if (index === -1) return;
      newState.items.splice(index, 1);
      this.setState({ items: newState.items });
      this.setLocalStorage(newState.items);
    }
  
    change(id, value) {
      let newState = this.state;
      let index = newState.items.findIndex(item => item.id === id);
      newState.items[index].text = value;
      this.setState({ items: newState.items });
      this.setLocalStorage(newState.items);
    }
  
    mode(id) {
      let newState = this.state;
      let index = newState.items.findIndex(item => item.id === id);
      let isShow = newState.items[index].show;
  
      if (newState.items[index].show === false) {
        newState.items[index].show = !isShow;
        newState.items[index].button = "save";
        this.setState({ items: newState.items });
      } else {
        newState.items[index].show = !isShow;
        newState.items[index].button = "edit";
        this.setState({ items: newState.items });
      }
    }
  
    check(id) {
      let newState = this.state;
      let index = newState.items.findIndex(item => item.id === id);
      let isCheck = newState.items[index].check;
      newState.items[index].check = !isCheck;
      this.setState({ items: newState.items });
      this.setLocalStorage(newState.items);
    }
  
    setLocalStorage(items) {
      let itemsString = JSON.stringify(items);
      localStorage.setItem("todolist", itemsString);
    }
  
    componentDidMount() {
      let defaultList = [
      ];
      let newState = JSON.parse(localStorage.getItem("todolist")) || defaultList;
      this.setState({ items: newState });
    }
  
    render() {
      return (
        <div id="section_main" className="home_container">
        <h2 className="user_heading header_default">TASKS</h2>
        <Fade bottom>
        <div className="container_tasks text-center">
          <h2>Quick Task List</h2>
          <input
            className="input_task enter"
            type="text"
            onKeyUp={this.enterItem.bind(this)}
            placeholder="Enter Task..."
          />
          <TodoList
            items={this.state.items}
            change={this.change.bind(this)}
            deleteItem={this.deleteItem.bind(this)}
            mode={this.mode.bind(this)}
            check={this.check.bind(this)}
          />
        </div>
        </Fade>
        </div>
      );
    }
  }
  
export default App;
  
  