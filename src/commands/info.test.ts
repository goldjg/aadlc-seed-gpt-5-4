import { expect, jest } from '@jest/globals'
import { createInfoResult, handler } from './info'
import { logger } from '../logger'

jest.mock('../logger', () => ({
  logger: {
    info: jest.fn(),
    box: jest.fn(),
  },
}))

describe('info command', () => {
  afterEach(() => {
    jest.clearAllMocks()
    jest.restoreAllMocks()
  })

  it('omits the global format flag from the displayed argv payload', () => {
    const result = createInfoResult({
      _: ['info'],
      $0: 'cli-typescript-starter',
      format: 'text',
      full: true,
    } as never)

    expect(result.argv).toEqual({
      _: ['info'],
      $0: 'cli-typescript-starter',
      full: true,
    })
  })

  it('writes json output when json format is requested', async () => {
    const writeSpy = jest.spyOn(process.stdout, 'write').mockImplementation(() => true)

    await handler({
      _: ['info'],
      $0: 'cli-typescript-starter',
      format: 'json',
      full: false,
    } as never)

    expect(logger.info).not.toHaveBeenCalled()
    expect(logger.box).not.toHaveBeenCalled()
    expect(writeSpy).toHaveBeenCalledTimes(1)

    const payload = JSON.parse(String(writeSpy.mock.calls[0]![0]))

    expect(payload.command).toBe('info')
    expect(payload.argv).toEqual({
      _: ['info'],
      $0: 'cli-typescript-starter',
      full: false,
    })
    expect(payload.processConfig).toBeUndefined()
  })
})
