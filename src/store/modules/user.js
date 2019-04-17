import { login, logout, getInfo, fristChangePwd, changePassword } from '@/api/login'
import { getToken, setToken, removeToken } from '@/utils/auth'

const user = {
  state: {
    token: getToken(),
    name: '',
    avatar: '',
    roles: []
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_NAME: (state, name) => {
      state.name = name
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    }
  },

  actions: {
    // 登录
    Login({ commit }, userInfo) {
      const { cellPhone, password } = userInfo
      return new Promise((resolve, reject) => {
        login({ mobile: cellPhone, password: password }).then(response => {
          const { data } = response
          // console.log(data)
          commit('SET_TOKEN', data.token)
          setToken(data.token)
          if (data.isNeedResetPassword === 0) {
            console.log('需要重置密码')
            resolve('isNeedResetPassword')
            return
          } else {
            resolve()
          }
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 获取用户信息
    GetInfo({ commit, state }) {
      return new Promise((resolve, reject) => {
        getInfo(state.token).then(response => {
          const data = response.data
          // 判断当前用户是否已经拉取完用户信息
          // if (data.roles && data.roles.length > 0) { // 验证返回的roles是否是一个非空数组
          //   commit('SET_ROLES', data.roles)
          // } else {
          //   reject('getInfo: roles must be a non-null array !')
          // }
          console.log(response)
          console.log(data)
          commit('SET_NAME', data.siteInfo)
          commit('SET_AVATAR', data.userInfo)
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 首次登录修改密码(初始化密码)
    fristChangePwd({ state }) {
      return new Promise((resolve, reject) => {
        fristChangePwd(state.token).then(response => {
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 修改密码
    changePassword({ commit, state }) {
      return new Promise((resolve, reject) => {
        changePassword(state.token).then(response => {
          console.log(response)
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 登出
    LogOut({ commit, state }) {
      return new Promise((resolve, reject) => {
        console.log('退出登录111')
        logout(state.token).then(() => {
          // commit('SET_TOKEN', '')
          // commit('SET_ROLES', [])
          removeToken()
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 前端 登出
    FedLogOut({ commit }) {
      return new Promise(resolve => {
        // commit('SET_TOKEN', '')
        removeToken()
        console.log('退出登录222')
        resolve()
      })
    }
  }
}

export default user
