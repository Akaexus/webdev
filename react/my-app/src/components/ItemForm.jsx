import 'bootstrap/dist/css/bootstrap.min.css';
import React from "react";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Rating from "react-rating";

class ItemForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            image: '',
            description: '',
            rating: 0
        }
    }

    handleChange(field, event) {
        this.setState((prevState, props) => {
           return {
               [field]: typeof event === 'object' ? event.target.value : event
           };
        });
    }


    handleSubmit(event) {
        event.preventDefault();
        this.props.addCallback(this.state);
        this.setState(() => {return {
            name: '',
            image: '',
            description: '',
            rating: 0
        }})
    }

    render() {
        return (
            <Form onSubmit={this.handleSubmit.bind(this)}>
                <Form.Group className="mb-3">
                    <Form.Label>Nazwa</Form.Label>
                    <Form.Control
                        placeholder="Nazwa"
                        value={this.state.name}
                        onChange={this.handleChange.bind(this, 'name')}
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Obrazek</Form.Label>
                    <Form.Control
                        placeholder="URL"
                        value={this.state.image}
                        onChange={this.handleChange.bind(this, 'image')}
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Opis</Form.Label>
                    <Form.Control
                        placeholder="Opis"
                        value={this.state.description}
                        onChange={this.handleChange.bind(this, 'description')}
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Rating
                        start={0}
                        stop={5}
                        step={1}
                        initialRating={this.state.rating}
                        onChange={this.handleChange.bind(this, 'rating')}
                    />
                </Form.Group>

                <Button className="mb-3" variant="primary" type="submit">
                    Dodaj
                </Button>
            </Form>

        );
    }
}

export default ItemForm;
