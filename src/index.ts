import { readdirSync } from 'fs'
import got from 'got'

const dir = readdirSync('/mnt/c/Users/valerio/Desktop/quest2/CustomSongs_PC')
const songsId = dir.map(folderName => {
  const splitName = folderName.split(' ')
  return splitName[0]
})

const shorterSongs = [songsId[0]]

const requests = shorterSongs.forEach(async (songId) => {
  const lowerCaseSongId = songId.toLowerCase()
  console.log('url', `https://beatsaver.com/api/download/key/${lowerCaseSongId}`)
  const request = await got(`https://beatsaver.com/api/download/key/${lowerCaseSongId}`, {
    headers: { 'User-Agent': 'PostmanRuntime/7.26.10' },
    followRedirect: false,
  })
  console.log(request)
})
