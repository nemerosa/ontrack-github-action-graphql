const graphql = require('./graphql');

const PROJECT_LIST = `{
    projects {
        name
    }
}`;

test('Ontrack URL is required', async () => {
    process.env['ONTRACK_URL'] = '';
    process.env['ONTRACK_TOKEN'] = '';
    await expect(graphql(PROJECT_LIST, {})).rejects.toThrow('ONTRACK_URL environment variable is required.');
});

test('Ontrack token is required', async () => {
    process.env['ONTRACK_URL'] = 'http://localhost:8080';
    process.env['ONTRACK_TOKEN'] = '';
    await expect(graphql(PROJECT_LIST, {})).rejects.toThrow('ONTRACK_TOKEN environment variable is required.');
});
