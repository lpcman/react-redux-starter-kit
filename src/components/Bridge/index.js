/**
 * File Created by lpcma at 2017/3/21.
 * Copyright 2016 CMCC Corporation Limited.
 * All rights reserved.
 *
 * This software is the confidential and proprietary information of
 * ZYHY Company. ("Confidential Information").  You shall not
 * disclose such Confidential Information and shall use it only in
 * accordance with the terms of the license.
 *
 *
 * @Desc
 * @author lpcma
 * @date 2017/3/21
 * @version
 */

import Lodash from 'lodash';

export const UA = navigator.userAgent.toLocaleLowerCase();

export function isIOS () {
    return /iphone|ipad|ipod/.test(UA);
}

export function isAndroid () {
    return /android/.test(UA);
}

export function objectToParam (obj) {
    return Object.keys(obj).map(function (k) {
        return encodeURIComponent(k) + '=' + encodeURIComponent(obj[k]);
    }).join('&');
}

let lastCallTime = null;

export default function bridgeCall (functionName, data) {
    if (__DEV__) {
        console.log('[bridgeCall]----------->');
        console.log(functionName);
        console.log(JSON.stringify(data));
        // console.log(callback);
    }

  // 解决连续调用问题
    if (lastCallTime && (Date.now() - lastCallTime) < 100) {
        setTimeout(function () {
            bridgeCall(functionName, data);
        }, 100);
        return;
    }

    lastCallTime = Date.now();

    data = data || {};

    // if (callback) {
    //     Lodash.extend(data, { callback: callback });
    // }

    if (isIOS()) {
        Lodash.forIn(data, function (value, key) {
            if (Lodash.isPlainObject(value) || Lodash.isArray(value)) {
                data[key] = JSON.stringify(value);
            }
        });
        var url = 'jsbridge://' + functionName + '?' + objectToParam(data);
        var iframe = document.createElement('iframe');
        iframe.style.width = '1px';
        iframe.style.height = '1px';
        iframe.style.display = 'none';
        iframe.src = url;
        document.body.appendChild(iframe);
        setTimeout(function () {
            iframe.remove();
        }, 100);
    } else if (isAndroid()) {
        window.androidJS && window.androidJS[functionName] && window.androidJS[functionName](JSON.stringify(data));
    } else {
        console.error('未获取platform信息，调取api失败');
    }
}

