export function filter(array: any[], options: string) {
  if (!Array.isArray(array)) return [];

  let where = {};
  try {
    where = JSON.parse(options);
  } catch (e) {}

  function matchCondition(value: any, condition: any): boolean {
    if (typeof condition !== 'object' || condition === null) {
      return value === condition;
    }

    return Object.entries(condition).every(([op, expected]) => {
      switch (op) {
        case 'equals':
          return value === expected;
        case 'not':
          return value !== expected;
        case 'in':
          return Array.isArray(expected) && expected.includes(value);
        case 'notIn':
          return Array.isArray(expected) && !expected.includes(value);
        case 'lt':
          return value < expected;
        case 'lte':
          return value <= expected;
        case 'gt':
          return value > expected;
        case 'gte':
          return value >= expected;
        case 'contains':
          return typeof value === 'string' && value.includes(expected as string);
        case 'startsWith':
          return typeof value === 'string' && value.startsWith(expected as string);
        case 'endsWith':
          return typeof value === 'string' && value.endsWith(expected as string);
        default:
          return false;
      }
    });
  }

  return array.filter((item) => {
    return Object.entries(where).every(([key, condition]) => {
      const value = item[key];
      return matchCondition(value, condition);
    });
  });
}
