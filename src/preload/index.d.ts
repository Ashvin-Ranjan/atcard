import type { Api } from '../globals/types'

declare global {
  interface Window {
    api: Api
  }
}
