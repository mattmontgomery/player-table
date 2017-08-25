# player-table

Player Table is a tool for viewing a list of MLS player appearances in a table.

It scrapes MLSSoccer.com to grab player data, bakes out a file, and then allows the UI to use that file.

Importantly, this isn't built to run on an outside-facing server. The web UI requires that a `results.json` file
be in place at build time.

## Getting a results.json file

First, you need at least Node 8.something -- whenever they added spread support for objects (`...`).

From there, run `cd scripts/ && node fetchPlayerData.js` in your command line. That will prompt you for player slugs
until you're done, at which point it will bake out a file to `src/results.json`.

## Running the webserver

From the root directory, run `yarn start` and it will start the server using the tools from `create-react-app`.

### Current constraints

- Only really works with one team at a time; there's no check to ensure players are from separate teams
- Only tested with three players at a time. Theoretically, it works with more, but it's untested.
- So many other things

---

> This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).
