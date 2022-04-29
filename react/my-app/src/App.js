import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './components/ItemTable';
import { v4 as uuidv4 } from 'uuid';
import React from "react";
import ItemTable from "./components/ItemTable";
import ItemForm from "./components/ItemForm";
import itemsJSON from './items.json';
import Searchbar from './components/Searchbar';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

class App extends React.Component {
  constructor(props) {
    super(props);

    itemsJSON.items.forEach((e) =>
        e.key = uuidv4()
    );

    this.state = {
      items: itemsJSON,
      searchKeyword: '',
      sortBy: {
        column: null,
        direction: 'desc',
      }
    }
  }

  setSearchKeyword(event) {
    this.setState({
      searchKeyword: event.target.value
    });
  }

  setSortColumn(column) {
    const dir = this.state.sortBy.direction;
    let nextDir;
    if (this.state.sortBy.column === column) {
      if (dir === 'asc') {
        nextDir = 'desc';
      } else if (dir === "desc") {
        column = null;
      }
    } else {
      nextDir = 'asc';
    }
    this.setState({
      sortBy: {
        column,
        direction: nextDir
      }
    });
  }


  preprocessItems() {
    const cmp = (a, b) => {
      const col = this.state.sortBy.column;
      return this.state.sortBy.direction === 'asc' ? a[col] < b[col] : a[col] > b[col];
    };
    const items =  {
      ...this.state.items,
      items: this.state.items.items.filter((i) => {
        if (this.state.searchKeyword === '') {
          return true;
        }
        return String.prototype.includes.call(i.name, this.state.searchKeyword) ||
            String.prototype.includes.call(i.description, this.state.searchKeyword);
      })
    };

    if (this.state.sortBy.column) {
      items.items.sort(cmp)
    }
    return items;
  }

  add(item) {
    item.key = uuidv4();
    this.setState((prevState, props) => {
      return {
        ...prevState,
        items: {
          ...prevState.items,
          items: [...prevState.items.items, item]
        }
      }
    });
  }

  actionCallback(actionName, data) {
    const actions = {
      'setRating': this.changeRating,
      'deleteItem': this.deleteItem
    };
    if (Object.prototype.hasOwnProperty.call(actions, actionName)) {
      actions[actionName].call(this, data);
    }
  }

  deleteItem(data) {
    this.setState((prevState, props) => {
      let newState = prevState;
      newState.items.items = newState.items.items.filter((item) => {
        return item.key !== data.id;
      });
      return newState;
    });
  }

  changeRating(data) {
    this.setState((prevState, props) => {
      let newState = prevState;
      newState.items.items = newState.items.items.map((item) => {
        if (item.key === data.id) {
          item.rating = data.rating;
        }
        return item;
      });
      return newState;
    });
  }

  render() {
    return (
        <Container>
          <Row>
            <Col>
              <ItemForm
                  addCallback={this.add.bind(this)}
              />
            </Col>
            <Col>
              <Searchbar
                  keyword={this.state.searchKeyword}
                  callback={this.setSearchKeyword.bind(this)}
              />
            </Col>
          </Row>
          <Row>
            <ItemTable
                items={this.preprocessItems(this.state.items)}
                actionCallback={this.actionCallback.bind(this)}
                sortBy={this.state.sortBy}
                setSortColumn={this.setSortColumn.bind(this)}
            />
          </Row>
        </Container>
    );
  }
}

export default App;
