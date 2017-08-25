export default function ingest(data) {
    return {
        type: 'PLAYERS_INGEST',
        payload: data
    }
}
