const graphql = require('./graphql');

const PROJECT_LIST = `{
    projects {
        name
    }
}`;

const PROJECT_BY_NAME = `query ProjectByName($name: String!) {
    projects(name: $name) {
        name
    }
}`;

describe('With missing configuration', () => {

    let oldUrl = '';
    let oldToken = '';

    beforeEach(() => {
        oldUrl = process.env['ONTRACK_URL'];
        oldToken = process.env['ONTRACK_TOKEN'];
    });

    afterEach(() => {
        process.env['ONTRACK_URL'] = oldUrl;
        process.env['ONTRACK_TOKEN'] = oldToken;
    });

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

});

describe('Ontrack is configured', () => {

    test('Getting list of projects', async () => {
        await expect(graphql(PROJECT_LIST, {})).resolves.toSatisfy((data) => {
            console.log("data = ", data);
            return data.projects != null;
        });
    });

    test('Getting a project by name', async () => {
        await expect(graphql(PROJECT_BY_NAME, {name: 'ontrack'})).resolves.toSatisfy((data) => {
            const projects = data.projects;
            expect(projects.length).toEqual(1)
            const project = projects[0];
            return project.name === 'ontrack';
        });
    });

});
