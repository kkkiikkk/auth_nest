// Core
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';

// Tools
import { ENV, STRATEGY } from '../../utils';

// Interfaces
import { JwtPayload, JwtPayloadRefresh } from '../interfaces';

/**
 * Custom Refresh token JWT strategy
 */
@Injectable()
export class RefreshStrategy extends PassportStrategy(
  Strategy,
  STRATEGY.REFRESH,
) {
  /**
   * Initializes AccessStrategy class
   *
   * @param config - The config service instance
   */
  constructor(config: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: <string>config.get(ENV[ENV.JWT_REFRESH]),
      passReqToCallback: true,
    });
  }

  /**
   * Validates the signed JWT
   *
   * @param request - The client request
   * @param payload - The payload provided
   */
  validate(request: Request, payload: JwtPayload): JwtPayloadRefresh {
    const refreshToken = request
      ?.get('authorization')
      ?.replace('Bearer', '')
      .trim();

    return {
      ...payload,
      refreshToken,
    };
  }
}
