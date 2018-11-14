/* eslint-disable no-unneeded-ternary,quotes,semi,no-unused-vars */
/**
 * js 自定义工具类 GCH 2018-09-14
 */
/* eslint-disable eqeqeq */
import ax from '@/config/axios'
import config from '@/config/index'
const {baseURL} = config

var SIGN_REGEXP = /([yMdhsm])(\1*)/g
var DEFAULT_PATTERN = 'yyyy-MM-dd'
var SELECT_DICT_URL = '/dictionary/getDict'
var SELECT_DICT_KEY_CODE = 'keyValue'
var SELECT_DICT_VALUE_CODE = 'title'

function padding(s, len) {
  len = len - (s + '').length
  for (var i = 0; i < len; i++) {
    s = '0' + s
  }
  return s
}

export default {
  formatDate: {
    format: function(value, pattern) {
      let result = value
      if (value instanceof Date) {
        try {
          pattern = pattern || DEFAULT_PATTERN
          return pattern.replace(SIGN_REGEXP, function($0) {
            switch ($0.charAt(0)) {
              case 'y':
                return padding(value.getFullYear(), $0.length)
              case 'M':
                return padding(value.getMonth() + 1, $0.length)
              case 'd':
                return padding(value.getDate(), $0.length)
              case 'w':
                return value.getDay() + 1
              case 'h':
                return padding(value.getHours(), $0.length)
              case 'm':
                return padding(value.getMinutes(), $0.length)
              case 's':
                return padding(value.getSeconds(), $0.length)
            }
          })
        } catch (err) {
          result = value
        }
      }
      return result
    },
    parse: function(dateString, pattern) {
      var matchs1 = pattern.match(SIGN_REGEXP)
      var matchs2 = dateString.match(/(\d)+/g)
      if (matchs1.length === matchs2.length) {
        var _date = new Date(1970, 0, 1)
        for (var i = 0; i < matchs1.length; i++) {
          var _int = parseInt(matchs2[i])
          var sign = matchs1[i]
          switch (sign.charAt(0)) {
            case 'y':
              _date.setFullYear(_int)
              break
            case 'M':
              _date.setMonth(_int - 1)
              break
            case 'd':
              _date.setDate(_int)
              break
            case 'h':
              _date.setHours(_int)
              break
            case 'm':
              _date.setMinutes(_int)
              break
            case 's':
              _date.setSeconds(_int)
              break
          }
        }
        return _date
      }
      return null
    },
    getWeekDay: function(date, callback) {
      debugger
      var weekDay = ["星期天", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"]
      var witeDate;
      if (!date) {
        witeDate = new Date()
      } else {
        if (date.constructor === String) {
          witeDate = new Date(Date.parse(date.replace(/-/g, "/")))
        } else {
          witeDate = date
        }
      }
      var day = witeDate.getDay()
      if (callback && (callback instanceof Function)) {
        callback(day)
      }
      return weekDay[day]
    }
  },
  // 按钮权限控制方法
  butPerm: {
    isShow: function (perm) {
      if (JSON.parse(sessionStorage.getItem('buttonPerm'))[perm]) {
        return true
      } else {
        return false
      }
    },
    getText: function (perm) {
      var permission = JSON.parse(sessionStorage.getItem('buttonPerm'))[perm]
      if (permission && permission.permissionname) {
        return permission.permissionname
      } else {
        return null
      }
    }
  },
  // 获取数据字典对应的属性
  selectDict: {
    getData(url, params, elemId, callback) {
      if (elemId) {
        let data
        try {
          data = JSON.parse(sessionStorage.getItem(elemId)) || []
        } catch (err) {
        }
        if (data && data.length > 0) {
          if (callback && (callback instanceof Function)) {
            callback(data)
            return false
          }
        }
      }
      if (!url) {
        url = SELECT_DICT_URL
      }
      setTimeout(() => {
        ax.post(baseURL + url, params).then(res => {
          if (elemId && res.data && res.data.length > 0) {
            sessionStorage.setItem(elemId, JSON.stringify(res.data))
          }
          if (callback && (callback instanceof Function)) {
            callback(res.data)
          }
        }).catch(() => {
        })
      }, 500)
    },
    getValue: function(value, elemId, keyCode, valueCode, params, url, callback) {
      let datas = JSON.parse(sessionStorage.getItem(elemId)) || []
      if (value && datas && datas.length > 0) {
        return this.eachItem(value, datas, keyCode, valueCode, callback)
      } else {
        this.getData(url, params, elemId, callback)
        /* this.getData(url, params, elemId, function(data) {
          return this.eachItem(value, data, keyCode, valueCode, callback)
        }) */
      }
    },
    eachItem: function(value, datas, keyCode, valueCode, callback) {
      if (!keyCode) {
        keyCode = SELECT_DICT_KEY_CODE
      }
      if (!valueCode) {
        valueCode = SELECT_DICT_VALUE_CODE
      }
      for (let i = 0; i < datas.length; i++) {
        if (datas[i][keyCode] == value) {
          value = datas[i][valueCode]
          if (callback && (callback instanceof Function)) {
            callback(value)
          }
          break
        }
      }
      return value
    }
  },
  // 获取当前项目Id
  getCurrentProjectId: function() {
    let projectId = ''
    let data = JSON.parse(sessionStorage.getItem('projectActive')) || {}
    if (data) {
      projectId = data.projectid
    }
    return projectId
  },
  /**
   * 用于组装项目成员
   * @param members
   * @param callback
   */
  getMemberNames: function(members, callback) {
    let memberNames, wbMemberNames
    for (let i = 0; i < members.length; i++) {
      if (members[i].type === 0) {
        memberNames = memberNames ? memberNames + ',' + members[i].members.name : members[i].members.name
      } else {
        wbMemberNames = wbMemberNames ? wbMemberNames + ',' + members[i].members.name : members[i].members.name
      }
    }
    callback(memberNames ? memberNames : '无', wbMemberNames ? wbMemberNames : '无')
  },
  getUserInfo: function(callback) {
    let userInfo = JSON.parse(sessionStorage.getItem('user'))
    if (callback && (callback instanceof Function)) {
      callback(userInfo)
    }
    return userInfo
  },
  baseURL: baseURL
}
