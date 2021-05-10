// 封装模块 使用localStorage实现持久化 只是进行保存
// 从localStorage中取出一项数据 名字叫name
export const getItem = name => {
  return localStorage.getItem(name)
}
// 向localStorage中设置一项数据 名字为name里面设置值为obj
export const setItem = (name, obj) => {
  localStorage.setItem(name, obj)
}
// 删除
export const removeItem = name => {
  localStorage.removeItem(name)
}
