require('datejs');

export default function players(state = {}, { type, payload }) {
    switch(type) {
        case 'PLAYERS_INGEST':
            try {
                const data = JSON.parse(payload);
                const reduced = {};
                Object.keys(data).forEach((slug) => {
                    reduced[slug] = data[slug].reduce((obj, item) => {
                        const { Date: date } = item;
                        const d = new Date(date).format('%Y-%m-%d');
                        obj[d] = item;
                        return obj;
                    }, {})
                });
                return reduced;
            } catch(e) {
                return state;
            }
        case 'PLAYERS_INGEST_RAW':
            try {
                const data = payload;
                const reduced = {};
                Object.keys(data).forEach((slug) => {
                    reduced[slug] = data[slug].reduce((obj, item) => {
                        const { Date: date } = item;
                        const d = new Date(date).format('%Y-%m-%d');
                        obj[d] = item;
                        return obj;
                    }, {})
                });
                return reduced;
            } catch(e) {
                return state;
            }
        default:
            return state;
    }
}
