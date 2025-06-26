import { ObjectType } from '@nestjs/graphql';
import { Catalogue } from './catalogue.model';

@ObjectType()
export class CatalogueSelectOutput extends Catalogue {}
