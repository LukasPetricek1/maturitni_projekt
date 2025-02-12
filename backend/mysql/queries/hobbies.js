const ADD_HOBBY = (hobby) => `INSERT INTO hobbies (name) VALUES ('${hobby}')
ON DUPLICATE KEY UPDATE name = name;

SELECT id FROM hobbies WHERE name = '${hobby}';`;

const DELETE_USER_HOBBY = (user_id, hobby) =>  `DELETE FROM user_hobbies 
WHERE user_id = ${user_id}
AND hobby_id = (SELECT id FROM hobbies WHERE name = '${hobby}');`;

const CONNECT_USER_AND_HOBBY = (hobby_id , user_id) => `INSERT INTO user_hobbies (hobby_id , user_id)
VALUES ('${hobby_id}', '${user_id}');`


const GET_USER_HOBBIES = (username) => `SELECT h.name 
FROM user_hobbies uh
JOIN hobbies h ON uh.hobby_id = h.id
JOIN users u ON uh.user_id = u.id
WHERE u.username = '${username}';`

const GET_ALL_HOBBIES = `SELECT h.id, h.name
FROM hobbies h
LEFT JOIN user_hobbies AS uh ON h.id = uh.hobby_id 
WHERE uh.user_id != ?;`


module.exports = { 
  DELETE_USER_HOBBY,
  ADD_HOBBY,
  CONNECT_USER_AND_HOBBY,
  GET_USER_HOBBIES,
  GET_ALL_HOBBIES,
}