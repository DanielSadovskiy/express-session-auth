const {sessions} = require('../Session')

const logoutHandler = (req, res) => {
    if (!req.cookies) {
        res.status(401).end()
        return
    }

    const sessionToken = req.cookies['session_token']
    if (!sessionToken) {
        res.status(401).end()
        return
    }

    delete sessions[sessionToken]

    res.cookie("Session", "", { expires: new Date() })
    res.end()
}


module.exports = {
    logoutHandler
}