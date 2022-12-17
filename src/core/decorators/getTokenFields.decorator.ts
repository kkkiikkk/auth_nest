// Core
import { createParamDecorator, ExecutionContext } from '@nestjs/common';

// Interfaces
import { JwtPayload, JwtPayloadRefresh } from '../interfaces';

/**
 * Custom decorator used to get session ID from verified requests
 */
export const GetSessionId = createParamDecorator(
  (data: keyof JwtPayload | undefined, context: ExecutionContext): string => {
    const request = context.switchToHttp().getRequest();
    return request.user.sessionId;
  },
);

/**
 * Custom decorator used to get Account ID from verified requests
 */
export const GetAccountId = createParamDecorator(
  (data: keyof JwtPayload | undefined, context: ExecutionContext): string => {
    const request = context.switchToHttp().getRequest();
    return request.user.id;
  },
);

/**
 * Custom decorator used to get username from verified requests
 */
export const GetUsername = createParamDecorator(
  (data: keyof JwtPayload | undefined, context: ExecutionContext): string => {
    const request = context.switchToHttp().getRequest();
    return request.user.username;
  },
);

/**
 * Custom decorator used to get refreshToken from verified requests
 */
export const GetRefreshToken = createParamDecorator(
  (
    data: keyof JwtPayloadRefresh | undefined,
    context: ExecutionContext,
  ): string => {
    const request = context.switchToHttp().getRequest();
    return request.user.refreshToken;
  },
);
