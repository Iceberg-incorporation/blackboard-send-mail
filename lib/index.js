const nodemailer = require('nodemailer');

const BlackboardSendMail = function () {
    this.transporter;
}

BlackboardSendMail.prototype.connect = function (config, callback) {

    const conf = Object.keys(config)
    const conf_auth = Object.keys(config.auth)
    // console.log('conf: ', conf);

    // console.log('host: ', typeof config.host);
    // console.log('secure: ', typeof config.secure);
    // console.log('auth: ', typeof config.auth);

    const data = {
        host: "",
        secure: false,
        auth: {
            user: "",
            pass: ""
        }

    }
    if (conf[0] !== "host") {
        console.error(`Invalid ${conf[0]} to host`)
    } else {
        if (typeof config.host !== "string") {
            console.error(`Invalid ${typeof config.host} to string`)
        } else {
            data.host = config.host;
        }
    }

    // if (conf[1] !== "secure") {
    //     console.error(`Invalid ${conf[1]} to secure`)
    // } else {
    //     if (typeof config.secure !== "boolean") {
    //         console.error(`Invalid ${typeof config.secure} to boolean`)
    //     } else {
    //         data.secure = config.secure;
    //     }
    // }

    if (conf[1] !== "auth") {
        console.error(`Invalid ${conf[1]} to auth`)
    } else {
        if (typeof config.auth !== "object") {
            console.error(`Invalid ${typeof config.auth} to object`)
        } else {
            if (conf_auth[0] !== "email") {
                console.error(`Invalid ${conf_auth[0]} to email`)
            } else {
                if (typeof config.auth.email !== "string") {
                    console.error(`Invalid ${typeof config.auth.email} to string`)
                } else {
                    data.auth.user = config.auth.email;
                }
            }

            if (conf_auth[1] !== "password") {
                console.error(`Invalid ${conf_auth[1]} to password`)
            } else {
                if (typeof config.auth.password !== "string") {
                    console.error(`Invalid ${typeof config.auth.password} to string`)
                } else {
                    data.auth.pass = config.auth.password
                }
            }

        }
    }

    // if (typeof callback === 'function') {

    // } else {
    //     let promise = new Promise((resolve, reject) => {

    //     })
    //     return promise;
    // }
    this.transporter = nodemailer.createTransport(data);
}

BlackboardSendMail.prototype.sendMail = function (data, callback) {
    if (typeof callback === 'function') {
        this.transporter.sendMail(data, function (error, info) {
            if (error) {
                callback(error,null)
            } else {
                callback(null,info)
            }
        })
    } else {
        let promise = new Promise((resolve, reject) => {
            this.transporter.sendMail(data, function (error, info) {
                if (error) {
                    resolve(null)
                    reject(error)
                } else {
                    resolve(info)
                }
            })
        })
        return promise;
    }
}

BlackboardSendMail.prototype.BlackboardSendMail = BlackboardSendMail;

const bsm = module.exports = exports = new BlackboardSendMail();
