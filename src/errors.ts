interface FailedRequest {
  songId: string
  reason: string
  code: number
  additional?: any
}

export const failedRequests = [] as FailedRequest[]

export const addToFailed = (reason: string, code: number) => {
  return (songId: string, additional?: any) => {
    const toPush = { songId, reason, code } as FailedRequest
    if (additional != null) toPush.additional = additional
    failedRequests.push(toPush)
  }
}

export const errors = {
  NotFoundOnBeatSaber: addToFailed('Not found on BeatSaver', 1001),
  InvalidRedirectLocation: addToFailed('Invalid redirect location provided by BeatSaver', 1002),
  UnexpectedFetchFailure: addToFailed('Unexpected Fetch Failure', 1003)
}
