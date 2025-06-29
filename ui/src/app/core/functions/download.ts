import { HttpResponse } from '@angular/common/http';
import { v4 } from 'uuid';

export function AppDownloadArrayBuffer(
  response: HttpResponse<ArrayBuffer>,
  document: Document,
  isText = true
) {
  let filename = v4();
  const contentDisposition = response.headers.get('content-disposition');

  if (contentDisposition) {
    const filenameMatch = contentDisposition.match(
      /filename\*?=['"]?(?:UTF-\d['"]*)?([^;\r\n"']*)['"]?/i
    );
    filename = filenameMatch ? filenameMatch[1] : v4();
    filename = decodeURIComponent(filename);
  }

  const body = response.body;
  let blob: Blob;
  if (typeof body === 'string') {
    blob = new Blob([body], { type: 'text/plain;charset=utf-8' });
  } else if (body instanceof ArrayBuffer && isText) {
    const decoder = new TextDecoder('utf-8');
    const text = decoder.decode(body);
    blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
  } else {
    blob = new Blob([body!], { type: 'application/octet-stream' });
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
