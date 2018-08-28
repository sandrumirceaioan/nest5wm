import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from 'app.controller';
import { AppService } from 'app.service';
import { UsersModule } from 'users/users.module';
import { CompaniesModule } from './companies/companies.module';
import { ProjectsModule } from './projects/projects.module';
import { TasksModule } from './tasks/tasks.module';

@Module({
  imports: [
    CompaniesModule, 
    UsersModule,
    ProjectsModule,
    TasksModule,
    MongooseModule.forRoot('mongodb://admin:rappac33!@ds247357.mlab.com:47357/tmwm', { useNewUrlParser: true
  })  
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}