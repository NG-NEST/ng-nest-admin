export interface JsDocParam {
  name: string;
  type: string;
  description: string;
}

export interface JsDocReturn {
  type: string;
  description: string;
}

export interface JsDocProperty {
  name: string;
  type?: string;
  description: string;
}

export interface JsDocEnumMember {
  name: string;
  value?: string;
  description: string;
  valueType?: 'string' | 'number' | 'boolean' | 'null' | 'unknown';
}

export interface FunctionDoc {
  name: string;
  kind: 'function' | 'interface' | 'type' | 'enum' | 'class';
  description: string;
  params?: JsDocParam[];
  returns?: JsDocReturn;
  examples?: string[];
  properties?: JsDocProperty[];
  typeDef?: string;
  members?: JsDocEnumMember[];
}

export function AppParseJsDoc(code: string): FunctionDoc[] {
  const lines = code.split('\n');
  const docs: FunctionDoc[] = [];

  let inDoc = false;
  let docLines: string[] = [];
  let nextLine = '';
  let currentIndex = 0;

  const cleanDocLine = (line: string) => line.replace(/^\s*\*\s?/, '').trim();

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();

    if (line.startsWith('/**')) {
      inDoc = true;
      docLines = [];
      continue;
    }

    if (inDoc) {
      if (line.startsWith('*/')) {
        inDoc = false;

        while (++i < lines.length) {
          const l = lines[i].trim();
          if (l && !l.startsWith('*')) {
            nextLine = l;
            currentIndex = i;
            break;
          }
        }

        const kindMatch = /(export\s+)?(function|interface|type|enum|class)\s+(\w+)/.exec(nextLine);
        if (!kindMatch) continue;

        const kind = kindMatch[2] as FunctionDoc['kind'];
        const name = kindMatch[3];

        const descriptionLines: string[] = [];
        const params: JsDocParam[] = [];
        const examples: string[] = [];
        let returns: JsDocReturn = { type: '', description: '' };
        let collectingExample = false;
        let exampleLines: string[] = [];

        for (const rawLine of docLines) {
          const content = cleanDocLine(rawLine);

          if (content.startsWith('@param')) {
            const paramMatch = /@param\s+\{(.+?)\}\s+(\w+)(?:\s+-\s+)?(.*)?/.exec(content);
            if (paramMatch) {
              params.push({
                type: paramMatch[1],
                name: paramMatch[2],
                description: paramMatch[3] ?? ''
              });
            }
          } else if (content.startsWith('@returns') || content.startsWith('@return')) {
            const returnMatch = /@returns?\s+\{(.+?)\}\s+(.*)/.exec(content);
            if (returnMatch) {
              returns = {
                type: returnMatch[1],
                description: returnMatch[2]
              };
            }
          } else if (content.startsWith('@example')) {
            collectingExample = true;
            exampleLines = [];
          } else if (collectingExample) {
            if (content.startsWith('@')) {
              collectingExample = false;
              examples.push(exampleLines.join('\n'));
            } else {
              exampleLines.push(content);
            }
          } else if (!content.startsWith('@')) {
            descriptionLines.push(content);
          }
        }

        if (exampleLines.length > 0) {
          examples.push(exampleLines.join('\n'));
        }

        const doc: FunctionDoc = {
          name,
          kind,
          description: descriptionLines.join(' ').trim()
        };

        if (kind === 'function') {
          doc.params = params;
          doc.returns = returns;
          doc.examples = examples;
        }

        if (kind === 'type') {
          let typeLines: string[] = [];
          for (let j = currentIndex; j < lines.length; j++) {
            const l = lines[j].trim();
            typeLines.push(l);
            if (l.endsWith(';')) break;
          }
          doc.typeDef = typeLines
            .join('\n')
            .replace(/^.*=\s*/, '')
            .replace(/;$/, '')
            .split('\n')
            .map((line) => line.trim().replace(/^\|\s*/, ''))
            .filter(Boolean)
            .join(' | ')
            .trim();
        }

        if (kind === 'enum') {
          const members: JsDocEnumMember[] = [];
          let j = currentIndex + 1;
          while (j < lines.length) {
            const l = lines[j].trim();
            if (l.startsWith('/**')) {
              const tempDoc: string[] = [];
              while (++j < lines.length && !lines[j].includes('*/')) {
                tempDoc.push(lines[j]);
              }
              const nextEnumLine = lines[j + 1]?.trim();
              const memberMatch = /(\w+)\s*=?\s*['"]?([^'",]*)?['"]?,?/.exec(nextEnumLine ?? '');
              if (memberMatch) {
                const value = memberMatch[2];
                members.push({
                  name: memberMatch[1],
                  value,
                  description: tempDoc.map(cleanDocLine).join(' ').trim(),
                  valueType: inferEnumValueType(value)
                });
              }
            } else if (/^\w+\s*=/.test(l)) {
              const memberMatch = /(\w+)\s*=\s*['"]?([^'",]*)?['"]?,?/.exec(l);
              if (memberMatch) {
                members.push({
                  name: memberMatch[1],
                  value: memberMatch[2],
                  description: '',
                  valueType: inferEnumValueType(memberMatch[2])
                });
              }
            } else if (l.startsWith('}')) break;
            j++;
          }
          doc.members = members;
        }

        if (kind === 'interface') {
          const props: JsDocProperty[] = [];
          let j = currentIndex + 1;
          while (j < lines.length) {
            const l = lines[j].trim();

            if (l.startsWith('/**')) {
              const tempDoc: string[] = [];
              while (++j < lines.length && !lines[j].includes('*/')) {
                tempDoc.push(lines[j]);
              }

              const nextLine = lines[j + 1]?.trim();
              const match = /['"]?([\w\-]+)['"]?\??:?\s*([^;{]*)/.exec(nextLine ?? '');
              if (match) {
                props.push({
                  name: match[1],
                  type: match[2],
                  description: tempDoc.map(cleanDocLine).join(' ')
                });
              }
            }

            if (l.startsWith('}')) break;
            j++;
          }
          doc.properties = props;
        }

        docs.push(doc);
      } else {
        docLines.push(line);
      }
    }
  }

  return docs;
}

function inferEnumValueType(
  value: string | undefined
): 'string' | 'number' | 'boolean' | 'null' | 'unknown' {
  if (value === undefined) return 'unknown';
  if (value === 'null') return 'null';
  if (value === 'true' || value === 'false') return 'boolean';
  if (!isNaN(Number(value))) return 'number';
  if (/^['"].*['"]$/.test(value)) return 'string';
  return 'string'; // 默认值通常是字符串（未加引号时）
}
