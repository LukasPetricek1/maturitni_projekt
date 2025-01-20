const USERS_QUERY = "SELECT id, theme_picture, profile_picture, username, name, email, website FROM users";
const USER_QUERY = (identifier) => `SELECT id, theme_picture, profile_picture, username, name, email, website FROM users WHERE username = '${identifier}' OR id = '${identifier}'`

module.exports = {
    USERS_QUERY,
    USER_QUERY
}