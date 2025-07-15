export type XJsonSchemaType =
  | 'null'
  | 'boolean'
  | 'object'
  | 'array'
  | 'number'
  | 'string'
  | 'integer';

export const XJsonSchemaTypes: XJsonSchemaType[] = [
  'object',
  'string',
  'number',
  'integer',
  'boolean',
  'array',
  'null',
];

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
export const XJsonSchemaNumberFormats: string[] = ['float', 'double', 'float32', 'float64'];

export const XJsonSchemaBehaviors: { label: string; id: number }[] = [
  { label: 'Read/Write', id: 0 },
  { label: 'Read Only', id: 1 },
  { label: 'Write Only', id: 2 },
];

export type XJsonSchemaPrimitive = string | number | boolean | null;

export type XJsonSchemaValue =
  | XJsonSchemaPrimitive
  | XJsonSchemaValue[]
  | { [key: string]: XJsonSchemaValue };

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

export interface XJsonSchemaNgNest {
  'x-ng-nest'?: {
    enums?: XJsonSchemaEnum[];
    orders?: string[];
  };
}

export interface XJsonSchemaEnum {
  value?: string | number | null;
  description?: string | null;
}

export interface XField {
  name?: string;
  title?: string;
  description?: string;
  type?: string;
  required?: boolean;
  isArray?: boolean;
  isObject?: boolean;
  format?: string;
  enum?: string[];
  graphqlType?: string;
  tsType?: string;
  tsNullable?: string;
}

/**
 * Convert JSON schema to Prisma schema
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

function formatPrismaModel(input: string): string {
  // 1. 分割行并过滤空行
  const lines = input
    .split('\n')
    .map((line) => line.trim())
    .filter((line) => line.length > 0);

  // 2. 提取模型名称和字段
  const modelHeader = lines[0];
  const fieldLines = lines.slice(1, -1);
  const modelFooter = lines[lines.length - 1];

  // 3. 解析字段并计算最大宽度
  const fieldData = fieldLines.map((line) => {
    const [fieldPart, ...attributes] = line.split(/(?=\@)/); // 智能分割属性和字段
    const [name, type] = fieldPart.trim().split(/\s+/);

    return {
      name,
      type,
      attributes: attributes.join(' ').trim(),
      raw: line,
    };
  });

  // 4. 计算各列最大宽度
  const maxNameLen = Math.max(...fieldData.map((f) => f.name.length), 4);
  const maxTypeLen = Math.max(...fieldData.map((f) => f.type.length), 4);
  const maxAttrLen = Math.max(...fieldData.map((f) => f.attributes.length), 9);

  // 5. 构建格式化后的模型
  const formattedFields = fieldData.map((field) => {
    const namePad = field.name.padEnd(maxNameLen);
    const typePad = field.type.padEnd(maxTypeLen);
    const attrPad = field.attributes.padEnd(maxAttrLen);

    return `  ${namePad} ${typePad} ${attrPad}`.trimEnd();
  });

  // 6. 组合最终结果
  return [modelHeader, ...formattedFields, modelFooter].join('\n');
}

/**
 * Convert JSON schema to fields
 *
 * @param {XJsonSchema} jsonSchema - The JSON schema.
 * @returns {XField[]} The fields.
 */
export function jsonSchemaToFields(jsonSchema: XJsonSchema): XField[] {
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
    let graphqlType = type;
    let tsType = 'string';
    let tsNullable = requiredFields.has(name) ? '' : '?';

    // Handle special types
    if (schema.format === 'date-time') {
      type = 'DateTime';
      graphqlType = 'Date';
      tsType = 'Date';
    } else if (schema.type === 'integer') {
      tsType = 'number';
    } else if (schema.type === 'number') {
      tsType = 'number';
    } else if (schema.type === 'boolean') {
      tsType = 'boolean';
    } else if (schema.type === 'object') {
      tsType = 'object';
      isObject = true;
    }

    // Handle arrays
    if (schema.type === 'array' && schema.items) {
      isArray = true;
      type = `${typeMap.get(schema.items.type as XJsonSchemaType)}[]`;

      if (schema.items.format === 'date-time') {
        graphqlType = '[Date]';
        tsType = 'Date[]';
      } else if (schema.items.type === 'object') {
        graphqlType = '[GraphQLJSONObject]';
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
      format,
      enum: enumValues,
      graphqlType,
      tsType,
      tsNullable,
      nullable: !requiredFields.has(name),
    };
  });
}
