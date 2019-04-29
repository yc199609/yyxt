/**
 * Created by jiachenpan on 16/11/18.
 */

export function isvalidUsername(str) {
  const valid_map = ['admin', 'editor']
  return valid_map.indexOf(str.trim()) >= 0
}

export function isExternal(path) {
  return /^(https?:|mailto:|tel:)/.test(path)
}

export const validPhone = (rule, value, callback) => {
  const reg = /^[1]([3-9])[0-9]{9}$/
  if (!value) {
    callback(new Error('请输入电话号码'))
  } else if (!reg.test(value)) {
    callback(new Error('请输入正确的11位手机号码'))
  } else {
    callback()
  }
}

export const validEmail = (rule, value, callback) => {
  const mailReg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/
  if (!value) {
    return callback(new Error('邮箱不能为空'))
  }
  if (mailReg.test(value)) {
    callback()
  } else {
    callback(new Error('请输入正确的邮箱格式'))
  }
}
