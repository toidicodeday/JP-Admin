import { Models } from "appwrite"

export interface AuthState {
  sessionId: string | null
  userId: string | null
  userMe: Models.Account<Models.Preferences> | null
}
