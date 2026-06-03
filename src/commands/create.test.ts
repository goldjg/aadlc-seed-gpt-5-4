import { expect, jest } from '@jest/globals'
import { downloadTemplate } from 'giget'
import { handler } from './create'
import { logger } from '../logger'

jest.mock('../logger', () => ({
  logger: {
    prompt: jest.fn(),
    box: jest.fn(),
    error: jest.fn(),
  },
}))

jest.mock('giget', () => ({
  downloadTemplate: jest.fn(),
}))

describe('create command', () => {
  afterEach(() => {
    jest.clearAllMocks()
    jest.restoreAllMocks()
  })

  it('writes a success payload in json mode', async () => {
    jest.mocked(logger.prompt).mockResolvedValue(true)
    jest.mocked(downloadTemplate).mockResolvedValue({} as Awaited<ReturnType<typeof downloadTemplate>>)
    const writeSpy = jest.spyOn(process.stdout, 'write').mockImplementation(() => true)

    await handler({
      path: '/tmp/project',
      format: 'json',
    } as never)

    expect(downloadTemplate).toHaveBeenCalledWith('gh:kucherenko/cli-typescript-starter', {
      dir: '/tmp/project',
    })
    expect(logger.box).not.toHaveBeenCalled()
    expect(writeSpy).toHaveBeenCalledTimes(1)
    expect(JSON.parse(String(writeSpy.mock.calls[0]![0]))).toEqual({
      command: 'create',
      path: '/tmp/project',
      ready: true,
      created: true,
      nextStep: 'pnpm install',
    })
  })

  it('writes a cancellation payload in json mode', async () => {
    jest.mocked(logger.prompt).mockResolvedValue(false)
    const writeSpy = jest.spyOn(process.stdout, 'write').mockImplementation(() => true)

    await handler({
      path: '/tmp/project',
      format: 'json',
    } as never)

    expect(downloadTemplate).not.toHaveBeenCalled()
    expect(logger.box).not.toHaveBeenCalled()
    expect(writeSpy).toHaveBeenCalledTimes(1)
    expect(JSON.parse(String(writeSpy.mock.calls[0]![0]))).toEqual({
      command: 'create',
      path: '/tmp/project',
      ready: false,
      created: false,
    })
  })
})
