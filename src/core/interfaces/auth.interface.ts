/**
 * Interface for JWT tokens
 */
export interface Tokens {
  access_token: string;
  refresh_token: string;
}

/**
 * Interface for JWT payload
 */
export interface JwtPayload {
  id: string;
  email: string;
  username: string;
  sessionId: string;
}

/**
 * Interface for JWT payload with refresh token
 */
export interface JwtPayloadRefresh extends JwtPayload {
  refreshToken?: string;
}
