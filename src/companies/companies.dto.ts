import {  IsString, IsInt, IsArray, MinLength, IsEmail, IsNumber, IsDate } from "class-validator";

export class CreateCompanyDto {
  @IsString() public readonly companyName: string;
  @IsString() public readonly companyOwner: string;
  @IsString() public readonly companyDescription: string;
  @IsString() public readonly companyAddress: string;
  @IsString() public readonly companyPhone: string;
  @IsString() @IsEmail() public readonly companyEmail: string;
  @IsString() @IsDate() public readonly created: string;
  @IsString() public readonly createdBy: string;
}