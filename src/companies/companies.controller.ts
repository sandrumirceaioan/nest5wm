import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { CompaniesService } from './companies.service';
import { CreateCompanyDto } from './companies.dto';
import { LoggedGuard } from '../common/guards/logged.guard';
import { Roles } from '../common/decorators/roles.decorator';

@Controller('companies')
@UseGuards(LoggedGuard)
export class CompaniesController {

    constructor(private readonly companiesService: CompaniesService){}

    @Post('/add')
    @Roles('admin')
    async login(@Body() params){
        return this.companiesService.addCompany(params);
    }

}
