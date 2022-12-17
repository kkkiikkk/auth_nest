/**
 * Custom configuration containing environment variables for JWT authentication
 */
export const AuthConfig = () => ({
  access: String(process.env.JWT_ACCESS),
  refresh: String(process.env.JWT_REFRESH),
});
