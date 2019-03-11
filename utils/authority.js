// use localStorage to store the authority info, which might be sent from server in actual project.

export function getAuth() {
  return JSON.parse(localStorage.getItem('user-token')) // 获取用户登录token
}
