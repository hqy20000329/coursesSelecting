/* eslint-disable */
import Mock from 'mockjs'
import { list, lessons, delRes, selRes, reList } from './student.js'
import { getCourses, stuMan } from './teacher'
import { addlessions, addusers, addexams } from './admin'

// 为体现过度动画 设置1s的响应延时
Mock.setup({
  timeout: '1000'
})
let api = 'http://localhost:8080'
//获取验证码
Mock.mock(api+'/captcha', 'post', {
  "code": 200,
    "msg": "获取验证码成功",
    "data": {
        "key": "a1f514ba-c66a-4aba-bcb0-0ecf0992461a",
        "image": "data:image/png;base64,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"
    }
})
// 用户登录
Mock.mock(api+'/login', 'post', {
  "code": 200,
  "msg": "登陆失败",
  "data": "thisistoken"
})

// 获取用户数据
Mock.mock(api+'/info', 'post', {
  "code": 200,
  "msg": "成功",
  "data": {
    "userId": "0174958",
    "userName": "朱文宇",
    "userApart": "信息管理学院",
    "userMajor": "信息管理与信息系统",
    "userClass": "172",
    "userEmail": "592368498@qq.com",
    "role": "student"
  }
})

// 修改密码
Mock.mock(api+'/user/update', 'post', {
  "code": 200,
  "msg": "成功",
  "data": {}
})

// 获取总课表
Mock.mock(api+'/user/list', 'post', list)

// 学生获取已选课程
Mock.mock(api+'/student/lessions', 'post', lessons)

// 学生退选
Mock.mock(api+'/student/delCourses', 'post', delRes)

// 学生选课
Mock.mock(api+'/student/getCourses', 'post', selRes)

// 学生获取推荐课程
Mock.mock(api+'/user/relist', 'post', reList)

// 教师获取自己的课程
Mock.mock(api+'/teacher/getCourses', 'post', getCourses)

// 教师获取自己课程下的对应学生
Mock.mock(api+'/teacher/stuMan', 'post', stuMan)

// 管理员添加课程
Mock.mock(api+'/admin/addlessions', 'post', addlessions)

// 管理员添加用户
Mock.mock(api+'/admin/addusers', 'post', addusers)

// 管理员添加考试
Mock.mock(api+'/admin/addexams', 'post', addexams)