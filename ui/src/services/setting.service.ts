import { Injectable } from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';
import * as _ from 'lodash';

/**
 * 设置服务
 *
 * @export
 * @class SettingsService
 */
@Injectable({ providedIn: 'root' })
export class SettingService {
  constructor() {}

  /**
   * 获取本地值
   *
   * @param {string} key 关键字
   * @returns
   * @memberof SettingsService
   */
  getLocal(key: string) {
    return JSON.parse(localStorage.getItem(key) || 'null') || null;
  }

  /**
   * 设置本地值
   *
   * @param {string} key 关键字
   * @param {*} value 值
   * @memberof SettingsService
   */
  setLocal(key: string, value: any) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  /**
   * 获取当前会话的值
   *
   * @param {string} key 关键字
   * @returns
   * @memberof SettingsService
   */
  getSession(key: string) {
    return JSON.parse(sessionStorage.getItem(key) || 'null') || null;
  }

  /**
   * 设置当前会话值
   *
   * @param {string} key 关键字
   * @param {*} value 值
   * @memberof SettingsService
   */
  setSession(key: string, value: any) {
    sessionStorage.setItem(key, JSON.stringify(value));
  }

  /**
   * 移除本地值
   *
   * @param {string} key 关键字
   * @memberof SettingsService
   */
  removeLocal(key: string) {
    localStorage.removeItem(key);
  }

  /**
   * 移除当前会话
   *
   * @param {string} key 关键字
   * @memberof SettingsService
   */
  removeSession(key: string) {
    sessionStorage.removeItem(key);
  }

  /**
   * 设置表单中只定key的值
   * @param form
   * @param key
   * @param value
   */
  setFormValue(form: UntypedFormGroup, key: string, value: any) {
    let formValue: { [prop: string]: any } = {};
    formValue[key] = value;
    form.patchValue(formValue);
  }

  /**
   * 初始化值替换
   * @param from
   * @param to
   */
  mapToObject(from: { [prop: string]: any }, to: { [prop: string]: any }) {
    for (let key in from) {
      if (typeof to[key] == 'undefined') to[key] = from[key];
    }
  }

  /**
   * 生成guid
   */
  guid() {
    let S4 = () => {
      return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    };
    return S4() + S4() + '-' + S4() + '-' + S4() + '-' + S4() + '-' + S4() + S4() + S4();
  }

  /**
   * 替换值
   * @param str 需要做替换处理的字符串
   * @param obj 替换的对象 key-value
   * @param prop 对象属性模块， 默认 '$[prop]'
   */
  replace(str: string, obj: { [prop: string]: any }, tpl: string = '$[prop]') {
    if (str && obj) {
      for (let key in obj) {
        let replaceStr = tpl.replace('prop', key);
        str = str.replace(replaceStr, obj[key]);
      }
      return str;
    }
    return str;
  }
}
