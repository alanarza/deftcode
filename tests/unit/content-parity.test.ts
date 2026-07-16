import { readdirSync } from 'node:fs'
import { resolve } from 'node:path'
import { describe, expect, it } from 'vitest'

function markdownFiles(locale: 'es' | 'en') {
  return readdirSync(resolve('content/projects', locale))
    .filter(file => file.endsWith('.md'))
    .sort()
}

describe('project translations', () => {
  it('publishes the same project files in Spanish and English', () => {
    expect(markdownFiles('en')).toEqual(markdownFiles('es'))
  })
})
