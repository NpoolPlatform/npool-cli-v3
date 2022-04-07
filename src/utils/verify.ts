import { MaxPasswordLength, MinPasswordLength, VerificationCodeLength } from '../const/const'

const validateEmailAddress = (addr: string): boolean => {
  const reg = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
  return reg.test(addr)
}

const validateVerificationCode = (code: string): boolean => {
  return code.length === VerificationCodeLength
}

const validatePassword = (password: string): boolean => {
  if (password.length < MinPasswordLength || password.length > MaxPasswordLength) {
    return false
  }

  const reg1 = /^[A-Za-z0-9!@#$%^&*()_+]+$/
  if (!reg1.test(password)) {
    return false
  }

  const reg2 = /[A-Za-z]+/
  if (!reg2.test(password)) {
    return false
  }

  const reg3 = /[0-9]+/
  if (!reg3.test(password)) {
    return false
  }

  const reg4 = /[!@#$%^&*()_+]+/
  if (!reg4.test(password)) {
    return false
  }

  return true
}

const formatMobileNO = (no: string): string => {
  return no.replace(/ /g, no)
}

const validateMobileNO = (no: string) => {
  const reg = /^(\+\d{1,3}[- ]?)?\d{10}$/
  return reg.test(formatMobileNO(no))
}

export {
  validateEmailAddress,
  validateVerificationCode,
  validatePassword,
  validateMobileNO
}
