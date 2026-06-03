export const outputFormats = ['text', 'json'] as const

export type OutputFormat = (typeof outputFormats)[number]

export interface FormatArgv {
  format: OutputFormat
}

export function writeFormattedOutput<T>(format: OutputFormat, jsonPayload: T, renderText: () => void) {
  if (format === 'json') {
    process.stdout.write(`${JSON.stringify(jsonPayload, null, 2)}\n`)
    return
  }

  renderText()
}
