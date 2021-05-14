export function getCourses () {
  return {
    code: 200,
    msg: '查询成功',
    data: [
      {
        cosId: '00171',
        cosName: 'Web前端开发技术',
        cosTea: '朱文宇',
        cosApart: '信息管理学院',
        cosDate: '1-16',
        cosTime: '5-12',
        cosGra: 1,
        cosSta: '选修课',
        cosCap: '20',
        cosStu: 3
      },
      {
        cosId: '00172',
        cosName: '运筹学',
        cosTea: '朱文宇',
        cosApart: '信息管理学院',
        cosDate: '1-16',
        cosTime: '3-12,4-12',
        cosGra: 3,
        cosSta: '必修课',
        cosCap: '60',
        cosStu: 8
      },
      {
        cosId: '00199',
        cosName: '马克思主义哲学',
        cosTea: '朱文宇',
        cosApart: '信息管理学院',
        cosDate: '1-16',
        cosTime: '2-89,4-89',
        cosGra: 4,
        cosSta: '必修课',
        cosCap: '120',
        cosStu: 0
      }
    ]
  }
}

export function stuMan (cosId) {
  return {
    code: 200,
    msg: '成功',
    data: [
      {
        userId: '0164906',
        userName: 'AA56',
        userSex: 1,
        userApart: '信息管理学院',
        userMajor: '信息管理与信息系统',
        userClass: '161'
      },
      {
        userId: '0164914',
        userName: 'AA64',
        userSex: 1,
        userApart: '信息管理学院',
        userMajor: '信息管理与信息系统',
        userClass: '161'
      },
      {
        userId: '0164919',
        userName: 'AA69',
        userSex: 1,
        userApart: '信息管理学院',
        userMajor: '信息管理与信息系统',
        userClass: '161'
      }
    ]
  }
}
