const { getRandomInt } = require("./util.service")

function execute(task) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (Math.random() > 0.5) resolve(parseInt(Math.random() * 100))
            else reject(_getRamdomErrror())
        }, 5000)
    })
}

function _getRamdomErrror(){
    const errors = ['High Temparture','Server is down','unvaliad logetToken','Device is bussy','Server is down']
    return errors[getRandomInt(0,errors.length-1)]
}

module.exports = {
    execute
}