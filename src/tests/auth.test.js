const expect = require('chai').expect
// const should = require('should')
const { app, jwt } = require('../config')
const axios = require('axios')
// const util = require('util')
const fakerator = require('fakerator')()

const describe = require('mocha').describe
const it = require('mocha').it

const { toMilliseconds } = require('../api/utils/datetime')
const { userFindAny } = require('../api/repositories/user')

const registerUserCall = async (data) => {
  try {
    return await axios.post(`${app.base_backend_url}/auth/register`, data)
  } catch (err) {
    return err
  }
}

const verifyEmailCall = async (token) => {
  try {
    return await axios.get(`${app.base_backend_url}/auth/verify/email/${token}`)
  } catch (err) {
    return err
  }
}

const sendResetPasswordMailCall = async (data) => {
  try {
    return await axios.post(`${app.base_backend_url}/auth/password`, data)
  } catch (err) {
    return err
  }
}

const sendResetPasswordCall = async (data) => {
  try {
    return await axios.put(`${app.base_backend_url}/auth/password-reset/${data.reset_password_jwt}`, {
      password: data.password,
      password_confirmation: data.password_confirmation
    })
  } catch (err) {
    return err
  }
}

const wait = ms => new Promise(resolve => setTimeout(resolve, ms))

const password = fakerator.internet.password(10)
const user = {
  email: fakerator.internet.email(),
  password: password,
  password_confirmation: password
}

describe('Registration', () => {
  it('should create user', async () => {
    const res = await registerUserCall(user)
    expect(res.status).to.equal(201)
    expect(res.data.message).to.equal(`${user.email} created.`)
  })

  it('should return user already exists', async () => {
    const res = await registerUserCall(user)
    expect(res.response.status).to.equal(400)
    expect(res.response.data.message).to.equal(`${user.email} alerady in use.`)
  })

  it('shoudn\'t create user without email', async () => {
    user.email = ''
    const res = await registerUserCall(user)
    expect(res.response.status).to.equal(400)
    expect(res.response.data.errors).to.be.a('array')
    expect(res.response.data.errors).to.have.lengthOf(2)
  })

  it('shoudn\'t create user if passwords don\'t match', async () => {
    user.email = fakerator.internet.email()
    user.password_confirmation = `${user.password}123456789`
    const res = await registerUserCall(user)
    expect(res.response.status).to.equal(400)
    expect(res.response.data.errors).to.be.a('array')
    expect(res.response.data.errors).to.have.lengthOf(1)
  })

  it('shoudn\'t create user if password is less than 8', async () => {
    user.password = fakerator.internet.password(7)
    user.password_confirmation = user.password
    const res = await registerUserCall(user)
    expect(res.response.status).to.equal(400)
    expect(res.response.data.errors).to.be.a('array')
    expect(res.response.data.errors).to.have.lengthOf(1)
  })

  it('shoudn\'t create user if password doesn\'t contain at least one uppercase letter', () => { })

  it('shoudn\'t create user if password doesn\'t contain at least one special char', () => { })
})

describe('Email verification', () => {
  it('should verify users email address', async () => {
    const password = fakerator.internet.password(10)
    const user = {
      email: fakerator.internet.email(),
      password: password,
      password_confirmation: password
    }

    const res = await registerUserCall(user)
    const verifyRes = await verifyEmailCall(res.data.token)
    expect(verifyRes.status).to.equal(200)
    expect(verifyRes.data.message).to.equal('Email verified.')
  })

  it('shouldn\'t verify users email address (token has expired)', async () => {
    const password = fakerator.internet.password(10)
    const user = {
      email: fakerator.internet.email(),
      password: password,
      password_confirmation: password
    }

    await wait('1 minutes')
    const res = await registerUserCall(user)

    await wait(toMilliseconds(jwt.email.expiresIn))

    const verifyRes = await verifyEmailCall(res.data.token)

    expect(verifyRes.response.status).to.equal(400)
    expect(verifyRes.response.data.message).to.equal('Email token has expired.')
  })
})

describe('Reset password', async () => {
  it('should send reset password mail', async () => {
    const user = await userFindAny()
    const response = await sendResetPasswordMailCall({ email: user.email })
    expect(response.data.info.accepted).to.be.a('array')
    expect(response.data.info.accepted).to.have.lengthOf.above(0)
  })

  it('should rest password', async () => {
    const user = await userFindAny()
    const mail = await sendResetPasswordMailCall({ email: user.email })
    const password = fakerator.internet.password(10)
    const data = {
      reset_password_jwt: mail.data.token,
      password: password,
      password_confirmation: password
    }
    const response = await sendResetPasswordCall(data)

    expect(response.status).to.be.equal(200)
    expect(response.data.message).to.be.equal('Password reset.')
  })

  it('shouldn\'t reset password (without password and password_confirmation)', async () => {
    const user = await userFindAny()
    const mail = await sendResetPasswordMailCall({ email: user.email })
    fakerator.internet.password(10)
    const data = {
      reset_password_jwt: mail.data.token

    }
    const response = await sendResetPasswordCall(data)

    expect(response.response.status).to.be.equal(400)
  })

  it('shouldn\'t reset password (without password)', async () => {
    const user = await userFindAny()
    const mail = await sendResetPasswordMailCall({ email: user.email })
    const password = fakerator.internet.password(10)
    const data = {
      reset_password_jwt: mail.data.token,
      password_confirmation: password
    }
    const response = await sendResetPasswordCall(data)

    expect(response.response.status).to.be.equal(400)
  })

  it('shouldn\'t reset password (without password_confirmation)', async () => {
    const user = await userFindAny()
    const mail = await sendResetPasswordMailCall({ email: user.email })
    const password = fakerator.internet.password(10)
    const data = {
      reset_password_jwt: mail.data.token,
      password: password
    }
    const response = await sendResetPasswordCall(data)

    expect(response.response.status).to.be.equal(400)
  })

  it('shouldn\'t reset password (password and password_confirmation doesn\'t match)', async () => {
    const user = await userFindAny()
    const mail = await sendResetPasswordMailCall({ email: user.email })
    const password = fakerator.internet.password(10)
    const data = {
      reset_password_jwt: mail.data.token,
      password: password,
      password_confirmation: password + '1'
    }
    const response = await sendResetPasswordCall(data)
    expect(response.response.status).to.be.equal(400)
  })

  it('shouldn\'t reset password (token expired)', async () => {
    const user = await userFindAny()
    const mail = await sendResetPasswordMailCall({ email: user.email })
    await wait(toMilliseconds(jwt.reset_password.expiresIn))
    const password = fakerator.internet.password(10)
    const data = {
      reset_password_jwt: mail.data.token,
      password: password,
      password_confirmation: password
    }
    const response = await sendResetPasswordCall(data)
    expect(response.response.status).to.be.equal(400)
  })
})
