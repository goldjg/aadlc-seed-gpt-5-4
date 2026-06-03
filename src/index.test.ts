import { expect, jest } from '@jest/globals'
import yargs from 'yargs'
import { createOutputFormatOption, validateOutputFormat, writeFormattedOutput } from './output'

describe('writeFormattedOutput', () => {
  afterEach(() => {
    jest.restoreAllMocks()
  })

  it('writes a json payload in json mode', () => {
    const writeSpy = jest.spyOn(process.stdout, 'write').mockImplementation(() => true)
    const renderText = jest.fn()

    writeFormattedOutput('json', { ok: true }, renderText)

    expect(renderText).not.toHaveBeenCalled()
    expect(writeSpy).toHaveBeenCalledWith('{\n  "ok": true\n}\n')
  })

  it('renders text output in text mode', () => {
    const renderText = jest.fn()

    writeFormattedOutput('text', { ok: true }, renderText)

    expect(renderText).toHaveBeenCalledTimes(1)
  })

  it('rejects non-string format values', () => {
    expect(() => validateOutputFormat(true)).toThrow('The --format option must be a string. Use one of: text, json.')
  })

  it('rejects unsupported format values', () => {
    expect(() => validateOutputFormat('xml')).toThrow('Unsupported --format value "xml". Use one of: text, json.')
  })

  it('requires a value when parsing the format option', () => {
    const parser = yargs([]).exitProcess(false).option('format', createOutputFormatOption())
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => undefined)

    expect(() => parser.parseSync(['--format'])).toThrow('Not enough arguments following: format')
    expect(consoleErrorSpy).toHaveBeenCalled()
  })

  it('does not silently fall back to text for invalid formats', () => {
    const renderText = jest.fn()

    expect(() => writeFormattedOutput(true as never, { ok: true }, renderText)).toThrow(
      'The --format option must be a string. Use one of: text, json.',
    )
    expect(renderText).not.toHaveBeenCalled()
  })
})
