import ax from '@/config/axios'
import config from '@/config/index'
const {baseURL} = config
export const login = params => ax.post(baseURL + '/ajaxLogin', params) // 用户登录
export const logout = params => ax.post(baseURL + '/logout', params) // 用户登录
export const getMenuList = () => ax.post(baseURL + '/user/getMenuTree') // 获取菜单
export const editPwd = params => ax.post(baseURL + '/user/resetPwd', params) // 修改密码
export const getMenuTreeByRole = () => ax.post(baseURL + '/user/getMenuTreeByRole') // 综合查询获取菜单
