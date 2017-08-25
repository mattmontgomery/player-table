import React, { PureComponent } from 'react';

import styled from 'styled-components';

const CollapseDiv = styled.div`
    padding: 1rem;
`;

const CollapseHeader = styled.div`
    cursor: pointer;
`;
const CollapseBody = styled.div`
    height: ${props => props.open ? '25rem' : 0};
    transition: height 1s;
    overflow: hidden;
`;

export default class Collapser extends PureComponent {
    constructor(props) {
        super(props);
        this.toggle = _ => this._toggle();
        this.state = {
            open: props.open
        }
    }
    _toggle() {
        this.setState({ open: !this.state.open });
    }
    render() {
        return (
            <CollapseDiv>
                <CollapseHeader onClick={this.toggle}>{this.props.label}</CollapseHeader>
                <CollapseBody open={this.state.open}>{this.props.children}</CollapseBody>
            </CollapseDiv>
        )
    }
}
