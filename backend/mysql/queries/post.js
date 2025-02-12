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
WHERE p.user_id != ${user_id}
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

const GET_POST = (id) => `SELECT 
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
WHERE p.id = ${id}
GROUP BY p.id, p.title, p.description, p.type, p.url, p.created_at, u.username`;

module.exports = { 
  getAllPostsQuery,
  getUserPostsQuery,
  CREATE_POST_QUERY,
  GET_POST
}