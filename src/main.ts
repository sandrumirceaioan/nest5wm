import { NestFactory } from '@nestjs/core';
import { AppModule } from 'app.module';
import { join } from 'path';
import { AnyExceptionFilter } from 'common/filters/exceptions.filter';

async function bootstrap() {

const app = await NestFactory.create(AppModule);

	app.useGlobalFilters(new AnyExceptionFilter());
	app.setGlobalPrefix('/api');
	app.useStaticAssets(join(__dirname + './../uploads'));
	app.useStaticAssets(join(__dirname + './../uploads/companies'));
	
  	await app.listen(process.env.PORT || 4000)
}
bootstrap();