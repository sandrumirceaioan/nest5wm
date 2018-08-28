import { Module } from '@nestjs/common';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { MongooseModule } from '@nestjs/mongoose';
import { TasksSchema } from './tasks.schema';
import { ProjectsModule } from 'projects/projects.module';

@Module({
  imports: [MongooseModule.forFeature([{name: 'Task', schema: TasksSchema}]), ProjectsModule],
  controllers: [TasksController],
  providers: [TasksService],
  exports: [TasksService]
})
export class TasksModule {}
