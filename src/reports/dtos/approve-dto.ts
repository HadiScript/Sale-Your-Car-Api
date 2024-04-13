import { IsBoolean } from "class-validator";

export class approveDTO {
  @IsBoolean()
  approved: boolean;
}