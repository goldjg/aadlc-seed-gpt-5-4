import { expect, jest } from '@jest/globals'
import { createGreetingResult, handler } from './greeting'
import { logger } from '../logger'

jest.mock('../logger', () => ({
  logger: {
    prompt: jest.fn(),
    log: jest.fn(),
  },
}))

describe('greeting command', () => {
  afterEach(() => {
    jest.clearAllMocks()
    jest.restoreAllMocks()
  })

  it('creates a structured greeting result', () => {
    expect(createGreetingResult('Taylor', '👌')).toEqual({
      command: 'greeting',
      username: 'Taylor',
      mood: '👌',
      greetingMessage: 'Hello, Taylor!',
      farewellMessage: 'Taylor 👌, Ciao!',
    })
  })

  it('writes a json payload after interactive prompts', async () => {
    jest.mocked(logger.prompt).mockResolvedValueOnce('Taylor').mockResolvedValueOnce({
      label: '🤬',
      value: '🤬',
      hint: 'take care',
    })
    const writeSpy = jest.spyOn(process.stdout, 'write').mockImplementation(() => true)

    await handler({
      _: ['greeting'],
      $0: 'cli-typescript-starter',
      format: 'json',
    } as never)

    expect(logger.prompt).toHaveBeenCalledTimes(2)
    expect(logger.log).not.toHaveBeenCalled()
    expect(writeSpy).toHaveBeenCalledTimes(1)
    expect(JSON.parse(String(writeSpy.mock.calls[0]![0]))).toEqual({
      command: 'greeting',
      username: 'Taylor',
      mood: '🤬',
      greetingMessage: 'Hello, Taylor!',
      farewellMessage: 'Taylor 🤬, Ciao!',
    })
  })
})
