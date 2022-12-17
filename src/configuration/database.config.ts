/**
 * Custom configuration containing environment variables for database
 */
export const DatabaseConfig = () => ({
  link: String(process.env.DATABASE_URL),
});
