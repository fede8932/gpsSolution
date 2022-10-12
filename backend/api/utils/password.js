const bcrypt = require('bcrypt');

const compareHash = async (passwordBody, passwordDB) => {
    try {
     return await bcrypt.compareSync(passwordBody, passwordDB)
    } catch (err) {
     throw err
    }
}

module.exports = { compareHash };