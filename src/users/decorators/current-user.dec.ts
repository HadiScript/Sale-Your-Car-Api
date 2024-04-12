import { createParamDecorator, ExecutionContext } from "@nestjs/common";



export const currentUser = createParamDecorator(
  (data: never, context: ExecutionContext) => {

    const request = context.switchToHttp().getRequest();
    // console.log(request.session.userId)
    return request.currentUser;
  },

)