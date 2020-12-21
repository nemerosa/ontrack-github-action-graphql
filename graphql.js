const fetch = require('node-fetch');

let graphql = async function (query, vars) {
    const url = getEnv('ONTRACK_URL');
    const token = getEnv('ONTRACK_TOKEN');

    const fetchUrl = `${url}/graphql`;

    const response = await fetch(
        fetchUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept-Type': 'application/json',
                'X-Ontrack-Token': token
            },
            body: JSON.stringify({
                query: query,
                variables: vars
            })
        }
    );

    return response.json()
        .then((json) => {
            const data = json.data;
            const errors = json.errors;
            if (errors && errors.length > 0) {
                const error = errors[0];
                throw new Error(error.message);
            } else {
                return data;
            }
        });
};

function getEnv(name) {
    let value = process.env[name];
    if (value) {
        return value;
    } else {
        throw new Error(`${name} environment variable is required.`);
    }
}

module.exports = graphql;
