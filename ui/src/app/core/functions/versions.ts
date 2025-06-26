export function AppSortVersions<T extends { version: string }>(
  versions: T[],
  sort: 'asc' | 'desc'
) {
  return versions.sort((a, b) => {
    const v1 = a.version.split('.').map(Number);
    const v2 = b.version.split('.').map(Number);
    const maxLen = Math.max(v1.length, v2.length);

    for (let i = 0; i < maxLen; i++) {
      const num1 = v1[i] || 0; // 缺失段补0
      const num2 = v2[i] || 0;
      if (num1 !== num2) {
        return sort === 'desc' ? num2 - num1 : num1 - num2; // 升序排序
      }
    }
    return 0;
  });
}
