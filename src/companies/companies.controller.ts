import { Controller, Req, Param, Put, Query, Get, Post, Body, UseGuards, UseInterceptors, UsePipes, FileInterceptor, UploadedFile, HttpException, HttpStatus, Delete } from '@nestjs/common';
import { CompaniesService } from './companies.service';
import { Roles } from 'common/decorators/roles.decorator';
import { AuthGuard } from 'common/guards/auth.guard';
import { CreatedByInterceptor } from 'common/interceptors/createdby.interceptor';
import { Company } from './companies.interface';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { of } from 'rxjs';

@Controller('companies')
@UseGuards(AuthGuard)
export class CompaniesController {

    company: Company;

    constructor(private readonly companiesService: CompaniesService){}

    @Post('/add')
    @Roles('admin')
    @UseInterceptors(CreatedByInterceptor)
    async add(@Body() company: Company){
        return this.companiesService.add(company);
    }

    @Get('/all')
    @Roles('admin')
    async all(@Query() {}){
        return this.companiesService.all();
    }

    @Get('/oneById/:id')
    @Roles('admin')
    async oneById(@Param() param){
        return this.companiesService.oneById(param.id);
    }

    @Put('/upload')
    @Roles('admin')
        @UseInterceptors(FileInterceptor('companyLogo', {
        storage: diskStorage({
            destination: (req, file, cb) => {
                cb(null, './uploads/companies');
            },
            filename: (req, file, cb) => {
                cb(null, `${file.originalname}`)
            }
        }),
        fileFilter: (req, file, cb) => {
            let ext = extname(file.originalname);
            if(ext !== '.png' && ext !== '.jpg' && ext !== '.gif' && ext !== '.jpeg') {
                return cb(new HttpException('Only images are allowed!',HttpStatus.BAD_REQUEST), null);
            }
            cb(null, true);
        },
        limits: {fileSize: 1024*1024}
    }))
    async put(@Body() params ,@UploadedFile() file){
        if (file) {
            return this.companiesService.updateLogo(params, file);
        }
        return of(null);
    }

    @Put('/update')
    @Roles('admin')
    async update(@Body() params: Company) {
        return this.companiesService.updateOne(params);
    }

}