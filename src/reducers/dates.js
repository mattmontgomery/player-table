require('datejs');

export default function dates(state = {}, { type, payload }) {
    switch(type) {
        case 'PLAYERS_INGEST':
            try {
                const players = JSON.parse(payload);
                const dates = {};
                Object.keys(players).forEach(slug => {
                    players[slug].forEach(({ Date: date }) => {
                        const d = new Date(date).format('%Y-%m-%d');
                        dates[d] = state[d] ? state[d].indexOf(slug) === -1 ? [...state[d], slug] : state[d] : [slug]
                    });
                });
                return dates;
            } catch(e) {
                console.error(e);
                return state;
            }
        case 'PLAYERS_INGEST_RAW':
            try {
                const players = payload;
                Object.keys(players).forEach(slug => {
                    players[slug].forEach(({ Date: date }) => {
                        const d = new Date(date).format('%Y-%m-%d');
                        dates[d] = state[d] ? state[d].indexOf(slug) === -1 ? [...state[d], slug] : state[d] : [slug]
                    });
                });
                return dates;
            } catch(e) {
                console.error(e);
                return state;
            }
        default:
            return state;
    }
}
