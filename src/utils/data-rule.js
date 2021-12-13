const MOBILE_REGEX = /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/

const validateCardId = (id) => {
  // 1 "验证通过!", 0 //校验不通过
  const format = /^(([1][1-5])|([2][1-3])|([3][1-7])|([4][1-6])|([5][0-4])|([6][1-5])|([7][1])|([8][1-2]))\d{4}(([1][9]\d{2})|([2]\d{3}))(([0][1-9])|([1][0-2]))(([0][1-9])|([1-2][0-9])|([3][0-1]))\d{3}[0-9xX]$/
  // 号码规则校验
  if (!format.test(id)) {
    return false // { 'status': 0, 'msg': '身份证号码不合规' }
  }
  // 出生年月日校验   前正则限制起始年份为1900;
  const year = id.substr(6, 4) // 身份证年
  const month = id.substr(10, 2) // 身份证月
  const date = id.substr(12, 2)// 身份证日
  const time = Date.parse(month + '-' + date + '-' + year) // 身份证日期时间戳date
  const nowTime = Date.parse(new Date()) // 当前时间戳
  const dates = (new Date(year, month, 0)).getDate()// 身份证当月天数
  if (time > nowTime || date > dates) {
    return false // { 'status': 0, 'msg': '出生日期不合规' }
  }
  // 校验码判断
  const c = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2] // 系数
  const b = ['1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2'] // 校验码对照表
  const idList = id.split('')
  let sum = 0
  for (let k = 0; k < 17; k++) {
    sum += parseInt(idList[k]) * parseInt(c[k])
  }
  if (idList[17].toUpperCase() !== b[sum % 11].toUpperCase()) {
    return false // { 'status': 0, 'msg': '身份证校验码不合规' }
  }
  return true // { 'status': 1, 'msg': '校验通过' }
}

export const mobile = { pattern: MOBILE_REGEX, message: '请输入有效的手机号码', trigger: 'blur' }

export const password = { validator: (rule, str, callback) => {
  const reg = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[^]{8,16}$/
  if (str && !reg.test(str)) {
    callback(new Error(''))
  } else {
    callback()
  }
}, message: '密码长度8~16位,且必须包含大小写字母和数字', trigger: 'blur' }

export const identity_card = { validator: (rule, str, callback) => {
  if (str && !validateCardId(str)) {
    callback(new Error(''))
  } else {
    callback()
  }
}, message: '请输入有效的身份证号码', trigger: 'blur' }

export const required = { required: true, message: '必填', trigger: 'blur' }
export const length = { max: 40, message: '不能超过40个字符', trigger: 'blur' }
export const lengthFor = (length) => ({ max: length, message: `不能超过${length}个字符`, trigger: 'blur' })

export const priceFormater = { pattern: /^\d+(?=\.{0,1}\d{0,2}$|$)/, message: '请输入最多两位小数数字', trigger: 'blur' }
