import ignore from 'ignore';

export function AppParseGitignore(gitignoreContent: string, allPaths: string[]) {
  const ig = ignore();
  ig.add(gitignoreContent);

  const ignored = new Set();
  for (const path of allPaths) {
    if (ig.ignores(path)) {
      ignored.add(path);
    }
  }
  return ignored;
}
