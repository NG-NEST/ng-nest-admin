export function AppDownloadArrayBuffer(x: ArrayBuffer, filename: string, document: Document) {
  let blob: Blob;
  if (typeof x === 'string') {
    blob = new Blob([x], { type: 'text/plain;charset=utf-8' });
  } else if (x instanceof ArrayBuffer) {
    const decoder = new TextDecoder('utf-8');
    const text = decoder.decode(x);
    blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
  } else {
    blob = new Blob([x], { type: 'application/octet-stream' });
  }
  const url = URL.createObjectURL(blob);

  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();

  URL.revokeObjectURL(url);
  document.body.removeChild(a);
}
