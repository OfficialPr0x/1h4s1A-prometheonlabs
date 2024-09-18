export type PresenceDataOptions = {
  user_id: string
  user_info?: {
    [key: string]: any
  }
}

export type AuthorizeChannelResponse = {
  auth: string
  channel_data?: string
  shared_secret?: string
}
