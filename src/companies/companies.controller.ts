import { Controller, Req, Put, Post, Body, UseGuards, UseInterceptors, UsePipes, FileInterceptor, UploadedFile, HttpException, HttpStatus } from '@nestjs/common';
import { CompaniesService } from './companies.service';
import { Roles } from 'common/decorators/roles.decorator';
import { AuthGuard } from 'common/guards/auth.guard';
import { CreatedByInterceptor } from 'common/interceptors/createdby.interceptor';
import { Company } from './companies.interface';

@Controller('companies')
@UseGuards(AuthGuard)
export class CompaniesController {

    constructor(private readonly companiesService: CompaniesService){

        console.log(new HttpException('ceva', 400));
    }

    @Post('/add')
    @Roles('admin')
    @UseInterceptors(CreatedByInterceptor)
    async add(@Body() company: Company){
             let cacat = this.companiesService.addCompany(company);
            return cacat;
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