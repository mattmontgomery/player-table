import React, { PureComponent } from 'react';

import { connect } from 'react-redux';

import styled from 'styled-components';

const DateLabel = styled.td`
    font-weight: bold;
    flex: 1;
    text-align: right;
    padding-right: 1rem;
`

const DateEntry = styled.td`
    width: 3rem;
    height: 2rem;
    margin: 0 .15rem;
    background: ${props => !props.mins ? 'transparent' : props.mins >= 45 ? 'linear-gradient(0, #FFFFDD, transparent, transparent)' : 'linear-gradient(0, #DDDDDD, transparent, transparent)'};
    font-weight: ${({ result }) => result === 'W' ? 'bold' : 'normal'};
    text-decoration: ${({ result }) => result === 'L' ? 'line-through' : 'initial'};
`
const DateRow = styled.tr`
    background: ${props => props.result === 'W' ? '#E0FFE0' : props.result === 'T' ? '#FAFAFA' : '#FFE0E0'};
    border-bottom: 1px solid #DDD;
`
const HeaderRow = styled.tr`
    padding: .25rem;
    background: #E0E0E0;
    font-size: .75rem;
`

const DateTable = styled.table`
    border-collapse: collapse;
`

class DateGrid extends PureComponent {
    renderDate(date) {
        const { players } = this.props;
        let result;
        Object.keys(players).map(p => {
            result = players[p][date] ? players[p][date].Result : result;
        });
        return [
            (
                <DateRow key={`row-${date}`} result={result ? result[0] : null}>
                    <DateLabel title={date}>{date} ({result})</DateLabel>
                    {Object.keys(players).map(p => {
                        const mins = players[p][date] ? players[p][date].MINS : null;
                        return (
                            <DateEntry
                                key={`${date}-${p}`}
                                mins={mins ? Number.parseInt(mins, 10) : null}
                                result={result}
                            >
                                {mins !== '0' && mins ? Number.parseInt(mins, 10) : null}
                            </DateEntry>
                        );
                    })}
                </DateRow>
            )
        ];
    }
    render() {
        return (
            <DateTable>
                <tbody>
                    <HeaderRow>
                        <DateLabel>{'Date'}</DateLabel>
                        {
                            Object.keys(this.props.players).map(player => (
                                <DateLabel key={`player-label-${player}`}>{player}</DateLabel>
                            ))
                        }
                    </HeaderRow>
                    {this.props.dates.map(date => this.renderDate(date))}
                </tbody>
            </DateTable>
        );
    }
}

export { DateGrid };
export default connect(
    ({ dates, players }) => ({
        dates: Object.keys(dates),
        players
    })
)(DateGrid);
