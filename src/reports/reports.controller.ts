import { Body, Controller, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { createReportDTO } from './dtos/reate-report.dto';
import { ReportsService } from './reports.service';
import { adminGuard, authGuard } from 'src/guards/auth.guard';
import { currentUser } from 'src/users/decorators/current-user.dec';
import { User } from 'src/users/users.entities';
import { serialize } from 'src/interceptors/serialize.interceptor';
import { ReportDTO } from './dtos/report.dto';
import { approveDTO } from './dtos/approve-dto';
import { getEstimateDTO } from './dtos/getEstimate.dto';


@Controller('reports')
export class ReportsController {

  constructor(private reportsService: ReportsService) { }


  @Get('/')
  getEstimate(@Query() query: getEstimateDTO) {
    return this.reportsService.createEstimate(query)
  }



  @Post()
  @UseGuards(authGuard)
  @serialize(ReportDTO)
  createReport(@Body() body: createReportDTO, @currentUser() user: User) {
    return this.reportsService.create(body, user)
  }


  @Patch('/:id')
  @UseGuards(adminGuard)
  changeApproval(@Param('id') id: string, @Body() body: approveDTO) {
    // const report = await this.repo.findOne({ where: { id: parseInt(id) } });

    return this.reportsService.changeApproval(id, body.approved)
  }




}
