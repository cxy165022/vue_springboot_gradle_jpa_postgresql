import ax from '@/config/axios'
import config from '@/config/index'
const {baseURL} = config
export const getProjectList = params => ax.post(baseURL + '/project/list', params) // 列表
export const delProject = params => ax.post(baseURL + '/project/delete', params) // 删除
export const batchDelProject = params => ax.post(baseURL + '/project/batchdelete', params) // 批量删除
export const editProject = params => {
  const url = params.projectid
    ? baseURL + '/project/update' // 编辑
    : baseURL + '/project/save' // 新增
  return ax.post(url, params)
}
export const getMyProjectList = params => ax.post(baseURL + '/project/myProject', params) // 查询当前登录者所能看到的项目列表
export const getProjectTree = params => ax.post(baseURL + '/project/tree', params) // 查询所有项目

export const saveMembers = params => ax.post(baseURL + '/projectMembers/save', params) // 添加项目成员
export const delMembers = params => ax.post(baseURL + '/projectMembers/delete', params) // 删除项目成员
export const getMembersList = params => ax.post(baseURL + '/projectMembers/list', params) // 查询项目成员

 // 添加、编辑项目分区
export const editArea = params => {
  const url = params.id
    ? baseURL + '/projectArea/update' // 编辑
    : baseURL + '/projectArea/save' // 新增
  return ax.post(url, params)
}
export const delArea = params => ax.post(baseURL + '/projectArea/delete', params) // 删除项目分区
export const getAreaList = params => ax.post(baseURL + '/projectArea/list', params) // 查询项目分区
