const fetch = require('node-fetch');

let graphql = async function (query, vars) {
    const url = getEnv('ONTRACK_URL');
    const token = getEnv('ONTRACK_TOKEN');

    const fetchUrl = `${url}/graphql`;

    return fetch(
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
    )
        .then((response) => response.json())
        .then((json) => {
            if (json.status && json.message) {
                throw new Error(`HTTP ${json.status}: ${json.message}`)
            } else {
                const data = json.data;
                const errors = json.errors;
                if (errors && errors.length > 0) {
                    const error = errors[0];
                    throw new Error(error.message);
                } else {
                    return data;
                }
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
