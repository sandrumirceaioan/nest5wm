import { Module } from '@nestjs/common';
import { ProjectsController } from './projects.controller';
import { ProjectsService } from './projects.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ProjectsSchema } from './projects.schema';
import { CompaniesModule } from 'companies/companies.module';

@Module({
  imports: [MongooseModule.forFeature([{name: 'Project', schema: ProjectsSchema}]), CompaniesModule],
  controllers: [ProjectsController],
  providers: [ProjectsService],
  exports: [ProjectsService]
})
export class ProjectsModule {}
