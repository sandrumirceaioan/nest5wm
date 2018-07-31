import {  IsString, IsInt, IsArray, MinLength, IsEmail, IsNumber, IsDate } from "class-validator";

export class CreateCompanyDto {
  @IsString() public readonly companyName: string;
  @IsString() public readonly companyOwner: string;
  @IsString() public readonly companyDescription: string;
  @IsString() public readonly companyAddress: string;
  @IsString() public readonly companyPhone: string;
  @IsEmail() public readonly companyEmail: string;
  @IsString() public readonly createdBy?: string;
}