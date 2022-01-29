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
    console.log(`Downloading episode: ${episode.title}`)
    await $`wget ${episode.enclosure.url} -O ./videos/${episode.title}.mp3`
  }
}