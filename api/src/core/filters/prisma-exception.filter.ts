import { Catch, HttpException, HttpStatus } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { GqlArgumentsHost } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';

// TODO
@Catch(
  Prisma.PrismaClientKnownRequestError ||
    Prisma.PrismaClientUnknownRequestError ||
    Prisma.PrismaClientValidationError
)
export class PrismaClientExceptionFilter extends BaseExceptionFilter {
  override catch(exception: Prisma.PrismaClientKnownRequestError, _host: GqlArgumentsHost) {
    // console.log('-------------------');
    // console.log(JSON.stringify(host.getArgs()[1]));
    // console.log('-------------------');
    // const { code, meta, name, message } = exception;
    // console.log(code, message, meta, name);
    // console.log('-------------------');
    const { message } = exception;
    const statusCode = HttpStatus.INTERNAL_SERVER_ERROR;

    return new HttpException({ statusCode, message }, statusCode);
  }
}
