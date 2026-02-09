export interface AuthUser {
  id: string;
  email: string;
  displayName?: string;
  avatarUrl?: string;
}

export interface AuthTokens {
  accessToken: string;
}

export interface LoginResponse {
  user: AuthUser;
  accessToken: string;
}
