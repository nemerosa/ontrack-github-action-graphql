const graphql = require('./graphql');

async function run() {
    const args = process.argv.slice(2);
    const query = args[0];
    const variables = "{}"; // TODO Gets name=value from arguments

    console.log(`Query: ${query}`);
    console.log(`Variables: ${variables}`);

    const vars = JSON.parse(variables);

    graphql(query, vars)
        .then((data) => {
            console.log("data = ", data);
        })
        .catch((err) => {
            console.log("error = ", err.message);
        });
}

run();
