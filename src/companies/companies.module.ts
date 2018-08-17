import { Module } from '@nestjs/common';
import { CompaniesController } from './companies.controller';
import { CompaniesService } from './companies.service';
import { MongooseModule } from '@nestjs/mongoose';
import { CompaniesSchema } from './companies.schema';
import { ProjectsModule } from 'projects/projects.module';

@Module({
    imports: [MongooseModule.forFeature([{name: 'Company', schema: CompaniesSchema}]), ProjectsModule],
    controllers: [CompaniesController],
    providers: [CompaniesService],
    exports: [CompaniesService]
})
export class CompaniesModule {}