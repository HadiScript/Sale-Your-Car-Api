import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Report } from './report.entities';
import { Repository } from 'typeorm';
import { createReportDTO } from './dtos/reate-report.dto';

@Injectable()
export class ReportsService {

  constructor(
    @InjectRepository(Report) private repo: Repository<Report>
  ) { };


  create(body: createReportDTO) {
    const report = this.repo.create(body);

    return this.repo.save(report);
  }
}
