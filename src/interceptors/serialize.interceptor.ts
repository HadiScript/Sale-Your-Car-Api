import {
  UseInterceptors,
  NestInterceptor,
  ExecutionContext,
  CallHandler
} from "@nestjs/common";

import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'


import { plainToClass } from "class-transformer";

interface classConstructor {
  new(...args: any[]): {}
}
 
export function serialize(dto: classConstructor) {
  return UseInterceptors(new SerializeInterceptor(dto));
}


export class SerializeInterceptor implements NestInterceptor {

  constructor(private dto: classConstructor) { }

  intercept(context: ExecutionContext, handler: CallHandler): Observable<any> {
    // Run something before q request is handled

    // console.log("am running before the handler", context);


    return handler.handle().pipe(
      map((data: any) => {
        // Run something before the res is send out
        // console.log('am running before res is send out');
        return plainToClass(this.dto, data, {
          excludeExtraneousValues: true
        })
      })
    )

  }
}




