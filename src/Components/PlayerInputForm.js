import React, { PureComponent } from 'react';

import Form from './Form';
import BigTextarea from './BigTextarea';
import SubmitButton from './SubmitButton';

export default class PlayerInputForm extends PureComponent {
    constructor(props) {
        super(props);
        this.handleSubmit = ev => this._handleSubmit(ev);
        this.updateState = ev => this._updateState(ev);
    }
    state = {
        value: null
    }
    _handleSubmit(ev) {
        ev.preventDefault();
        this.props.onSubmit(this.state.value);
    }
    _updateState({ target: { value }}) {
        this.setState({
            value
        });
    }
    render() {
        return (
            <Form onSubmit={this.handleSubmit}>
                <BigTextarea onChange={this.updateState}></BigTextarea>
                <SubmitButton onClick={this.handleSubmit} type="submit">{'Submit'}</SubmitButton>
            </Form>
        );
    }
}
