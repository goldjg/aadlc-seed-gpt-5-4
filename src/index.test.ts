import { expect, jest } from '@jest/globals'
import { writeFormattedOutput } from './output'

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
})
