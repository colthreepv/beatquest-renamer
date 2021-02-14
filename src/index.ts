import { readdirSync, renameSync } from 'fs'
import fetch, { Response } from 'node-fetch'
import { join } from 'path'

import { errors } from './errors'

if (process.argv.length !== 1) {
  console.error('Expected folder as first argument')
  console.error('Example: command c:\\Path\\To\\CustomSongs')
  process.exit(1)
}

const customSongsPath = process.argv[0] as string

const dir = readdirSync(customSongsPath)
const folders = dir.map(folderName => {
  const splitName = folderName.split(' ')
  return { songId: splitName[0], folder: folderName }
})
console.log(`Found ${folders.length} songs`)

const shorterSongs = [folders[0]]
const MATCH_HASH_REGEX = /\/(\w*)\.zip/

shorterSongs.forEach(async ({ songId, folder }) => {
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

  // rename dir here
  console.log(songId, 'equals to', fileHash)

  const fullOriginalPath = join(customSongsPath, folder)
  const fullDestinationPath = join(customSongsPath, `custom_level_${fileHash}`)
  renameSync(fullOriginalPath, fullDestinationPath)
})
