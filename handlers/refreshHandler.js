
const uuid = require('uuid')
const {sessions, Session} = require('../Session')

const refreshHandler = (req, res) => {
    if (!req.cookies) {
        res.status(401).end()
        return
    }

    const sessionToken = req.cookies['Session']
    if (!sessionToken) {
        res.status(401).end()
        return
    }

    userSession = sessions[sessionToken]
    if (!userSession) {
        res.status(401).end()
        return
    }
    if (userSession.isExpired()) {
        delete sessions[sessionToken]
        res.status(401).end()
        return
    }
    const newSessionToken = uuid.v4()

    const now = new Date()
    const expiresAt = new Date(+now + 120 * 1000)
    const session = new Session(userSession.username, expiresAt)


    sessions[newSessionToken] = session
    delete sessions[sessionToken]

    res.cookie("Session", newSessionToken, { expires: expiresAt })
    res.end()
}

module.exports = {
    refreshHandler
}