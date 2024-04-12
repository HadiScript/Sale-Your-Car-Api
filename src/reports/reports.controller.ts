import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { createReportDTO } from './dtos/reate-report.dto';
import { ReportsService } from './reports.service';
import { authGuard } from 'src/guards/auth.guard';


@Controller('reports')
export class ReportsController {

  constructor(private reportsService: ReportsService) { }

  @Post()
  @UseGuards(authGuard)
  createReport(@Body() body: createReportDTO) {
    return this.reportsService.create(body)
  }
}
