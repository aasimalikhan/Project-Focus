import React from 'react'

class TodoList extends React.Component {
    handleDelete(id) {
      this.props.deleteItem(id);
    }
  
    handleChange(id, e) {
      let newValue = e.target.value;
      this.props.change(id, newValue);
    }
  
    handleMode(id) {
      this.props.mode(id);
    }
  
    handleCheck(id) {
      this.props.check(id);
    }
  
    render() {
      let items = this.props.items.map((item, index) => {
        var isShow = "";
        var isEdit = "";
        if (item.show == false) {
          isEdit = "none";
        } else {
          isShow = "none";
        }
  
        return (
          <tr key={item.id}>
            <td>
              <input
                type="checkbox"
                className="checkbox_task"
                onChange={this.handleCheck.bind(this, item.id)}
                checked={item.check}
              />
            </td>
            <td className="text_task_detail">
              <span style={{ display: isShow }}>{item.text}</span>
              <input
                className="edit"
                style={{ display: isEdit }}
                type="text"
                value={item.text}
                onChange={this.handleChange.bind(this, item.id)}
              />
            </td>
            <td>
              <a
                href="javascript:;"
                className="btn btn-outline-primary"
                onClick={this.handleMode.bind(this, item.id)}
              >
                {item.button}
              </a>
            </td>
            <td>
              <a
                href="javascript:;"
                className="btn btn-outline-danger"
                onClick={this.handleDelete.bind(this, item.id)}
              >
                X
              </a>
            </td>
          </tr>
        );
      });
  
      return (
        <table className="table table-hover">
          <thead>
            <tr>
              <th scope="col">Finish</th>
              <th scope="col">Detail</th>
              <th scope="col">State</th>
              <th scope="col">Remove</th>
            </tr>
          </thead>
          <tbody>{items}</tbody>
        </table>
      );
    }
  }

  export default TodoList;