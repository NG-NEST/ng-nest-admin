interface JsDocParam {
  name: string;
  type: string;
  description: string;
}

interface JsDocReturn {
  type: string;
  description: string;
}

export interface FunctionDoc {
  name: string;
  description: string;
  params: JsDocParam[];
  returns: JsDocReturn;
  examples: string[];
}

export function AppParseJsDoc(code: string): FunctionDoc[] {
  const lines = code.split('\n');
  const functions: FunctionDoc[] = [];
  let currentDocBlock: string[] = [];
  let functionName = '';
  let description = '';
  let params: JsDocParam[] = [];
  let returns: JsDocReturn = { type: '', description: '' };
  let examples: string[] = [];
  let isInFunction = false;

  // 逐行解析代码
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();

    // 忽略空行
    if (line === '') continue;

    // 如果是 JSDoc 注释的开始
    if (line.startsWith('/**') && !isInFunction) {
      currentDocBlock = [line]; // 开始收集 JSDoc 注释
      isInFunction = true;
      continue;
    }

    // 如果是 JSDoc 注释块的中间行
    if (isInFunction && line.startsWith('* ')) {
      currentDocBlock.push(line);
      continue;
    }

    // 如果是 JSDoc 注释的结束
    if (isInFunction && line.startsWith('export function')) {
      currentDocBlock.push(line);
      isInFunction = false;

      // 解析当前收集到的 JSDoc 注释块
      const docBlockContent = currentDocBlock.join('\n');

      // 解析函数名称
      const functionMatch = /export function (\w+)/.exec(docBlockContent);
      if (functionMatch) {
        functionName = functionMatch[1];
      }

      // 解析函数描述
      const descriptionMatch = /(?:\s*\*\s)([^\n@]+)/.exec(docBlockContent);
      description = descriptionMatch ? descriptionMatch[1].trim() : '';
      if (description.startsWith('*')) {
        description = description.slice(1);
      }
      description = description.trim();

      // 解析参数 (@param)
      params = [];
      const paramMatch = /@param\s+\{([^}]+)\}\s+([^\n]+)/g;
      let param;
      while ((param = paramMatch.exec(docBlockContent)) !== null) {
        params.push({
          name: param[2].trim(),
          type: param[1].trim(),
          description: param[3]?.trim() || ''
        });
      }

      // 解析返回值 (@returns)
      const returnMatch = /@returns\s+\{([^}]+)\}\s+([^\n]+)/.exec(docBlockContent);
      if (returnMatch) {
        returns = {
          type: returnMatch[1].trim(),
          description: returnMatch[2].trim()
        };
      }

      // 解析示例 (@example)
      examples = [];
      // 匹配 @example 标签开始，以 ```typescript 开始，以 ``` 结束的代码块
      // 正则表达式提取示例
      const regex = /```typescript([\s\S]*?)```/;
      const exampleBlockMatch = regex.exec(docBlockContent);

      if (exampleBlockMatch) {
        const exampleBlock = exampleBlockMatch[1].trim();
        const functionCallRegex = exampleBlock.split('\n');
        for (let example of functionCallRegex) {
          if (example.startsWith('*')) {
            example = example.slice(1);
          }
          example = example.trim();
          if (example) {
            examples.push(example);
          }
        }
      }

      // 将提取的信息保存到 functions 数组
      functions.push({
        name: functionName,
        description: description,
        params: params,
        returns: returns,
        examples: examples
      });

      // 重置状态准备处理下一个函数
      currentDocBlock = [];
      functionName = '';
      description = '';
      params = [];
      returns = { type: '', description: '' };
      examples = [];
    }
  }

  return functions;
}
