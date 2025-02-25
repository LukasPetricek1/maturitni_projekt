const CHECK_CHANNEL_EXiSTS = (username_1, username_2) => `
SELECT id FROM channels 
WHERE name = '@${username_1}-${username_2}' OR name = '@${username_2}-${username_1}';
`

const CREATE_NEW_CHANNEL = (channel_name ) => `
  INSERT INTO channels (name) 
  VALUES ('${channel_name}');
`

const CONNECT_USERS_TO_CHANNELS = (user_1_id, user_2_id, channel_id) =>  `
  INSERT INTO channel_users (user_id, channel_id) 
  VALUES ('${user_1_id}', ${channel_id}), ('${user_2_id}', ${channel_id});
`

const SAVE_MESSAGE = (content, channel_id, user_id) => `
INSERT INTO messages (content, channels_id, user_id, status) 
VALUES ('${content}', ${channel_id}, ${user_id}, 'unread');

SELECT * FROM messages
WHERE id = LAST_INSERT_ID();
`

const GET_MESSAGES = (channel_id) => `
SELECT * FROM messages
WHERE channels_id = ${channel_id}
`

const GET_USERS_CHANNELS = (user_id) => `
SELECT c.* 
FROM channels c
JOIN channel_users cu ON c.id = cu.channel_id
WHERE cu.user_id = ${user_id} AND c.organization_id IS NULL;
`

const UPDATE_MESSAGE = (content, message_id) => `
UPDATE messages
SET content = '${content}',
updated_at = now()
where id = ${message_id};

SELECT updated_at FROM messages
WHERE id = ${message_id};
`

const DELETE_MESSAGE = (message_id) => `
UPDATE messages
SET removed = 1
WHERE id = ${message_id}
`

module.exports = { 
  CHECK_CHANNEL_EXiSTS, 
  CREATE_NEW_CHANNEL, 
  CONNECT_USERS_TO_CHANNELS,
  SAVE_MESSAGE,
  GET_USERS_CHANNELS,
  GET_MESSAGES,
  UPDATE_MESSAGE, 
  DELETE_MESSAGE
}