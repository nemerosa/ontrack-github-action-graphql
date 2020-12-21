import * as core from '@actions/core'

async function run(): Promise<void> {
  try {
    const query: string = core.getInput('query')
    const variables: string = core.getInput('variables')

    core.debug(`Query: ${query}`)
    core.debug(`Variables: ${variables}`)
  } catch (error) {
    core.setFailed(error.message)
  }
}

run()
