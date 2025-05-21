import { v4 } from 'uuid';
import { XJsonSchema, XJsonSchemaType, XJsonSchemaValue, XTreeData } from './json-schema.type';

export function XTreeDataToJsonSchema(tree: XTreeData[]): XJsonSchema {
  const root = tree.find((node) => node.name === '$root');
  if (!root) throw new Error('Root node ($root) not found');

  return convertNodeToSchema(root);
}

/**
 * 将节点数据转换为JSON模式
 * @param node XTreeData类型的节点数据
 * @returns 返回转换后的XJsonSchema模式
 */
function convertNodeToSchema(node: XTreeData): XJsonSchema {
  const schema: XJsonSchema = {};

  const {
    children,
    type,
    nullable,
    title,
    description,
    examples,
    enums,
    deprecated,
    behavior,
    format,
    minLength,
    maxLength,
    minimum,
    maximum,
    multipleOf,
    minItems,
    maxItems,
    uniqueItems,
    pattern,
    id,
    isConst,
    isEnum,
    isNullable,
    isNumber,
    isObject,
    isArray,
    items,
    name,
    required,
    ...other
  } = node;

  // 设置类型
  if (type) {
    schema.type = nullable ? [type, 'null'] : type;
  }

  // 设置常规字段
  if (title) schema.title = title;
  if (description) schema.description = description;
  if (other.default !== undefined) {
    schema.default = other.default;
    delete other.default;
  }
  if (examples) schema.examples = examples;
  if (deprecated) schema.deprecated = deprecated;
  if (behavior === 1) schema.readOnly = true;
  if (behavior === 2) schema.writeOnly = true;
  if (format) schema.format = format;
  if (typeof minLength === 'number') schema.minLength = minLength;
  if (typeof maxLength === 'number') schema.maxLength = maxLength;
  if (typeof minimum === 'number') schema.minimum = minimum;
  if (typeof maximum === 'number') schema.maximum = maximum;
  if (typeof multipleOf === 'number') schema.multipleOf = multipleOf;
  if (typeof minItems === 'number') schema.minItems = minItems;
  if (typeof maxItems === 'number') schema.maxItems = maxItems;
  if (typeof uniqueItems === 'boolean') schema.uniqueItems = uniqueItems;
  if (pattern) schema.pattern = pattern;

  if (type === 'object') {
    schema.type = nullable ? ['object', 'null'] : 'object';
    schema.properties = {};
    const required: string[] = [];

    for (const child of children || []) {
      schema.properties[child.name!] = convertNodeToSchema(child);
      if (child.required) {
        required.push(child.name!);
      }
    }

    if (required.length > 0) {
      schema.required = required;
    }
  } else if (type === 'array') {
    const childItem = (children || []).find((child) => child.name === '[items]' || !child.name);

    if (childItem) {
      schema.items = convertNodeToSchema(childItem);
    } else {
      schema.items = {};
    }
  } else if (['string', 'number', 'integer'].includes(type!) && isEnum) {
    schema.enum = enums!.map((x) => x.value as XJsonSchemaValue);
    if (!schema['x-ng-nest']) schema['x-ng-nest'] = {};
    const ngNest = schema['x-ng-nest'];
    Object.assign(ngNest, { enums });
  }

  if (Object.keys(other).length > 0) {
    Object.assign(schema, other);
  }

  return schema;
}

/**
 * 将XJsonSchema对象转换为树形数据结构
 *
 * 此函数的目的是将一个给定的XJsonSchema实例转化为一个树形数据结构(XTreeData数组)
 * 它作为适配器函数，将schema转换过程封装起来，使得外部只需要调用一个简单的函数
 *
 * @param schema XJsonSchema实例，代表了JSON schema的结构和约束
 * @returns 返回一个XTreeData数组，表示转换后的树形数据结构
 */
export function XJsonSchemaToTreeData(schema: XJsonSchema): XTreeData[] {
  return [convertJsonSchemaToTree(schema)];
}

/**
 * 将JSON Schema转换为树形结构
 * @param schema JSON Schema对象
 * @param name 当前节点名称，默认为'$root'
 * @param isRequired 当前节点是否为必填项，默认为false
 * @returns 返回转换后的树形结构数据
 */
function convertJsonSchemaToTree(
  schema: XJsonSchema,
  name: string = '$root',
  isRequired: boolean = false
): XTreeData {
  const { type, title, description, properties, readOnly, writeOnly, required, ...other } = schema;

  const types = Array.isArray(type) ? type : [type ?? 'any'];

  const isArray = types.includes('array');
  const isObject = types.includes('object');
  const isNumber = types.includes('number') || types.includes('integer');
  const isNullable = types.includes('null');
  const isEnum = Array.isArray(schema.enum);
  const isConst = schema.const !== undefined;
  const behavior = !!readOnly ? 1 : !!writeOnly ? 2 : 0;
  const ngNest = schema['x-ng-nest'];

  const rawNode: XTreeData = {
    id: v4(),
    name,
    title,
    description,
    type: types.find((t) => t !== 'null') as XJsonSchemaType,
    required: isRequired,
    nullable: isNullable,
    behavior,
    isObject,
    isNumber,
    isNullable,
    isConst,
    isEnum,

    ...other
  };

  const node = cleanObject(rawNode);

  // 处理对象属性
  if (isObject && properties) {
    node.children = Object.entries(properties).map(([propName, propSchema]) =>
      convertJsonSchemaToTree(propSchema, propName, required?.includes(propName) ?? false)
    );
  }

  // 处理数组元素
  if (isArray && schema.items) {
    let itemSchema = schema.items;
    if (!itemSchema) {
      itemSchema = { type: 'string' };
    }
    const child = convertJsonSchemaToTree(itemSchema, '[items]');
    child.isArray = true;
    node.children = [child];
  }

  // 处理枚举
  if (isEnum && schema.enum) {
    node.enums =
      ngNest?.enums ??
      schema.enum.map((item) => ({ value: item as string | number, description: null }));
  }

  return node;
}

/**
 * 从一个对象中移除所有值为 undefined 的属性
 * @template T 输入对象的类型，限制为对象类型
 * @param obj 需要清理的对象
 * @returns 返回移除值为undefined的属性后的新对象
 */
function cleanObject<T extends object>(obj: T): T {
  return Object.entries(obj).reduce((acc, [key, value]) => {
    if (value !== undefined) {
      (acc as any)[key] = value;
    }
    return acc;
  }, {} as T);
}
