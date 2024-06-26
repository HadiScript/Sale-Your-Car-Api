import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ReportsModule } from './reports/reports.module';
import { TypeOrmModule } from '@nestjs/typeorm'
import { User } from './users/users.entities';
import { Report } from './reports/report.entities';
import { ConfigModule, ConfigService } from '@nestjs/config';



@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV}`
    }),

    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        return {
          type: 'sqlite',
          database: config.get<string>('DB_NAME'),
          synchronize: true,
          entities: [User, Report],
        }
      }
    }),

    UsersModule, ReportsModule
  ],
  // TypeOrmModule.forRoot(
  //   {
  //     type: 'sqlite',
  //     database: "db.sqlite",
  //     entities: [User, Report],
  //     synchronize: true
  //   }
  // ), UsersModule, ReportsModule],

  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { 

  // configure()

}
