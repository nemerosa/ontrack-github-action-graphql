const core = require('@actions/core');
const graphql = require('./graphql');

async function run() {
    const query = core.getInput('query');
    const variables = core.getInput('variables');

    core.debug(`Query: ${query}`);
    core.debug(`Variables: ${variables}`);

    const vars = JSON.parse(variables);

    graphql(query, vars)
        .then((data) => {
            core.setOutput('data', data);
        })
        .catch((err) => {
            core.setFailed(err.message);
        });
}

run();
