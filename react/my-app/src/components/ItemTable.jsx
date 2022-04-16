import React from 'react';
import Item from './Item';
import Table from 'react-bootstrap/Table';

class ItemTable extends React.Component {
    setSortColumn(key) {
        this.props.setSortColumn(key);
    }

    render() {
        return (
          <Table striped bordered hover>
              <thead>
                <tr>
                    {Object.entries(this.props.items.columnNames).map(([key, columnName]) => (
                        <th key={key} onClick={this.setSortColumn.bind(this, key)}>
                            {columnName}{this.props.sortBy.column === key ? ` (${this.props.sortBy.direction})` : ''}
                        </th>
                    ))}
                    <th />
                </tr>
              </thead>
              <tbody>
                {this.props.items.items.map(item =>
                    <Item
                        key={item.key}
                        item={item}
                        actionCallback={this.props.actionCallback}
                    />
                )}
              </tbody>
          </Table>
        );
    }
}


export default ItemTable;
