import { Controller, Req, Put, Post, Body, UseGuards, UseInterceptors, UsePipes, FileInterceptor, UploadedFile, HttpException, HttpStatus } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { Roles } from 'common/decorators/roles.decorator';
import { AuthGuard } from 'common/guards/auth.guard';
import { CreatedByInterceptor } from 'common/interceptors/createdby.interceptor';
import { Project } from './projects.interface';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { of } from 'rxjs';

@Controller('companies')
@UseGuards(AuthGuard)
export class CompaniesController {

    constructor(private readonly projectsService: ProjectsService){}

    @Post('/add')
    @Roles('admin', 'manager')
    @UseInterceptors(CreatedByInterceptor)
    @UseInterceptors(FileInterceptor('projectLogo', {
        storage: diskStorage({
            destination: (req, file, cb) => {
                cb(null, './uploads/projects');
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
    async add(@Body() company: Project, @UploadedFile() file){
        if (file) {
            return this.projectsService.addProject(company, file);
        }
        return of(null);
    }

    @Post('/all')
    @Roles('admin', 'manager')
    async all(@Body() {}){
        return this.projectsService.allProjects();
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
    // }))import { Controller } from '@nestjs/common';

@Controller('projects')
export class ProjectsController {}
