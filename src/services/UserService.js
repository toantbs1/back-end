const User = require('../models/UserModel')
const bcrypt = require("bcrypt")
const { genneralAccessToken, genneralRefreshToken } = require('./JwtService')

const createUser = (newUser) => {
    return new Promise(async (resolve, reject) => {
        const { name, email, password, confirmPassword, phone } = newUser
        try {
            const checkUser = await User.findOne({
                email: email
            })
            if (checkUser != null) {
                resolve({
                    status: 'ERR',
                    message: 'Email đã tồn tại',
                })
            }
            const hash = bcrypt.hashSync(password, 10)
            const createdUser = await User.create({
                name,
                email,
                password: hash,
                phone
            })
            if (createdUser) {
                resolve({
                    status: 'OK',
                    message: 'Tạo tài khoản thành công',
                    data: createdUser
                })
            }

        } catch (e) {
            reject(e)
        }
    })
}

const loginUser = (UserLogin) => {
    return new Promise(async (resolve, reject) => {
        const { email, password } = UserLogin
        try {
            const checkUser = await User.findOne({
                email: email
            })
            if (checkUser == null) {
                resolve({
                    status: 'ERR',
                    message: 'User không tồn tại',
                })
            }
            const comparePassword = bcrypt.compareSync(password, checkUser.password)
            if (!comparePassword) {
                resolve({
                    status: 'ERR',
                    message: 'Đăng nhập không thành công',
                })
            }
            const access_token = await genneralAccessToken({
                id: checkUser.id,
                isAdmin: checkUser.isAdmin
            })
            const refresh_token = await genneralRefreshToken({
                id: checkUser.id,
                isAdmin: checkUser.isAdmin
            })
            resolve({
                status: 'OK',
                message: 'Đăng nhập thành công',
                access_token,
                refresh_token,

            })

        } catch (e) {
            reject(e)
        }
    })
}

const updateUser = (id, data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkUser = await User.findOne({
                _id: id
            })
            if (checkUser === null) {
                resolve({
                    status: 'OK',
                    message: 'User không tồn tại',
                })
            }
            const updatedUser = await User.findByIdAndUpdate(id, data, { new: true })
            resolve({
                status: 'OK',
                message: 'Cập nhật thành công',
                data: updatedUser
            })

        } catch (e) {
            reject(e)
        }
    })
}

const deleteUser = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkUser = await User.findOne({
                _id: id
            })
            if (checkUser === null) {
                resolve({
                    status: 'OK',
                    message: 'User không tồn tại',
                })
            }
            await User.findByIdAndDelete(id)
            resolve({
                status: 'OK',
                message: 'Xóa user thành công',
            })

        } catch (e) {
            reject(e)
        }
    })
}

const deleteManyUser = (Ids) => {
    return new Promise(async (resolve, reject) => {
        try {

            await User.deleteMany({ _id: Ids })
            resolve({
                status: 'OK',
                message: 'Xóa cac user thành công',
            })

        } catch (e) {
            reject(e)
        }
    })
}

const getAllUser = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const allUser = await User.find()
            resolve({
                status: 'OK',
                message: 'Get all success',
                data: allUser
            })

        } catch (e) {
            reject(e)
        }
    })
}

const getDetailUser = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkUser = await User.findOne({
                _id: id
            })
            if (checkUser === null) {
                resolve({
                    status: 'OK',
                    message: 'User không tồn tại',
                })
            }

            resolve({
                status: 'OK',
                message: 'get success',
                data: checkUser
            })

        } catch (e) {
            reject(e)
        }
    })
}


module.exports = {
    createUser,
    loginUser,
    updateUser,
    deleteUser,
    getAllUser,
    getDetailUser,
    deleteManyUser,
}