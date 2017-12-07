'use strict';
import $ from 'jquery';
// 提示弹框
export function dialog (text, options) {
  const dailog = document.createElement('div');
  dailog.className = 'm-dailog';
  dailog.innerHTML = '<span>' + text + '</span>';
  document.body.appendChild(dailog);
  $('.m-dailog').fadeIn();
  setTimeout(function () {
    $('.m-dailog').fadeOut(500, function () {
      document.body.removeChild(dailog);
      if (options != null) {
        return options();
      }
    }
  );
  }, 1000);
}
// 设置cookie
export function setCookie (cname, value, days) {
  let date = new Date();
  date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
  let expires = 'expires=' + date.toUTCString();
  document.cookie = cname + '=' + encodeURI(value) + '; ' + expires;
}

// 获取cookie
export function getCookie (cname) {
  if (document.cookie.length > 0) {
    let cstart = document.cookie.indexOf(cname + '=');
    if (cstart !== -1) {
      cstart = cstart + cname.length + 1;
      let cend = document.cookie.indexOf(';', cstart);
      if (cend === -1) cend = document.cookie.length;
      return decodeURI(document.cookie.substring(cstart, cend));
    }
  }
  return '';
}

// 删除cookie
export function delCookie (cname) {
  setCookie(cname, '', -1);
}

// 时间戳
export function formatDate (date, fmt) {
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
  }
  let o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds()
  };
  for (let k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      let str = o[k] + '';
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str));
    }
  }
  return fmt;
};

function padLeftZero (str) {
  return ('00' + str).substr(str.length);
};
