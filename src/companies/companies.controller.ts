import { Controller, Req, Put, Post, Body, UseGuards, UseInterceptors, FileInterceptor, UploadedFile, HttpException, HttpStatus } from '@nestjs/common';
import { CompaniesService } from './companies.service';
import { CreateCompanyDto } from './companies.dto';
import { Roles } from 'common/decorators/roles.decorator';
import { AuthGuard } from 'common/guards/auth.guard';
import { CreatedByInterceptor } from 'common/interceptors/createdby.interceptor';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Controller('companies')
@UseGuards(AuthGuard)
export class CompaniesController {

    constructor(private readonly companiesService: CompaniesService){
    }

    @Post('/add')
    @Roles('admin')
    @UseInterceptors(CreatedByInterceptor)
    @UseInterceptors(FileInterceptor('companyLogo', {
        storage: diskStorage({
            destination: (req, file, cb) => {
                cb(null, './uploads');
            },
            filename: (req, file, cb) => {
                cb(null, `${file.originalname}`)
            }
        }),
        fileFilter: (req, file, cb) => {
            let ext = extname(file.originalname);
            console.log('11111: ', file);
            if(ext !== '.png' && ext !== '.jpg' && ext !== '.gif' && ext !== '.jpeg') {
                return cb(new Error('Only images are allowed'), null);
            }
            cb(null, true);
        },
        limits: {fileSize: 1024*1024}
    }))
    async add(@Body() createCompanyDto: CreateCompanyDto, @UploadedFile() file){
        console.log('22222: ', file);
        if (!file) {
            throw new HttpException('Invalid file!', HttpStatus.BAD_REQUEST);
        }
        return this.companiesService.addCompany(createCompanyDto, file);
    }

    @Post('/all')
    @Roles('admin')
    async all(@Body() {}){
        return this.companiesService.allCompanies();
    }

}
