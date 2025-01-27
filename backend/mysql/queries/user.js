const ALL_USERS = "SELECT id, theme_picture, profile_picture, username, name, email, website FROM users";
const USER = (identifier) => `SELECT id, specific_id, theme_picture, profile_picture, username, name, email, website, bio, status FROM users WHERE username = '${identifier}' OR specific_id = '${identifier}'`

module.exports = {
    USER,
    ALL_USERS
}