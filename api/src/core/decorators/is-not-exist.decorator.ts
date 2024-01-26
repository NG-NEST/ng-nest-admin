import { PrismaClient } from '@prisma/client';
import { registerDecorator, ValidationOptions, ValidationArguments } from 'class-validator';

export function IsNotExist(property: string, options?: ValidationOptions) {
  return (object: Record<string, any>, propertyName: string) => {
    registerDecorator({
      name: 'isNotExist',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [property],
      options: options,
      validator: {
        async validate(value: any, _args: ValidationArguments) {
          const prisma = new PrismaClient();
          let prop = propertyName;
          if (options.context?.relation) {
            prop = options.context.relation;
          }
          const where = {
            [prop]: value
          };
          if ((prisma as any)[property]) {
            const entity = await (prisma as any)[property].findFirst({
              select: {
                [prop]: true
              },
              where
            });
            return Boolean(entity);
          }
          return false;
        }
      }
    });
  };
}
