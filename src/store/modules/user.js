import {
  login,
  logout,
  getInfo,
  changePassword
} from '@/api/login'

import {
  getToken,
  setToken,
  removeToken
} from '@/utils/auth'

const user = {
  state: {
    token: getToken(),
    name: '',
    avatar: '',
    roles: [],
    userInfo: [],
    siteInfo: []
  },

  getters: {
    getUserInfo: state => {
      return state.userInfo
    },
    getSiteInfo: state => {
      return state.siteInfo
    }
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
    },
    SET_USERINFO: (state, userInfo) => {
      state.userInfo = userInfo
    },
    SET_SITEINFO: (state, siteInfo) => {
      state.siteInfo = siteInfo
    }
  },

  actions: {
    // 登录
    Login({ commit }, userInfo) {
      const { cellPhone, password } = userInfo
      return new Promise((resolve, reject) => {
        login({ mobile: cellPhone, password: password }).then(response => {
          const { data } = response
          if (data.isNeedResetPassword === 0) {
            const token = data.token
            resolve({ isNeedResetPassword: true, token })
            return
          } else {
            commit('SET_TOKEN', data.token)
            setToken(data.token)
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
          commit('SET_SITEINFO', data.siteInfo)
          commit('SET_USERINFO', data.userInfo)
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 修改密码
    changePassword({ commit, state }) {
      return new Promise((resolve, reject) => {
        changePassword(state.token)
          .then(response => {
            console.log(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    },

    // 登出
    LogOut({ commit, state }) {
      return new Promise((resolve, reject) => {
        logout(state.token).then(() => {
          commit('SET_SITEINFO', null)
          commit('SET_USERINFO', null)
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
        commit('SET_SITEINFO', null)
        commit('SET_USERINFO', null)
        removeToken()
        resolve()
      })
    }
  }
}

export default user
