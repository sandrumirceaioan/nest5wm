import { Controller, Get, Post, Body, UseGuards, UseInterceptors } from '@nestjs/common';
import { CompaniesService } from './companies.service';
import { CreateCompanyDto } from './companies.dto';
import { Roles } from 'common/decorators/roles.decorator';
import { AuthGuard } from 'common/guards/auth.guard';
import { CreatedByInterceptor } from 'common/interceptors/createdby.interceptor';

@Controller('companies')
@UseGuards(AuthGuard)
export class CompaniesController {

    constructor(private readonly companiesService: CompaniesService){}

    @Post('/add')
    @Roles('admin')
    @UseInterceptors(CreatedByInterceptor)
    async login(@Body() createCompanyDto: CreateCompanyDto){
        return this.companiesService.addCompany(createCompanyDto);
    }

    @Post('/all')
    @Roles('admin')
    async all(@Body() {}){
        return this.companiesService.allCompanies();
    }

}
