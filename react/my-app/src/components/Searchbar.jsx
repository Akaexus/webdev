import React from "react";
import Form from 'react-bootstrap/Form';

class Searchbar extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            keyword: ''
        };
    }


    render() {
        return (
            <Form>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Wyszukaj</Form.Label>
                    <Form.Control
                        value={this.props.keyword}
                        onChange={this.props.callback}
                    />
                </Form.Group>
            </Form>
        );
    }
}


export default Searchbar;
