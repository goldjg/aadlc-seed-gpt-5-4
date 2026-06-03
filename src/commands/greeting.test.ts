import { expect } from '@jest/globals'
import { createGreetingResult } from './greeting'

describe('greeting command', () => {
  it('creates a structured greeting result', () => {
    expect(createGreetingResult('Taylor', '👌')).toEqual({
      command: 'greeting',
      username: 'Taylor',
      mood: '👌',
      greetingMessage: 'Hello, Taylor!',
      farewellMessage: 'Taylor 👌, Ciao!',
    })
  })
})
