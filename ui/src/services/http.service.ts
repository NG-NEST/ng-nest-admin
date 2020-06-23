import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, Observer } from 'rxjs';
import { environment } from 'src/environments/environment';
import { SettingService } from './setting.service';

/**
 * http请求
 *
 * @export
 * @class HttpService
 */

@Injectable({ providedIn: 'root' })
export class HttpService {
  constructor(public http: HttpClient, public setting: SettingService) {}

  /**
   * get请求
   *
   * @param {string} url 地址
   * @param {any} [params] 参数
   * @returns
   * @memberof HttpService
   */
  get(url: string, params?: any, isBody?: boolean) {
    return this.request('GET', url, params, isBody);
  }

  /**
   * get请求
   *
   * @param {string} url 地址
   * @param {any} [params] 参数
   * @returns
   * @memberof HttpService
   */
  post(url: string, params?: any): Observable<any> {
    return this.request('POST', url, params);
  }

  /**
   * put请求
   *
   * @param {string} url 地址
   * @param {any} [params] 参数
   * @returns
   * @memberof HttpService
   */
  put(url: string, params?: any): Observable<any> {
    return this.request('PUT', url, params);
  }

  /**
   * delete请求
   *
   * @param {string} url 地址
   * @param {any} [params] 参数
   * @returns
   * @memberof HttpService
   */
  delete(url: string, params?: any): Observable<any> {
    return this.request('DELETE', url, params);
  }

  /**
   * request通用请求
   *
   * @private
   * @param {string} method 请求类型
   * @param {string} url 地址
   * @param {any} [params] 参数
   * @returns
   * @memberof HttpService
   */
  request(method: string, url: string, params?: any, isBody = false): Observable<any> {
    let option = {};
    url = `${environment.api}${url}`;
    method = method.toUpperCase();
    if (['POST', 'PUT', 'DELETE'].indexOf(method) > -1 || isBody) {
      option = { body: params };
    } else if (['GET'].indexOf(method) > -1) {
      option = { params: params };
    }
    this.addHeader(option);
    return new Observable((x) => {
      this.http.request(method, url, option).subscribe(
        (y: any) => {
          x.next(y);
          x.complete();
        },
        (y) => {
          x.error(y);
          x.complete();
          this.handleError(y);
        }
      );
    });
  }

  /**
   * 错误处理
   *
   * @private
   * @param {HttpErrorResponse} error
   * @returns
   * @memberof HttpService
   */
  handleError(error: HttpErrorResponse) {
    if (error.error) {
      // this.toastService.create({
      //   message: `[${error.error.errorCode}] ${error.error.errorMessage}`,
      //   delay: 2000
      // });
    }
    return throwError(error.error);
  }

  /**
   * 添加头部信息
   *
   * @private
   * @param {*} option
   * @memberof HttpService
   */
  private addHeader(option: any) {
    let auth = this.setting.getSession('Auth');
    if (auth && auth['token']) {
      option['headers'] = { Authorization: `Bearer ${auth['token']}` };
    }
  }
}
