const nodemailer = require('nodemailer');

const BlackboardSendMail = function () {
    this.transporter;
    this.conf_data = {
        host: "",
        service: "",
        secure: false,
        auth: {
            user: "",
            pass: ""
        }

    }
}

BlackboardSendMail.prototype.connect = function (config, callback) {
    this.conf_data = config;


    if (typeof callback === 'function') {

    } else {
        let promise = new Promise((resolve, reject) => {
      
                resolve(this.conf_data)
                this.transporter = nodemailer.createTransport(this.conf_data);
        })
        return promise;
    }

}

BlackboardSendMail.prototype.sendMail = function (data, callback) {
    if (typeof callback === 'function') {
        this.transporter.sendMail(data, function (error, info) {
            if (error) {
                callback(error, null)
            } else {
                callback(null, info)
            }
        })
    } else {
        let promise = new Promise((resolve, reject) => {
            this.transporter.sendMail(data, function (error, info) {
                if (error) {
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
