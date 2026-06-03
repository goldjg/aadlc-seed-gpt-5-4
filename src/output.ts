export const outputFormats = ['text', 'json'] as const

export type OutputFormat = (typeof outputFormats)[number]

const outputFormatList = outputFormats.join(', ')

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
  if (typeof value !== 'string' || value.length === 0) {
    throw new TypeError(`The --format option requires a value. Use one of: ${outputFormatList}.`)
  }

  if ((outputFormats as readonly string[]).includes(value)) {
    return value as OutputFormat
  }

  throw new TypeError(`Unsupported --format value "${value}". Use one of: ${outputFormatList}.`)
}

export function writeFormattedOutput<T>(format: OutputFormat, jsonPayload: T, renderText: () => void) {
  if (validateOutputFormat(format) === 'json') {
    process.stdout.write(`${JSON.stringify(jsonPayload, null, 2)}\n`)
    return
  }

  renderText()
}
