import { Controller, Req, Put, Post, Body, UseGuards, UseInterceptors, UsePipes, UseFilters, FileInterceptor, UploadedFile, HttpException, HttpStatus } from '@nestjs/common';
import { CompaniesService } from './companies.service';
import { Roles } from 'common/decorators/roles.decorator';
import { AuthGuard } from 'common/guards/auth.guard';
import { CreatedByInterceptor } from 'common/interceptors/createdby.interceptor';
import { AnyExceptionFilter } from 'common/filters/exceptions.filter';
import { Company } from './companies.interface';

@Controller('companies')
@UseGuards(AuthGuard)
@UseFilters(new AnyExceptionFilter())
export class CompaniesController {

    constructor(private readonly companiesService: CompaniesService){
    }

    @Post('/add')
    @Roles('admin')
    @UseInterceptors(CreatedByInterceptor)
    async add(@Body() company: Company){
        return this.companiesService.addCompany(company);
    }

    @Post('/all')
    @Roles('admin')
    async all(@Body() {}){
        return this.companiesService.allCompanies();
    }

}


// import { diskStorage } from 'multer';
// import { extname } from 'path';

    // image upload interceptor
    // @UseInterceptors(FileInterceptor('companyLogo', {
    //     storage: diskStorage({
    //         destination: (req, file, cb) => {
    //             cb(null, './uploads');
    //         },
    //         filename: (req, file, cb) => {
    //             cb(null, `${file.originalname}`)
    //         }
    //     }),
    //     fileFilter: (req, file, cb) => {
    //         let ext = extname(file.originalname);
    //         if(ext !== '.png' && ext !== '.jpg' && ext !== '.gif' && ext !== '.jpeg') {
    //             return cb(new HttpException('Only images are allowed!',HttpStatus.BAD_REQUEST), null);
    //         }
    //         cb(null, true);
    //     },
    //     limits: {fileSize: 1024*1024}
    // }))