import { Controller, Req, Put, Get, Post, Body, Query, Param, UseGuards, UseInterceptors, UsePipes, FileInterceptor, UploadedFile, HttpException, HttpStatus } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Roles } from 'common/decorators/roles.decorator';
import { AuthGuard } from 'common/guards/auth.guard';
import { CreatedInterceptor } from 'common/interceptors/created.interceptor';
import { ModifiedInterceptor } from 'common/interceptors/modified.interceptor';
import { Task } from './tasks.interface';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { of } from 'rxjs';


@Controller('tasks')
@UseGuards(AuthGuard)
export class TasksController {

    constructor(private readonly tasksService: TasksService){}

    @Post('/add')
    @Roles('admin', 'manager', 'user')
    @UseInterceptors(CreatedInterceptor)
    async add(@Body() project: Task){
        return this.tasksService.add(project);
    }

    @Get('/allPaginated')
    @Roles('admin', 'manager', 'user')
    async all(@Query() params){
        return this.tasksService.allPaginated(params);
    }

    // @Get('/allById/:id')
    // @Roles('admin', 'manager')
    // async allById(@Param() params) {
    //     return await this.projectsService.allById(params.id);
    // }

    // @Get('/oneById/:id')
    // @Roles('admin', 'manager')
    // async oneById(@Param() param){
    //     return this.projectsService.oneById(param.id);
    // }

    // @Put('/upload')
    // @Roles('admin')
    //     @UseInterceptors(FileInterceptor('projectLogo', {
    //     storage: diskStorage({
    //         destination: (req, file, cb) => {
    //             cb(null, './uploads/projects');
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
    // async upload(@Body() params ,@UploadedFile() file){
    //     if (file) {
    //         return this.projectsService.updateLogo(params, file);
    //     }
    //     return of(null);
    // }

    // @Put('/update')
    // @Roles('admin', 'manager')
    // async update(@Body() params: Project) {
    //     return this.projectsService.updateOne(params);
    // }


}