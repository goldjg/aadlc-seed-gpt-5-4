import { ArgumentsCamelCase, Argv } from 'yargs'
import { logger } from '../logger'
import { bold, green } from 'picocolors'
import { FormatArgv, writeFormattedOutput } from '../output'

interface GreetingArgv extends FormatArgv {}

export const command = 'greeting'
export const describe = 'Displays interactive prompts to demonstrate user input handling.'
export const aliases = ['g']

export function builder(yargs: Argv<GreetingArgv>): Argv {
  return yargs
}

export function createGreetingResult(username: string, mood: string) {
  return {
    command: 'greeting',
    username,
    mood,
    greetingMessage: `Hello, ${username}!`,
    farewellMessage: `${username} ${mood}, Ciao!`,
  }
}

export async function handler(argv: ArgumentsCamelCase<GreetingArgv>) {
  const username = await logger.prompt('What is your name?', {
    type: 'text',
  })

  const mood = await logger.prompt('How are you?', {
    type: 'select',
    options: [
      '👌',
      '👍',
      '👎',
      {
        label: '🤬',
        value: '🤬',
        hint: 'take care',
      },
    ],
  })

  const result = createGreetingResult(username, mood)

  writeFormattedOutput(argv.format, result, () => {
    logger.log(`Hello, ${green(bold(username))}!`)
    logger.log(`${green(bold(username))} ${mood}, Ciao!`)
  })
}
