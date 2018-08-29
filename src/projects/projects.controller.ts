import { Controller, Req, Put, Get, Post, Body, Query, Param, UseGuards, UseInterceptors, UsePipes, FileInterceptor, UploadedFile, HttpException, HttpStatus } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { Roles } from 'common/decorators/roles.decorator';
import { AuthGuard } from 'common/guards/auth.guard';
import { CreatedInterceptor } from 'common/interceptors/created.interceptor';
import { ModifiedInterceptor } from 'common/interceptors/modified.interceptor';
import { Project } from './projects.interface';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { of } from 'rxjs';


@Controller('projects')
@UseGuards(AuthGuard)
export class ProjectsController {

    constructor(private readonly projectsService: ProjectsService){}

    @Post('/add')
    @Roles('admin', 'manager')
    @UseInterceptors(CreatedInterceptor)
    async add(@Body() project: Project){
        return this.projectsService.add(project);
    }

    @Get('/all')
    @Roles('admin', 'manager')
    async all(@Query() params){
        return this.projectsService.all(params);
    }

    @Get('/allById/:id')
    @Roles('admin', 'manager')
    async allById(@Param() params) {
        return await this.projectsService.allById(params.id);
    }

    @Get('/oneById/:id')
    @Roles('admin', 'manager')
    async oneById(@Param() param){
        return this.projectsService.oneById(param.id);
    }

    @Put('/upload')
    @Roles('admin')
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
    @UseInterceptors(ModifiedInterceptor)
    async upload(@Body() params ,@UploadedFile() file){
        if (file) {
            return this.projectsService.updateLogo(params, file);
        }
        return of(null);
    }

    @Put('/update')
    @Roles('admin', 'manager')
    @UseInterceptors(ModifiedInterceptor)
    async update(@Body() params: Project) {
        return this.projectsService.updateOne(params);
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

