const crayon = require('crayon');
const { dispatch, createStore } = require('redux');
const scraper = require('table-scraper');
const readline = require('readline');
const fs = require('fs');

const { info, warn, error, success} = crayon;
crayon.verbose = true;

function main() {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });
    const store = getStore();
    ask(rl, store);
}

function ask(rl, store) {
    rl.question('Input a player slug (or press enter to end run): ', (slug) => {
        if(slug === '') {
            done(store);
            return rl.close();
        }
        fetch(slug, store).then(() => ask(rl, store));
    });
}

function getStore() {
    const reducer = (state = {}, action) => {
        switch(action.type) {
            case 'ADD_PLAYER':
                const [_, __, data] = action.payload.data;
                return {
                    ...state,
                    [action.payload.slug]: data
                }
        }
        return state;
    }

    return createStore(reducer);
}

function done(store) {
    const jsonString = JSON.stringify(store.getState());
    fs.writeFile('../src/results.json', jsonString, () => {
        success('results.json written');
    });
}

function fetch(playerSlug, store) {
    const getPlayerUrl = (slug) => `http://www.mlssoccer.com/players/${slug}`;

    function addPlayer(slug, data) {
        return {
            type: 'ADD_PLAYER',
            payload: {slug, data}
        }
    }

    function scrapeForPlayer(slug) {
        if(typeof playerSlug === 'undefined' || !playerSlug) {
            throw 'Please provide a player slug';
        }
        const url = getPlayerUrl(slug);
        info(`Fetching ${url}`);
        return scraper
            .get(url)
            .then(data => {
                store.dispatch(addPlayer(slug, data));
            });
    }

    try {
        return scrapeForPlayer(playerSlug);
    } catch(e) {
        error(e);
    }

}

main();
