const SEND_FRIENDS_INVITATION = (user_id_1 , user_id_2) => `INSERT INTO friends (user_id_1, user_id_2, status) 
VALUES (${user_id_1}, ${user_id_2}, 'pending')
ON DUPLICATE KEY UPDATE status = 'pending', updated_at = NOW();`;

const CHECK_FRIENDSHIP = (user_id_1 , user_id_2) =>  `SELECT status FROM friends 
WHERE (user_id_1 = ${user_id_1} AND user_id_2 = ${user_id_2}) OR (user_id_1 = ${user_id_2} AND user_id_2 = ${user_id_1});`;

const GET_ALL_INVITATIONS = (user_id) =>  `SELECT f.id, f.user_id_1 AS sender_id, u.name AS sender_name, u.email as sender_email, u.profile_picture as sender_profile_picture, u.username as sender_username, f.created_at 
FROM friends f
JOIN users u ON f.user_id_1 = u.id
WHERE f.user_id_2 = ${user_id} AND f.status = 'pending';`;

const ACCEPT_FRIENDSHIP_INVITATION = (user_id_1 , user_id_2) => `UPDATE friends 
SET status = 'accepted', updated_at = NOW()
WHERE user_id_1 = ${user_id_1} AND user_id_2 = ${user_id_2} AND status = 'pending';`

const REFUSE_FRIENDSHIP_INVITATION = (user_id_1, user_id_2) => `DELETE FROM friends 
WHERE user_id_1 = ${user_id_1} AND user_id_2 = ${user_id_2} AND status = 'pending';`

const DELETE_FRIENDSHIP = (user_id_1, user_id_2) => `DELETE FROM friends 
WHERE (user_id_1 = ${user_id_1} AND user_id_2 = ${user_id_2}) OR (user_id_1 = ${user_id_2} AND user_id_2 = ${user_id_1});`

const BLOCK_USER = (user_id_1 , user_id_2) => `UPDATE friends 
SET status = 'blocked', updated_at = NOW()
WHERE (user_id_1 = ${user_id_1} AND user_id_2 = ${user_id_2}) OR (user_id_1 = ${user_id_2} AND user_id_2 = ${user_id_1});`

module.exports = { 
  SEND_FRIENDS_INVITATION,
  CHECK_FRIENDSHIP,
  GET_ALL_INVITATIONS,
  ACCEPT_FRIENDSHIP_INVITATION, 
  REFUSE_FRIENDSHIP_INVITATION, 
  DELETE_FRIENDSHIP,
  BLOCK_USER
}