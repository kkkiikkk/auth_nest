/**
 * Custom configuration containing environment variables for server
 */
export const ServerConfig = () => ({
  name: String(process.env.NAME),
  port: parseInt(String(process.env.PORT), 10),
  host: String(process.env.HOST),
  prefix: String(process.env.PREFIX),
});
