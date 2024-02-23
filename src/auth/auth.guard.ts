import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { SetMetadata } from '@nestjs/common';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());

    if (!roles) {
      throw new ForbiddenException();
    }

    const request = context.switchToHttp().getRequest();

    const user = request.session[request.headers.authorization];

    if (!user || !user.type || !roles.includes(user.type)) {
      throw new ForbiddenException();
    }

    const hasRole = () => roles.includes(user.type);

    return hasRole();
  }
}

export const Roles = (...roles: string[]) => SetMetadata('roles', roles);
