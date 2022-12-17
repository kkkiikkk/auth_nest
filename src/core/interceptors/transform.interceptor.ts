// Core
import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

// Interfaces
import { Response } from '../interfaces';

/**
 * Custom interceptor to transform ongoing responses
 */
@Injectable()
export class TransformInterceptor<T>
  implements NestInterceptor<T, Response<T>>
{
  /**
   * Method to implement a custom interceptor.
   * Additionally, excludes homepage handler.
   *
   * @param context an `ExecutionContext` object providing methods to access the
   * route handler and class about to be invoked.
   * @param next a reference to the `CallHandler`, which provides access to an
   * `Observable` representing the response stream from the route handler.
   */
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<Response<T>> {
    if (context.getHandler().name === 'homepage') {
      return next.handle();
    }

    return next.handle().pipe(map((data) => ({ data })));
  }
}
