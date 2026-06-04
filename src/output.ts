export const outputFormats = ['text', 'json'] as const

export type OutputFormat = (typeof outputFormats)[number]

const outputFormatList = outputFormats.join(', ')
const outputFormatSet = new Set<OutputFormat>(outputFormats)

interface FormattedOutput<T> {
  jsonPayload: T
  renderText: () => void
}

interface OutputFormatter {
  write<T>(output: FormattedOutput<T>): void
}

function isOutputFormat(value: string): value is OutputFormat {
  return outputFormatSet.has(value as OutputFormat)
}

const textOutputFormatter: OutputFormatter = {
  write({ renderText }) {
    renderText()
  },
}

const jsonOutputFormatter: OutputFormatter = {
  write({ jsonPayload }) {
    process.stdout.write(`${JSON.stringify(jsonPayload, null, 2)}\n`)
  },
}

const outputFormatters: Record<OutputFormat, OutputFormatter> = {
  text: textOutputFormatter,
  json: jsonOutputFormatter,
}

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

  if (isOutputFormat(value)) {
    return value
  }

  throw new TypeError(`Unsupported --format value "${value}". Use one of: ${outputFormatList}.`)
}

export function writeFormattedOutput<T>(format: OutputFormat, jsonPayload: T, renderText: () => void) {
  // Keep a runtime guard because handlers can be called directly outside yargs parsing.
  const outputFormatter = outputFormatters[validateOutputFormat(format)]

  outputFormatter.write({
    jsonPayload,
    renderText,
  })
}
