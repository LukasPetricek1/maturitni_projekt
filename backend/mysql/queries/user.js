const ALL_USERS = "SELECT id, specific_id, theme_picture, profile_picture, username, name, email, website, bio, status FROM users";
const USER = (identifier) => `SELECT 
    u.id, 
    u.specific_id, 
    u.theme_picture, 
    u.profile_picture, 
    u.username, 
    u.name, 
    u.email, 
    u.website, 
    u.bio, 
    u.status, 
    GROUP_CONCAT(h.name) AS hobbies
FROM users u
LEFT JOIN user_hobbies uh ON u.id = uh.user_id
LEFT JOIN hobbies h ON uh.hobby_id = h.id
WHERE u.username = '${identifier}'
GROUP BY u.id;`

const DISCOVER_USERS_BY_HOBBY = (hobbies, user_id) => { 
  if(hobbies.length !== 0) {
    return `SELECT u.id, u.theme_picture, u.profile_picture, u.username,u.name, GROUP_CONCAT(h.name) AS hobbies
          FROM users u
          LEFT JOIN user_hobbies uh ON u.id = uh.user_id
          LEFT JOIN hobbies h ON uh.hobby_id = h.id
          WHERE h.name IN (?, ? , ? , ? , ?)
          AND u.id != ${user_id}
          GROUP BY u.id;`
  }else{ 
    return `SELECT u.id, u.theme_picture, u.profile_picture, u.username,u.name, GROUP_CONCAT(h.name) AS hobbies
          FROM users u
          LEFT JOIN user_hobbies uh ON u.id = uh.user_id
          LEFT JOIN hobbies h ON uh.hobby_id = h.id
          WHERE h.name is not null
          AND u.id != ${user_id}
          GROUP BY u.id;`
  }
}

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

const CHECK_EMAIL_EXISTS = (email) => `SELECT email FROM users WHERE email = '${email}'`
const CHECK_USERNAME_EXISTS = (username) => `SELECT username FROM users WHERE username = '${username}'`


const UPDATE_PROFILE_PICTURE = (profile_picture, user_id) => `UPDATE users
SET profile_picture = '${profile_picture}'
WHERE id = ${user_id};
`

const UPDATE_THEME_PICTURE = (theme_picture, user_id) => `UPDATE users
SET theme_picture = '${theme_picture}'
WHERE id = ${user_id};
`

const UPDATE_USER_INFO = (user_id, username, name, web, email, bio) => {
  if(email){ 
    return `UPDATE users
            SET username = '${username}',
            name = '${name}',
            website = '${web}',
            email = '${email}',
            bio = '${bio}',
            verified = 'no'
            WHERE id = ${user_id};
            
            DELETE FROM verification_codes
            WHERE email = '${email}';`
  }else{ 
    return `UPDATE users
            SET username = '${username}',
            name = '${name}',
            website = '${web}',
            bio = '${bio}'
            WHERE id = ${user_id}`
  }
}

module.exports = {
    USER,
    ALL_USERS,
    verifyUserQuery,
    ALL_OTHER_USERS,
    GET_USER_FRIENDS,
    CHECK_EMAIL_EXISTS,
    CHECK_USERNAME_EXISTS,
    DISCOVER_USERS_BY_HOBBY,
    UPDATE_PROFILE_PICTURE,
    UPDATE_THEME_PICTURE,
    UPDATE_USER_INFO
}