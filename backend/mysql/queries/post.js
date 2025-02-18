const getAllPostsQuery = (user_id) => `SELECT 
    p.id, 
    p.title, 
    p.description, 
    p.type, 
    p.url, 
    p.created_at, 
    u.username,
    COUNT(DISTINCT pl.id) AS like_count,
    COUNT(DISTINCT pc.id) AS comment_count
FROM posts AS p 
LEFT JOIN users AS u ON p.user_id = u.id
LEFT JOIN post_likes AS pl ON p.id = pl.post_id
LEFT JOIN post_comments AS pc ON p.id = pc.post_id
GROUP BY p.id, p.title, p.description, p.type, p.url, p.created_at, u.username`

const getUserPostsQuery = (id) => `SELECT 
    p.id, 
    p.title, 
    p.description, 
    p.type, 
    p.url, 
    p.created_at, 
    u.username,
    COUNT(DISTINCT pl.id) AS like_count,
    COUNT(DISTINCT pc.id) AS comment_count
FROM posts AS p 
LEFT JOIN users AS u ON p.user_id = u.id
LEFT JOIN post_likes AS pl ON p.id = pl.post_id
LEFT JOIN post_comments AS pc ON p.id = pc.post_id
WHERE p.user_id = ${id}
GROUP BY p.id, p.title, p.description, p.type, p.url, p.created_at, u.username`;

const CREATE_POST_QUERY = (title, description, url, type, user_id, security = "public") => `INSERT INTO posts (title, description, url, type, user_id, security)
VALUES ('${title}','${description}','${url}','${type}','${user_id}','${security}')`

const GET_POST = (post_id, user_id) => `SELECT 
    p.id, 
    p.title, 
    p.description, 
    p.type, 
    p.url, 
    p.created_at, 
    u.username,
    COUNT(DISTINCT pl.id) AS like_count,
    COUNT(DISTINCT pc.id) AS comment_count,
    MAX(CASE WHEN pl.user_id = ${user_id} THEN 1 ELSE 0 END) AS is_liked
FROM posts AS p 
LEFT JOIN users AS u ON p.user_id = u.id
LEFT JOIN post_likes AS pl ON p.id = pl.post_id
LEFT JOIN post_comments AS pc ON p.id = pc.post_id
WHERE p.id = ${post_id}
GROUP BY p.id, p.title, p.description, p.type, p.url, p.created_at, u.username`;

const CHECK_EXISTING_POST_LIKE = (post_id, user_id) => `
SELECT id FROM post_likes 
WHERE user_id = ${user_id} AND post_id = ${post_id}
`

const LIKE_POST = (post_id, user_id) => `
  INSERT INTO post_likes (user_id, post_id)
  values ('${user_id}','${post_id}');
`

const UNLIKE_POST = (post_id, user_id) => `
  DELETE FROM post_likes
  WHERE user_id = ${user_id} AND post_id = ${post_id};
`

module.exports = { 
  getAllPostsQuery,
  getUserPostsQuery,
  CREATE_POST_QUERY,
  GET_POST,
  LIKE_POST,
  UNLIKE_POST,
  CHECK_EXISTING_POST_LIKE
}