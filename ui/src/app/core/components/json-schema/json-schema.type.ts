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
  'null'
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
  'char'
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
  'fixnum'
];
export const XJsonSchemaNumberFormats: string[] = ['float', 'double', 'float32', 'float64'];

export const XJsonSchemaBehaviors: { label: string; id: number }[] = [
  { label: 'Read/Write', id: 0 },
  { label: 'Read Only', id: 1 },
  { label: 'Write Only', id: 2 }
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

export interface XTreeData {
  id?: string;
  name?: string;
  title?: string;
  type?: XJsonSchemaType;
  description?: string;
  children?: XTreeData[];
  nullable?: boolean;
  required?: boolean;

  deprecated?: boolean;
  format?: string;
  const?: XJsonSchemaValue;
  behavior?: number;
  minLength?: number;
  maxLength?: number;
  default?: XJsonSchemaValue;
  enums?: XJsonSchemaEnum[];
  pattern?: string;
  examples?: XJsonSchemaValue[];
  minimum?: number;
  maximum?: number;
  multipleOf?: number;
  minItems?: number;
  maxItems?: number;
  uniqueItems?: boolean;
  minProperties?: number;
  maxProperties?: number;
  exclusiveMinimum?: number;
  exclusiveMaximum?: number;
  additionalProperties?: boolean | XJsonSchema;

  isString?: boolean;
  isArray?: boolean;
  isObject?: boolean;
  isConst?: boolean;
  isEnum?: boolean;
  isNumber?: boolean;
  isNullable?: boolean;

  [key: string]: any;
}

/**
 * 自定义补充属性
 */
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
