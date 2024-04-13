

import { CanActivate, ExecutionContext } from '@nestjs/common';


export class authGuard implements CanActivate {
  canActivate(context: ExecutionContext) {

    const request = context.switchToHttp().getRequest();


    return request.session.userId;

  }
}



export class adminGuard implements CanActivate {
  canActivate(context: ExecutionContext) {

    const request = context.switchToHttp().getRequest();

    if (!request.currentUser) {
      return false;
    }

    return request.currentUser.admin;

  }
}