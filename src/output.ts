export const outputFormats = ['text', 'json'] as const

export type OutputFormat = (typeof outputFormats)[number]

const outputFormatList = outputFormats.join(', ')
const outputFormatSet = new Set<OutputFormat>(outputFormats)

export interface FormatArgv {
  format: OutputFormat
}

export function createOutputFormatOption() {
  return {
    type: 'string' as const,
    requiresArg: true,
    default: 'text' as const,
    describe: 'Output format for command results.',
    coerce: validateOutputFormat,
    choices: outputFormats,
  }
}

export function validateOutputFormat(value: unknown): OutputFormat {
  if (typeof value !== 'string') {
    throw new TypeError(`The --format option must be a string. Use one of: ${outputFormatList}.`)
  }

  if (value.length === 0) {
    throw new TypeError(`The --format option requires a value. Use one of: ${outputFormatList}.`)
  }

  if (outputFormatSet.has(value as OutputFormat)) {
    return value as OutputFormat
  }

  throw new TypeError(`Unsupported --format value "${value}". Use one of: ${outputFormatList}.`)
}

export function writeFormattedOutput<T>(format: OutputFormat, jsonPayload: T, renderText: () => void) {
  // Keep a runtime guard because handlers can be called directly outside yargs parsing.
  if (validateOutputFormat(format) === 'json') {
    process.stdout.write(`${JSON.stringify(jsonPayload, null, 2)}\n`)
    return
  }

  renderText()
}
