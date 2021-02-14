import { readdirSync, renameSync } from 'fs'
import fetch, { Response } from 'node-fetch'
import { join } from 'path'

import { errors, printErrors } from './errors'

const MATCH_SONG_REGEX = /(\w*) /
const MATCH_HASH_REGEX = /\/(\w*)\.zip/

interface Folder {
  songId: string
  folder: string
}

if (process.argv.length !== 3) {
  console.error('Expected folder as first argument')
  console.error('Example: command c:\\Path\\To\\CustomSongs')
  process.exit(1)
}

const customSongsPath = process.argv[2] as string

const dir = readdirSync(customSongsPath)
const folders = [] as Folder[]
dir.forEach(folderName => {
  const splitName = folderName.match(MATCH_SONG_REGEX)
  if (splitName === null) return
  folders.push({ songId: splitName[1], folder: folderName })
})
console.log(`Found ${folders.length} songs`)

console.log('==================================')

const actions = folders.map(async ({ songId, folder }) => {
  const lowerCaseSongId = songId.toLowerCase()

  let response: Response
  try {
    response = await fetch(`https://beatsaver.com/api/download/key/${lowerCaseSongId}`, {
      headers: { 'User-Agent': 'PostmanRuntime/7.26.10' },
      redirect: 'manual',
    })
  } catch (err) {
    return errors.UnexpectedFetchFailure(songId, err.msg)
  }

  const redirectUrl = response.headers.get('location')
  if (redirectUrl === null) return errors.NotFoundOnBeatSaber(songId)

  const fileHashMatcher = redirectUrl.match(MATCH_HASH_REGEX)
  if (fileHashMatcher === null) return errors.InvalidRedirectLocation(songId, redirectUrl)
  const fileHash = fileHashMatcher[1]

  const fullOriginalPath = join(customSongsPath, folder)
  const fullDestinationPath = join(customSongsPath, `custom_level_${fileHash}`)
  renameSync(fullOriginalPath, fullDestinationPath)
})

Promise.all(actions).then(() => printErrors(folders.length))
