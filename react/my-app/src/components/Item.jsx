import React from 'react';
import 'react-rating';
import Rating from "react-rating";
import Button from 'react-bootstrap/Button';


class Item extends React.Component {

    setRating(rating) {
        this.props.actionCallback(
            'setRating',
            {
                id: this.props.item.key,
                rating
            }
        );
    }

    deleteItem() {
        this.props.actionCallback(
            'deleteItem',
            {
                id: this.props.item.key,
            }
        );
    }

    render() {
        return (
            <tr>
                <td>
                    {this.props.item['name']}
                </td>
                <td>
                    <img src={this.props.item['image']} alt="" />

                </td>
                <td>
                    {this.props.item['description']}
                </td>
                <td>
                    <Rating
                        start={0}
                        stop={5}
                        step={1}
                        initialRating={this.props.item['rating']}
                        onChange={this.setRating.bind(this)}
                    />
                </td>

                <td>
                    <Button variant="danger" onClick={this.deleteItem.bind(this)}>Usuń</Button>
                </td>
            </tr>
        );
    }
}


export default Item;
