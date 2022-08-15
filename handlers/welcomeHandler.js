const {sessions} = require('../Session')

const welcomeHandler = (req, res) => {
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

    res.send(`Welcome  ${userSession.username}!`).end()
}

module.exports = {
    welcomeHandler
}