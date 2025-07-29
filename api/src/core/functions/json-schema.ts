/**
 * Json Schema type
 */
export type XJsonSchemaType =
  | 'null'
  | 'boolean'
  | 'object'
  | 'array'
  | 'number'
  | 'string'
  | 'integer';

/**
 * Json Schema type list
 */
export const XJsonSchemaTypes: XJsonSchemaType[] = [
  'object',
  'string',
  'number',
  'integer',
  'boolean',
  'array',
  'null',
];

/**
 * Json Schema string format list
 */
export const XJsonSchemaStringFormats: string[] = [
  'date-time',
  'date',
  'time',
  'duration',
  'email',
  'idn-email',
  'hostname',
  'idn-hostname',
  'ipv4',
  'ipv6',
  'uri',
  'uri-reference',
  'iri',
  'iri-reference',
  'uuid',
  'uri-template',
  'json-pointer',
  'relative-json-pointer',
  'regex',
  'binary',
  'byte',
  'password',
  'char',
];

/**
 * Json Schema integer format list
 */
export const XJsonSchemaIntegerFormats: string[] = [
  'int32',
  'int64',
  'long',
  'uint32',
  'uint64',
  'uint',
  'ulong',
  'sint32',
  'sint64',
  'fixed32',
  'fixed64',
  'sfixed32',
  'sfixed64',
  'bignum',
  'fixnum',
];

/**
 * Json Schema number format list
 */
export const XJsonSchemaNumberFormats: string[] = ['float', 'double', 'float32', 'float64'];

/**
 * Json Schema behavior list
 */
export const XJsonSchemaBehaviors: { label: string; id: number }[] = [
  { label: 'Read/Write', id: 0 },
  { label: 'Read Only', id: 1 },
  { label: 'Write Only', id: 2 },
];

/**
 * Json Schema primitive type
 */
export type XJsonSchemaPrimitive = string | number | boolean | null;

/**
 * Json Schema value type
 */
export type XJsonSchemaValue =
  | XJsonSchemaPrimitive
  | XJsonSchemaValue[]
  | { [key: string]: XJsonSchemaValue };

/**
 * Json Schema interface
 */
export interface XJsonSchema extends XJsonSchemaNgNest {
  /**
   * 当前 schema 的唯一标识 URI，可供 `$ref` 使用
   */
  $id?: string;

  /**
   * 指定本 schema 遵循的规范版本 URI，例如：
   * "https://json-schema.org/draft/2020-12/schema"
   */
  $schema?: string;

  /**
   * 引用另一个 schema，通常是 URI 或锚点（如 `#/$defs/example`）
   */
  $ref?: string;

  /**
   * 声明当前 schema 的锚点名称，供 `$ref` 局部引用使用
   */
  $anchor?: string;

  /**
   * 声明一个动态引用锚点，可以在合并 schema 时被动态替换
   */
  $dynamicAnchor?: string;

  /**
   * 引用一个 `$dynamicAnchor` 锚点，支持动态重绑定
   */
  $dynamicRef?: string;

  /**
   * schema 的简要标题，通常用于 UI 展示
   */
  title?: string;

  /**
   * schema 的详细描述内容，支持 Markdown 格式
   */
  description?: string;

  /**
   * 默认值，用于文档或表单自动填充，不用于验证
   */
  default?: XJsonSchemaValue;

  /**
   * 数据示例数组，用于展示数据格式和预期
   */
  examples?: XJsonSchemaValue[];

  /**
   * 是否已弃用该字段，true 表示不应再使用
   */
  deprecated?: boolean;

  /**
   * 只读字段，通常用于响应输出，不能作为输入
   */
  readOnly?: boolean;

  /**
   * 只写字段，通常用于输入提交，不会在输出中返回
   */
  writeOnly?: boolean;

  /**
   * 声明该数据的类型，可以是基本类型字符串或类型数组
   */
  type?: XJsonSchemaType | XJsonSchemaType[];

  /**
   * 常量值，数据必须与此值全等
   */
  const?: XJsonSchemaValue;

  /**
   * 枚举值列表，数据必须是其中之一
   */
  enum?: XJsonSchemaValue[];

  /**
   * 所有指定的 schema 都必须通过（逻辑 AND）
   */
  allOf?: XJsonSchema[];

  /**
   * 至少通过其中一个 schema（逻辑 OR）
   */
  anyOf?: XJsonSchema[];

  /**
   * 只能通过其中一个 schema（逻辑 XOR）
   */
  oneOf?: XJsonSchema[];

  /**
   * 数据不能匹配该 schema（逻辑 NOT）
   */
  not?: XJsonSchema;

  /**
   * 如果数据满足该 schema，则进一步验证 then/else 分支
   */
  if?: XJsonSchema;

  /**
   * 如果数据匹配 if，则必须符合该 schema
   */
  then?: XJsonSchema;

  /**
   * 如果数据不匹配 if，则必须符合该 schema
   */
  else?: XJsonSchema;

  /**
   * 对象属性定义：key 为属性名，值为对应的 schema
   */
  properties?: Record<string, XJsonSchema>;

  /**
   * 指定哪些属性是必须的
   */
  required?: string[];

  /**
   * 允许的额外属性类型，或是否允许未声明属性
   */
  additionalProperties?: boolean | XJsonSchema;

  /**
   * 限制所有未被验证（unevaluated）的属性
   */
  unevaluatedProperties?: boolean | XJsonSchema;

  /**
   * 对属性名本身进行验证的 schema（例如正则）
   */
  propertyNames?: XJsonSchema;

  /**
   * 限制对象属性最小个数
   */
  minProperties?: number;

  /**
   * 限制对象属性最大个数
   */
  maxProperties?: number;

  /**
   * 根据属性名正则匹配应用 schema
   */
  patternProperties?: Record<string, XJsonSchema>;

  /**
   * 如果包含某个属性，则必须包含这些依赖属性
   */
  dependentRequired?: Record<string, string[]>;

  /**
   * 如果包含某个属性，则对象整体需符合该 schema
   */
  dependentSchemas?: Record<string, XJsonSchema>;

  /**
   * 用于定义元组结构，每个元素位置独立验证
   */
  prefixItems?: XJsonSchema[];

  /**
   * 用于数组中剩余元素的统一验证（非元组）
   */
  items?: XJsonSchema;

  /**
   * 限制数组中最小项目数
   */
  minItems?: number;

  /**
   * 限制数组中最大项目数
   */
  maxItems?: number;

  /**
   * 是否所有数组元素必须唯一
   */
  uniqueItems?: boolean;

  /**
   * 至少包含一个符合该 schema 的元素
   */
  contains?: XJsonSchema;

  /**
   * 至少包含几个 `contains` 匹配项
   */
  minContains?: number;

  /**
   * 最多包含几个 `contains` 匹配项
   */
  maxContains?: number;

  /**
   * 对未被 prefixItems/items 验证的数组项进行控制
   */
  unevaluatedItems?: boolean | XJsonSchema;

  /**
   * 最小字符串长度（单位：UTF-8 字符单元）
   */
  minLength?: number;

  /**
   * 最大字符串长度
   */
  maxLength?: number;

  /**
   * 正则表达式约束字符串格式（ECMA-262）
   */
  pattern?: string;

  /**
   * 提供额外格式约定（如 email、uri、ipv4）
   */
  format?: string;

  /**
   * 字符串内容的 MIME 类型（如 application/json）
   */
  contentMediaType?: string;

  /**
   * 字符串的内容编码格式（如 base64）
   */
  contentEncoding?: string;

  /**
   * 对解码后的内容进行 schema 验证
   */
  contentSchema?: XJsonSchema;

  /**
   * 最小数值（包含）
   */
  minimum?: number;

  /**
   * 最大数值（包含）
   */
  maximum?: number;

  /**
   * 最小数值（不包含）
   */
  exclusiveMinimum?: number;

  /**
   * 最大数值（不包含）
   */
  exclusiveMaximum?: number;

  /**
   * 必须是该值的倍数
   */
  multipleOf?: number;

  /**
   * 可复用的 schema 集合，供 `$ref` 使用（推荐）
   */
  $defs?: Record<string, XJsonSchema>;

  /**
   * Draft-07 及以下版本中使用的 schema 定义（已废弃）
   */
  definitions?: Record<string, XJsonSchema>;
}

/**
 * Json Schema x-ng-nest type
 */
export interface XJsonSchemaNgNest {
  'x-ng-nest'?: {
    enums?: XJsonSchemaEnum[];
    orders?: string[];
    isJsonSchema?: boolean;
  };
}

/**
 * Json Schema enum type
 */
export interface XJsonSchemaEnum {
  value?: string | number | null;
  description?: string | null;
}

/**
 * Field type
 */
export interface XField {
  /**
   * 字段名称
   */
  name?: string;
  /**
   * 字段标题
   */
  title?: string;
  /**
   * 字段描述
   */
  description?: string;
  /**
   * 字段类型
   */
  type?: string;
  /**
   * 字段是否必填
   */
  required?: boolean;
  /**
   * 字段是否数组
   */
  isArray?: boolean;
  /**
   * 字段是否对象
   */
  isObject?: boolean;
  /**
   * 字段格式
   */
  format?: string;
  /**
   * 字段枚举
   */
  enum?: string[];
  /**
   * 字段 GraphQL 类型
   */
  graphqlType?: string;
  /**
   * 字段 GraphQL 过滤类型
   */
  graphqlFilterType?: string;
  /**
   * 字段 TypeScript 类型
   */
  tsType?: string;
  /**
   * 字段 TypeScript 可空类型, '' 或者 '?'
   */
  tsNullable?: string;
  /**
   * 字段 TypeScript 过滤类型
   */
  tsFilterType?: string;
}

/**
 * Convert JSON schema to Prisma schema
 *
 * @example
 * ```typescript
 * const jsonSchema = {
 *   "type": "object",
 *   "title": "提示词",
 *   "properties": {
 *     "name": {
 *       "type": "string",
 *       "title": "名称"
 *     },
 *     "description": {
 *       "type": "string",
 *       "title": "描述"
 *     },
 *     "system": {
 *       "type": "string",
 *       "title": "系统提示词"
 *     },
 *     "user": {
 *       "type": "string",
 *       "title": "用户提示词"
 *     }
 *   },
 *   "required": ["name", "user"]
 * };
 * const prismaSchema = jsonSchemaToPrismaSchema(jsonSchema, 'Prompt');
 *
 * // prisma schema
 * model Prompt {
 *   id          String  @id  @default(uuid())
 *   name        String
 *   user        String
 *   system      String?
 *   description String?
 * }
 * ```
 *
 * @param {XJsonSchema} jsonSchema - The JSON schema.
 * @param {string} modelName - The model name.
 * @returns {string} The prisma schema string.
 */
export function jsonSchemaToPrismaSchema(jsonSchema: XJsonSchema, modelName: string): string {
  if (!jsonSchema || !modelName) return '';

  // 类型映射表
  const typeMap = new Map<XJsonSchemaType, string>([
    ['array', 'Json'],
    ['string', 'String'],
    ['integer', 'Int'],
    ['number', 'Float'],
    ['boolean', 'Boolean'],
    ['null', 'Json'],
  ]);
  // 处理必需字段
  const requiredFields = Array.isArray(jsonSchema.required)
    ? new Set(jsonSchema.required)
    : new Set();

  // 递归处理属性
  const processProperties = (properties: Record<string, XJsonSchema>, parent = '') => {
    return Object.entries(properties)
      .map(([propName, propSchema]) => {
        // 处理嵌套对象
        if (propSchema.type === 'object' && propSchema.properties) {
          const nestedModelName = `${parent}${propName.charAt(0).toUpperCase() + propName.slice(1)}`;
          return `${propName} ${nestedModelName}${!requiredFields.has(propName) ? '?' : ''}`;
        }

        // 处理数组类型
        if (propSchema.type === 'array') {
          const items = propSchema.items || {};

          if (items.type === 'object' && items.properties) {
            const nestedModelName = `${parent}${propName.charAt(0).toUpperCase() + propName.slice(1)}`;
            return `${propName} ${nestedModelName}[]`;
          }

          return `${propName} Json${!requiredFields.has(propName) ? '?' : ''} // Array type - may need manual adjustment`;
        }

        // 基本类型处理
        let type = typeMap.get(propSchema.type as XJsonSchemaType) || 'String';
        if (propSchema.format === 'date-time') type = 'DateTime';
        if (propSchema.enum) type = 'String'; // 枚举处理为String

        return `${propName} ${type}${!requiredFields.has(propName) ? '?' : ''}`;
      })
      .join('\n  ');
  };

  // 主模型处理
  let prismaSchema = `model ${modelName} {\n  id String @id @default(uuid())\n`;

  if (jsonSchema.properties) {
    prismaSchema += `  ${processProperties(jsonSchema.properties, modelName)}\n`;
  }

  prismaSchema += '}\n\n';

  // 递归处理嵌套模型
  const processNestedModels = (properties: Record<string, XJsonSchema>, parent = '') => {
    for (const [propName, propSchema] of Object.entries(properties)) {
      if (propSchema.type === 'object' && propSchema.properties) {
        const nestedModelName = `${parent}${propName.charAt(0).toUpperCase() + propName.slice(1)}`;
        prismaSchema += `model ${nestedModelName} {\n  id String @id @default(uuid())\n`;
        prismaSchema += `  ${processProperties(propSchema.properties, nestedModelName)}\n`;
        prismaSchema += `  ${modelName} ${modelName}? @relation(fields: [${modelName}Id], references: [id])\n`;
        prismaSchema += `  ${modelName}Id Int?\n}\n\n`;

        // 递归处理更深层的嵌套
        processNestedModels(propSchema.properties, nestedModelName);
      }

      if (propSchema.type === 'array' && propSchema.items && propSchema.items.properties) {
        const nestedModelName = `${parent}${propName.charAt(0).toUpperCase() + propName.slice(1)}`;
        prismaSchema += `model ${nestedModelName} {\n  id String @id @default(uuid())\n`;
        prismaSchema += `  ${processProperties(propSchema.items.properties, nestedModelName)}\n`;
        prismaSchema += `  ${modelName} ${modelName}? @relation(fields: [${modelName}Id], references: [id])\n`;
        prismaSchema += `  ${modelName}Id String?\n}\n\n`;

        processNestedModels(propSchema.items.properties, nestedModelName);
      }
    }
  };

  if (jsonSchema.properties) {
    processNestedModels(jsonSchema.properties, modelName);
  }

  return formatPrismaModel(prismaSchema);
}

/**
 * Format Prisma schema with multiple models
 *
 * @param input Prisma schema string
 * @returns Formatted Prisma schema string
 */
function formatPrismaModel(input: string): string {
  // 1. Split into individual models
  const models: string[] = [];
  let currentModel: string[] = [];
  let braceLevel = 0;
  let inModel = false;

  for (const line of input.split('\n')) {
    const trimmed = line.trim();

    if (trimmed.startsWith('model ') && braceLevel === 0) {
      if (currentModel.length > 0) {
        models.push(currentModel.join('\n'));
      }
      currentModel = [trimmed];
      inModel = true;
      braceLevel = 0;
    } else if (inModel) {
      currentModel.push(trimmed);

      // Track brace level for model boundaries
      braceLevel += (trimmed.match(/{/g) || []).length;
      braceLevel -= (trimmed.match(/}/g) || []).length;

      if (braceLevel <= 0 && trimmed.includes('}')) {
        inModel = false;
        braceLevel = 0;
      }
    }
  }

  if (currentModel.length > 0) {
    models.push(currentModel.join('\n'));
  }

  // 2. Format each model individually
  return models.map(formatSingleModel).join('\n\n');
}

/**
 * Format a single Prisma model
 *
 * @param modelStr Single model string
 * @returns Formatted model string
 */
function formatSingleModel(modelStr: string): string {
  const lines = modelStr
    .split('\n')
    .map((line) => line.trim())
    .filter((line) => line.length > 0);

  if (lines.length < 2) return modelStr;

  const header = lines[0];
  const footer = lines[lines.length - 1];
  const fieldLines = lines.slice(1, -1);

  // Parse fields and calculate max lengths
  const fieldData = fieldLines.map((line) => {
    // Handle attributes with nested parentheses
    let attributes = '';
    let fieldPart = line;

    // Find the first attribute
    const attrIndex = line.indexOf('@');
    if (attrIndex !== -1) {
      fieldPart = line.substring(0, attrIndex).trim();
      attributes = line.substring(attrIndex);
    }

    // Split field name and type
    const [name, ...typeParts] = fieldPart.split(/\s+/);
    const type = typeParts.join(' ');

    return { name, type, attributes };
  });

  // Calculate max column widths
  const maxNameLen = Math.max(...fieldData.map((f) => f.name.length), 4);
  const maxTypeLen = Math.max(...fieldData.map((f) => f.type.length), 4);

  // Format fields with consistent padding
  const formattedFields = fieldData.map((field) => {
    const namePad = field.name.padEnd(maxNameLen);
    const typePad = field.type.padEnd(maxTypeLen);

    let fieldLine = `  ${namePad} ${typePad}`;
    if (field.attributes) {
      fieldLine += ` ${field.attributes}`;
    }

    return fieldLine;
  });

  return [header, ...formattedFields, footer].join('\n');
}

/**
 * Convert JSON schema to fields
 *
 * @example
 * ```typescript
 * const jsonSchema: XJsonSchema = {
 *   type: 'object',
 *   properties: {
 *     name: {
 *       type: 'string',
 *       title: '姓名',
 *       description: '用户的姓名',
 *       required: true
 *     },
 *     age: {
 *       type: 'integer',
 *       title: '年龄',
 *       description: '用户的年龄',
 *       minimum: 0
 *     },
 *     email: {
 *       type: 'string',
 *       format: 'email',
 *       title: '邮箱',
 *       description: '用户的邮箱地址'
 *     }
 *   },
 *   required: ['name']
 * };
 *
 * const fields = jsonSchemaToFields(jsonSchema);
 *
 * console.log(fields);
 * // [
 * //   {
 * //     name: 'name',
 * //     title: '姓名',
 * //     description: '用户的姓名',
 * //     type: 'String',
 * //     required: true,
 * //     isArray: false,
 * //     isObject: false,
 * //     format: null,
 * //     enum: null,
 * //     graphqlType: 'String',
 * //     tsType: 'string',
 * //     tsNullable: ''
 * //   },
 * //   {
 * //     name: 'age',
 * //     title: '年龄',
 * //     description: '用户的年龄',
 * //     type: 'Int',
 * //     required: false,
 * //     isArray: false,
 * //     isObject: false,
 * //     format: null,
 * //     enum: null,
 * //     graphqlType: 'Int',
 * //     tsType: 'number',
 * //     tsNullable: '?'
 * //   },
 * //   {
 * //     name: 'email',
 * //     title: '邮箱',
 * //     description: '用户的邮箱地址',
 * //     type: 'String',
 * //     required: false,
 * //     isArray: false,
 * //     isObject: false,
 * //     format: 'email',
 * //     enum: null,
 * //     graphqlType: 'String',
 * //     tsType: 'string',
 * //     tsNullable: '?'
 * //   }
 * // ]
 * ```
 *
 * @param {XJsonSchema} jsonSchema - The JSON schema.
 * @returns {XField[]} The fields.
 */
export function jsonSchemaToFields(jsonSchema: XJsonSchema): XField[] {
  if (!jsonSchema) return [];
  // 类型映射表
  const typeMap = new Map<XJsonSchemaType, string>([
    ['array', 'Json[]'],
    ['string', 'String'],
    ['integer', 'Int'],
    ['number', 'Float'],
    ['boolean', 'Boolean'],
    ['null', 'Json'],
    ['object', 'Json'],
  ]);

  const requiredFields = new Set(jsonSchema.required || []);

  if (!jsonSchema.properties || typeof jsonSchema.properties !== 'object') {
    return [];
  }

  return Object.entries(jsonSchema.properties).map(([name, schema]) => {
    const title = schema.title || null;
    const description = schema.description || null;
    const format = schema.format || null;
    const enumValues = (schema.enum as string[]) || null;

    // Determine type and additional info
    let type = typeMap.get(schema.type as XJsonSchemaType) || 'String';

    let isArray = false;
    let isObject = false;
    let isJsonSchema = false;
    let graphqlType = type;
    let graphqlFilterType = 'BASE_STRING_FILTER';
    let tsType = 'string';
    let tsNullable = requiredFields.has(name) ? '' : '?';
    let tsFilterType = 'StringFilter';

    // Handle special types
    if (schema.format === 'date-time') {
      type = 'DateTime';
      graphqlType = 'Date';
      graphqlFilterType = 'BASE_DATETIME_FILTER';
      tsType = 'Date';
      tsFilterType = 'DateTimeFilter';
    } else if (schema.type === 'integer') {
      tsType = 'number';
      graphqlFilterType = 'BASE_NUMBER_FILTER';
      tsFilterType = 'NumberFilter';
    } else if (schema.type === 'number') {
      tsType = 'number';
      graphqlFilterType = 'BASE_NUMBER_FILTER';
      tsFilterType = 'NumberFilter';
    } else if (schema.type === 'boolean') {
      tsType = 'boolean';
      graphqlFilterType = 'BASE_BOOLEAN_FILTER';
      tsFilterType = 'BooleanFilter';
    } else if (schema.type === 'object') {
      tsType = 'object';
      isObject = true;
    }

    if (isObject) {
      const ngnest = schema['x-ng-nest'];
      isJsonSchema = !!(ngnest && ngnest.isJsonSchema);
      if (isJsonSchema) {
        graphqlFilterType = 'BASE_JSON_FILTER';
        tsFilterType = 'JsonFilter';
      }
    }

    // Handle arrays
    if (schema.type === 'array' && schema.items) {
      isArray = true;
      type = `${typeMap.get(schema.items.type as XJsonSchemaType)}[]`;

      if (schema.items.format === 'date-time') {
        graphqlType = '[Date]';
        tsType = 'Date[]';
      } else if (schema.items.type === 'object') {
        graphqlType = '[GraphQLJSON]';
        tsType = 'any[]';
      } else {
        graphqlType = `[${graphqlType}]`;
        tsType = `${tsType}[]`;
      }
    }

    // Handle enums
    if (enumValues) {
      type = 'Enum';
      graphqlType = `${name.charAt(0).toUpperCase() + name.slice(1)}Enum`;
      tsType = graphqlType;
    }

    return {
      name,
      title,
      description,
      type,
      required: requiredFields.has(name),
      isArray,
      isObject,
      isJsonSchema,
      format,
      enum: enumValues,
      graphqlType,
      graphqlFilterType,
      tsType,
      tsNullable,
      tsFilterType,
      nullable: !requiredFields.has(name),
    };
  });
}
