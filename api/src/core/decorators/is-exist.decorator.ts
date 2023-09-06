import { PrismaClient } from '@prisma/client';
import { registerDecorator, ValidationOptions, ValidationArguments } from 'class-validator';

export const IsExist = (property: string, options?: ValidationOptions) => {
  return (object: Record<string, any>, propertyName: string) => {
    registerDecorator({
      name: 'isExist',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [property],
      options: options,
      validator: {
        async validate(value: any, args: ValidationArguments) {
          const prisma = new PrismaClient();
          const entity = await prisma[property].findFirst({
            select: {
              [propertyName]: true
            },
            where: {
              [propertyName]: value
            }
          });
          return !Boolean(entity);
        }
      }
    });
  };
};
