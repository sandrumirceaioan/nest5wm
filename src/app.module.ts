import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from 'app.controller';
import { AppService } from 'app.service';
import { UsersModule } from 'users/users.module';
// import { ProjectsModule } from './projects/projects.module';
// import { ListsModule } from './lists/lists.module';
// import { TasksModule } from './tasks/tasks.module';
// import { CommentsModule } from './comments/comments.module';
// import { HistoryModule } from './history/history.module';
// import { WorkmeterModule } from './workmeter/workmeter.module';

@Module({
  imports: [
     UsersModule,
    // ProjectsModule,
    // ListsModule,
    // TasksModule,
    // CommentsModule,
    // HistoryModule,
    // WorkmeterModule,
    //MongooseModule.forRoot('mongodb://localhost:27017/tmwm')
    MongooseModule.forRoot('mongodb://admin:rappac33!@ds247357.mlab.com:47357/tmwm', { useNewUrlParser: true
  })  
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}