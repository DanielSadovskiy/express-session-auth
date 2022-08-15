const uuid = require('uuid')
const {users} = require('../mock_users')
const {sessions, Session} = require('../Session')

const signinHandler = (req, res) => {
    const { username, password } = req.body
    console.log('req', req.body)
    if (!username) {
        res.status(401).end()
        return
    }
    const expectedPassword = users[username]
    if (!expectedPassword || expectedPassword !== password) {
        res.status(401).end()
        return
    }

    const sessionToken = uuid.v4()

    const now = new Date()
    const expiresAt = new Date(+now + 120 * 1000)

    const session = new Session(username, expiresAt)
    sessions[sessionToken] = session

    res.cookie("Session", sessionToken, { expires: expiresAt })
    res.end()
}

module.exports = {
    signinHandler
}