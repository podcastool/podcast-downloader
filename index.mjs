#!/usr/bin/env zx

import 'zx/globals'
import podcastFeedParser from 'podcast-feed-parser'

const feed_url = argv.url

let resp = await fetch(feed_url)
if (resp.ok) {
  const podcastFeed = await resp.text()
  const podcast = podcastFeedParser.getPodcastFromFeed(podcastFeed)
  
  await $`mkdir -p videos`

  for (const episode of podcast.episodes) {
    const file_name = `./videos/${episode.title.replace(/\//g, '')}.mp3`

    if (fs.pathExistsSync(file_name)) {
      continue
    }

    await $`wget ${episode.enclosure.url} -O ${file_name}`
  }
}