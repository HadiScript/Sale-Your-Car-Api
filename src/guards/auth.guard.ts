

import { CanActivate, ExecutionContext } from '@nestjs/common';


export class authGuard implements CanActivate {
  canActivate(context: ExecutionContext) {

    const request = context.switchToHttp().getRequest();


    return request.session.userId;

  }
}