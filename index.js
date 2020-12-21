const core = require('@actions/core');

async function run() {
    const query = core.getInput('query');
    const variables = core.getInput('variables');

    core.debug(`Query: ${query}`);
    core.debug(`Variables: ${variables}`);
}

run();
