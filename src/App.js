import React, {Component} from 'react';
import PlayerInputForm from './Components/PlayerInputForm';
import DateGrid from './Components/DateGrid';
import Collapser from './Components/Collapser';
import './App.css';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import ingest from './actions/players/ingest';

class App extends Component {
    constructor(props) {
        super(props);
        this.handleSubmit = value => this._handleSubmit(value)
    }
    _handleSubmit(value) {
        this.props.ingest(value);
    }
    render() {
        return (
            <div className="App">
                <Collapser label="Input data" open={false}>
                    <PlayerInputForm onSubmit={this.handleSubmit} placeholder="Provide the JSON from scripts/fetchPlayerData" />
                </Collapser>
                <hr />
                <DateGrid />
            </div>
        );
    }
}

const ConnectedApp = connect(
    () => ({ }),
    (dispatch) => ({
        ingest: bindActionCreators(ingest, dispatch)
    })
)(App);

export { App };
export default ConnectedApp;
