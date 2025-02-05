const ALL_USERS = "SELECT id, specific_id, theme_picture, profile_picture, username, name, email, website, bio, status FROM users";
const USER = (identifier) => `SELECT id, specific_id, theme_picture, profile_picture, username, name, email, website, bio, status FROM users WHERE username = '${identifier}' OR specific_id = '${identifier}'`

const verifyUserQuery = (email) =>  `UPDATE users 
SET verified = "yes"
WHERE email = '${email}';`

const ALL_OTHER_USERS = (user_id) => `SELECT id, specific_id, theme_picture, profile_picture, username, name, email, website, bio, status FROM users WHERE id != ${user_id}`

const GET_USER_FRIENDS = (user_id) => `SELECT u.id, u.name, u.profile_picture, u.username
FROM friends f
JOIN users u ON u.id = 
    CASE 
        WHEN f.user_id_1 = ${user_id} THEN f.user_id_2
        ELSE f.user_id_1 
    END
WHERE (f.user_id_1 = ${user_id} OR f.user_id_2 = ${user_id})
AND f.status = 'accepted';`

module.exports = {
    USER,
    ALL_USERS,
    verifyUserQuery,
    ALL_OTHER_USERS,
    GET_USER_FRIENDS
}