import { isAbsolute, join } from 'path'
import { ArgumentsCamelCase, Argv } from 'yargs'
import * as process from 'node:process'
import { logger } from '../logger'
import { bold, green, red } from 'picocolors'
import { downloadTemplate } from 'giget'
import { FormatArgv, writeFormattedOutput } from '../output'

interface CreateArgv extends FormatArgv {
  path: string
}

const noOp = () => undefined

export const command = 'create <path>'
export const describe = 'Create new project based on `cli-typescript-starter`.'
export const aliases = ['c']

export function builder(yargs: Argv<CreateArgv>): Argv {
  return yargs
    .positional('path', {
      type: 'string',
      description: 'path to working directory',
      default: 'cli-typescript-starter',
    })
    .coerce('path', (value: string) => {
      if (isAbsolute(value)) {
        return value
      }
      return join(process.cwd(), value)
    })
}

export async function handler(argv: ArgumentsCamelCase<CreateArgv>) {
  const ready = await logger.prompt(green(`Are you ready to create new project at ${argv.path} folder?`), {
    type: 'confirm',
  })
  if (!ready) {
    writeFormattedOutput(
      argv.format,
      {
        command: 'create',
        path: argv.path,
        ready: false,
        created: false,
      },
      noOp,
    )
    return
  }

  try {
    await downloadTemplate('gh:kucherenko/cli-typescript-starter', {
      dir: argv.path,
    })
    writeFormattedOutput(
      argv.format,
      {
        command: 'create',
        path: argv.path,
        ready: true,
        created: true,
        nextStep: 'pnpm install',
      },
      () => {
        logger.box(
          green(
            `The cli project created at ${bold(argv.path)} folder.\n Go to the folder and run ${bold('pnpm install')} to start!\n Enjoy your coding!`,
          ),
        )
      },
    )
  } catch (e) {
    const errorMessage = (e as Error).message

    writeFormattedOutput(
      argv.format,
      {
        command: 'create',
        path: argv.path,
        ready: true,
        created: false,
        error: errorMessage,
      },
      () => {
        logger.error(red(errorMessage))
      },
    )
  }
}
