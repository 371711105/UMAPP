var test = (function ($, layer) {
    return {
        init: function () {
            layer.msg("test");
        }
    };
})(jQuery, layer);

window.common = (function () {
    var common = {};

    //获取url之后的参数
    common.getFragment = function getFragment() {
        //if (window.location.hash.indexOf("#") === 0) {
        //    return parseQueryString(window.location.hash.substr(1));
        //}
        if (window.location.search.indexOf("?") === 0) {
            return parseQueryString(window.location.search.substr(1));
        }
        else {
            return {};
        }
    };

    function parseQueryString(queryString) {
        var data = {},
            pairs, pair, separatorIndex, escapedKey, escapedValue, key, value;

        if (queryString === null) {
            return data;
        }

        pairs = queryString.split("&");

        for (var i = 0; i < pairs.length; i++) {
            pair = pairs[i];
            separatorIndex = pair.indexOf("=");

            if (separatorIndex === -1) {
                escapedKey = pair;
                escapedValue = null;
            } else {
                escapedKey = pair.substr(0, separatorIndex);
                escapedValue = pair.substr(separatorIndex + 1);
            }

            key = decodeURIComponent(escapedKey);
            value = decodeURIComponent(escapedValue);

            data[key] = value;
        }

        return data;
    }

    //获取url #之后的值
    common.getRoute = function getRoute() {
        if (window.location.hash.indexOf("#") === 0) {
            return window.location.hash.substr(2);
        }
        else {
            return null;
        }
    }

    //日期转成指定格式的string
    common.dateToString = function dateToString(date, fmt) {
        if (!common.isNull(date)) {
            var o = {
                "M+": date.getMonth() + 1,                 //月份   
                "d+": date.getDate(),                    //日   
                "h+": date.getHours(),                   //小时   
                "m+": date.getMinutes(),                 //分   
                "s+": date.getSeconds(),                 //秒   
                "q+": Math.floor((date.getMonth() + 3) / 3), //季度   
                "S": date.getMilliseconds()             //毫秒   
            };
            if (!fmt)
                fmt = "yyyy/MM/dd";
            if (/(y+)/.test(fmt))
                fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
            for (var k in o)
                if (new RegExp("(" + k + ")").test(fmt))
                    fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
            return fmt;
        }
    }

    //验证是否为空
    common.isNull = function isNull(value) {
        if (value == null || value == undefined || value.length == 0)
            return true;
        else
            return false;
    }

    //验证是否为日期格式
    common.isDate = function isDate(value) {
        if (common.isNull(value))
            return false;
        var reg = /^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2})$/;
        var r = value.match(reg);
        if (r != null)
            return true;
        else
            return false;
    }

    //判断是否为email
    common.isEmail = function isEmail(value) {
        if (common.isNull(value))
            return false;
        var reg = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
        if (reg.test(value))
            return true;
        else
            return false;
    }

    //判断是否为手机号
    common.isMobileNumber = function isMobileNumber(value) {
        if (common.isNull(value))
            return false;
        var reg = /^0?1[3|4|5|8][0-9]\d{8}$/;
        if (reg.test(value))
            return true;
        else
            return false;
    }

    //判断用户名是否有字母加数字
    common.isAccountContainNumAndCase = function (value) {
        if (common.isNull(value))
            return false;
        var reg = /^[a-zA-Z][a-zA-Z0-9]+$/;
        if (reg.test(value))
            return true;
        else
            return false;
    }

    //判断是否为密码
    common.isPassword = function isPassword(value) {
        if (common.isNull(value))
            return false;
        if (value.length < 6)
            return false;
        if (common.isContinuous(value)) {
            return false;
        }
        var reg = /^[a-zA-Z0-9]+$/;
        if (reg.test(value))
            return true;
        else
            return false;
    }

    //判断是否连续
    common.isContinuous = function isContinuous(value) {
        debugger;
        if (value) {
            var firstChar = value.charAt(0);
            for (var i = 0; i < value.length; i++) {
                if (firstChar != value.charAt(i)) {
                    return false;
                }
                else {
                    continue;
                }
            }
            return true;
        }
        else {
            return false
        }
    }

    //判断确认密码
    common.confirmPassword = function confirmPassword(value1, value2) {
        if (value1 != value2)
            return false;
        else return true;
    }

    //判断是否是正整数
    common.isNumber = function isNumber(value) {
        if (common.isNull(value))
            return false;
        var reg = new RegExp("^[0-9]*$");
        if (reg.test(value))
            return true;
        else
            return false;
    }

    //只能中英文和数字  ^[a-zA-Z0-9\u4E00-\u9FA5]+$
    common.isLimitString = function isLimitString(value) {
        if (common.isNull(value))
            return false;
        var reg = /^[a-zA-Z0-9\u4E00-\u9FA5]+$/;
        if (reg.test(value))
            return true;
        else
            return false;
    }

    //定义api的 base url，
    common.baseUrl = "http://localhost:8080/cbtc/control/";

    //生成地址
    common.generateAddress = function generateAddress(country, province, city, distrit, otherAddr) {
        return country + " " + province + " " + city + " " + distrit + " " + otherAddr;
    }

    /** 
 * base64编码 
 * @param {Object} str 
 */
    common.base64encode = function base64encode(str) {
        var out, i, len;
        var c1, c2, c3;
        len = str.length;
        i = 0;
        out = "";
        while (i < len) {
            c1 = str.charCodeAt(i++) & 0xff;
            if (i == len) {
                out += base64EncodeChars.charAt(c1 >> 2);
                out += base64EncodeChars.charAt((c1 & 0x3) << 4);
                out += "==";
                break;
            }
            c2 = str.charCodeAt(i++);
            if (i == len) {
                out += base64EncodeChars.charAt(c1 >> 2);
                out += base64EncodeChars.charAt(((c1 & 0x3) << 4) | ((c2 & 0xF0) >> 4));
                out += base64EncodeChars.charAt((c2 & 0xF) << 2);
                out += "=";
                break;
            }
            c3 = str.charCodeAt(i++);
            out += base64EncodeChars.charAt(c1 >> 2);
            out += base64EncodeChars.charAt(((c1 & 0x3) << 4) | ((c2 & 0xF0) >> 4));
            out += base64EncodeChars.charAt(((c2 & 0xF) << 2) | ((c3 & 0xC0) >> 6));
            out += base64EncodeChars.charAt(c3 & 0x3F);
        }
        return out;
    }

    /** 
     * base64解码 
     * @param {Object} str 
     */
    common.base64decode = function base64decode(str) {
        var c1, c2, c3, c4;
        var i, len, out;
        len = str.length;
        i = 0;
        out = "";
        while (i < len) {
            /* c1 */
            do {
                c1 = base64DecodeChars[str.charCodeAt(i++) & 0xff];
            }
            while (i < len && c1 == -1);
            if (c1 == -1)
                break;
            /* c2 */
            do {
                c2 = base64DecodeChars[str.charCodeAt(i++) & 0xff];
            }
            while (i < len && c2 == -1);
            if (c2 == -1)
                break;
            out += String.fromCharCode((c1 << 2) | ((c2 & 0x30) >> 4));
            /* c3 */
            do {
                c3 = str.charCodeAt(i++) & 0xff;
                if (c3 == 61)
                    return out;
                c3 = base64DecodeChars[c3];
            }
            while (i < len && c3 == -1);
            if (c3 == -1)
                break;
            out += String.fromCharCode(((c2 & 0XF) << 4) | ((c3 & 0x3C) >> 2));
            /* c4 */
            do {
                c4 = str.charCodeAt(i++) & 0xff;
                if (c4 == 61)
                    return out;
                c4 = base64DecodeChars[c4];
            }
            while (i < len && c4 == -1);
            if (c4 == -1)
                break;
            out += String.fromCharCode(((c3 & 0x03) << 6) | c4);
        }
        return out;
    }

    //滚动到指定位置（默认为顶端）
    common.scrolling = function scrolling(selector, speed) {
        if (common.isNull(speed)) {
            speed = 100;
        }
        if (common.isNull(selector)) {
            $("html,body").animate({
                scrollTop: 0
            }, speed);
        }
        else {
            $("html,body").animate({
                scrollTop: selector.offset().top
            }, speed);
        }
    }


    //创建cookie
    common.setCookie = function setCookie(cookieName, value, expiredays) {
        var exdate = new Date()
        exdate.setDate(exdate.getDate() + expiredays)
        document.cookie = cookieName + "=" + escape(value) +
        ((expiredays == null) ? "" : ";expires=" + exdate.toGMTString())
    }

    //获取cookie
    common.getCookie = function getCookie(cookieName) {
        if (document.cookie.length > 0) {
            cStart = document.cookie.indexOf(cookieName + "=")
            if (cStart != -1) {
                cStart = cStart + cookieName.length + 1
                cEnd = document.cookie.indexOf(";", cStart)
                if (cEnd == -1) cEnd = document.cookie.length
                return unescape(document.cookie.substring(cStart, cEnd))
            }
        }
        return ""
    };

    return common;
})();
//然而，这样做并不能对 Windows Phone 8 Update 3 (a.k.a. GDR3) 版本之前的设备起作用，由于这样做将导致 Windows Phone 8 设备按照桌面浏览器的方式呈现页面，而不是较窄的“手机”呈现方式，为了解决这个问题，还需要加入以下 CSS 和 JavaScript 代码来化解此问题。
// Copyright 2014-2015 Twitter, Inc.
// Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
if (navigator.userAgent.match(/IEMobile\/10\.0/)) {
    var msViewportStyle = document.createElement('style')
    msViewportStyle.appendChild(
      document.createTextNode(
        '@-ms-viewport{width:auto!important}'
      )
    )
    document.querySelector('head').appendChild(msViewportStyle)
}
//如果 <select> 元素应用了 border-radius 和/或 border 样式，Android 系统默认的浏览器将不会显示侧边栏控件。（详见 这个 StackOverflow 上的问题 。） 使用下面的代码片段来删除有问题的CSS并且在Android系统默认的浏览器上，<select> as an呈现为无样式元素。可以通过检测用户代理（user agent）的特征串来避免干扰 Chrome、Safari和 Mozilla 浏览器
$(function () {
    var nua = navigator.userAgent
    var isAndroid = (nua.indexOf('Mozilla/5.0') > -1 && nua.indexOf('Android ') > -1 && nua.indexOf('AppleWebKit') > -1 && nua.indexOf('Chrome') === -1)
    if (isAndroid) {
        $('select.form-control').removeClass('form-control').css('width', '100%')
    }
})