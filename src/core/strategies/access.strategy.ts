// Core
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

// Tools
import { ENV, STRATEGY } from '../../utils';

// Interfaces
import { JwtPayload } from '../interfaces';

/**
 * Custom Access token JWT strategy
 */
@Injectable()
export class AccessStrategy extends PassportStrategy(
  Strategy,
  STRATEGY.ACCESS,
) {
  /**
   * Initializes AccessStrategy class
   *
   * @param config - The config service instance
   */
  constructor(config: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: <string>config.get(ENV[ENV.JWT_ACCESS]),
    });
  }

  /**
   * Validates the signed JWT
   *
   * @param payload - The payload provided
   */
  validate(payload: JwtPayload): JwtPayload {
    return payload;
  }
}
