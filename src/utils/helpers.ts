import { v4 as uuidv4 } from 'uuid';

/**
 * UUID4 generator.
 *
 * @remarks
 * Generates a random version 4 UUID.
 *
 * @returns string
 */
export function getUUID(): string {
  return uuidv4();
}

/**
 * Nonce generator.
 *
 * @remarks
 * Generates an arbitrary number that can be used just once in a cryptographic communication.
 *
 * @returns string
 */
export function getNonce(): string {
  return Math.floor(Math.random() * 1000000000000000000000).toString();
}

/**
 * Enum containing environment variable names.
 */
export enum ENV {
  NAME,
  PORT,
  HOST,
  PREFIX,
  DATABASE_URL,
  JWT_ACCESS,
  JWT_REFRESH,
  KYC_URL,
  CLIENT_ID,
  KYC_API_KEY,
  ETH_PROVIDER,
  BSC_PROVIDER,
}

/**
 * Enum containing api documentation tags
 */
export enum TAG {
  SERVER = 'Server',
  AUTH = 'Authentication',
  KYC = 'Kyc',
  WALLET = 'Wallet',
  CONTRACT = 'Contract',
}

/**
 * Enum containing route prefixes
 */
export enum PREFIX {
  AUTH = 'v1/auth',
  KYC = 'v1/kyc',
  WALLET = 'v1/wallet',
  CONTRACT = 'v1/contract',
}

/**
 * Enum containing Auth strategy names
 */
export enum STRATEGY {
  ACCESS = 'JWT-ACCESS',
  REFRESH = 'JWT-REFRESH',
}
