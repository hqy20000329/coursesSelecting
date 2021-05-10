/* eslint-disable */
import Mock from 'mockjs'
import { list, lessons, delRes, selRes, reList } from './student.js'
import { getCourses, getStudents } from './teacher'
import { addlessions, addusers, addexams } from './admin'

// 为体现过度动画 设置1s的响应延时
Mock.setup({
  timeout: '1000'
})

// 用户登录
Mock.mock('/api/login', 'get', {
  "code": 200,
  "msg": "登陆失败",
  "data": "thisistoken"
})

// 获取用户数据
Mock.mock('/api/info', 'get', {
  "code": 200,
  "msg": "成功",
  "data": {
    "userId": "0174958",
    "userName": "朱文宇",
    "userApart": "信息管理学院",
    "userMajor": "信息管理与信息系统",
    "userClass": "172",
    "userEmail": "592368498@qq.com",
    "role": "admin"
  }
})

// 修改密码
Mock.mock('/api/updatePwd', 'post', {
  "code": 200,
  "msg": "成功",
  "data": {}
})

// 获取总课表
Mock.mock('/api/user/list', 'get', list)

// 学生获取已选课程
Mock.mock('/api/student/lessions', 'get', lessons)

// 学生退选
Mock.mock('/api/student/delCourses', 'post', delRes)

// 学生选课
Mock.mock('/api/student/getCourses', 'post', selRes)

// 学生获取推荐课程
Mock.mock('/api/user/relist', 'get', reList)

// 教师获取自己的课程
Mock.mock('/api/teacher/getCourses', 'get', getCourses)

// 教师获取自己课程下的对应学生
Mock.mock('/api/teacher/getStudents', 'get', getStudents)

// 管理员添加课程
Mock.mock('/api/admin/addlessions', 'post', addlessions)

// 管理员添加用户
Mock.mock('/api/admin/addusers', 'post', addusers)

// 管理员添加考试
Mock.mock('/api/admin/addexams', 'post', addexams)