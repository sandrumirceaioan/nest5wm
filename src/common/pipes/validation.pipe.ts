import { HttpException, Injectable, PipeTransform, ArgumentMetadata, HttpStatus, } from '@nestjs/common';
import { validate } from 'class-validator';
import { plainToClass } from 'class-transformer';

@Injectable()
export class ValidationPipe implements PipeTransform<any> {
  async transform(value, metadata: ArgumentMetadata) {
    const { metatype } = metadata;
    if (!metatype || !this.toValidate(metatype)) {
      return value;
    }
    const object = plainToClass(metatype, value);
    const errors = await validate(object);
    let dtoErrors ='';
    if (errors.length > 0 ) {
        errors.forEach(element => {
            Object.keys(element.constraints).forEach(err => {
                dtoErrors += element.constraints[err] + '<br />';  
            })
        });
        throw new HttpException(dtoErrors, HttpStatus.BAD_REQUEST);
    }
    return value;
  }

  private toValidate(metatype): boolean {
    const types = [String, Boolean, Number, Array, Object];
    return !types.find(type => metatype === type);
  }
}