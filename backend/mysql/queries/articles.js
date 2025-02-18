const GET_ALL_ARTICLES = () => `
SELECT 
    a.id, 
    a.content,
    a.title, 
    a.subtitle,
    a.user_id, 
    a.security,
    a.created_at,
    u.username,
    COUNT(DISTINCT al.id) AS like_count,
    COUNT(DISTINCT ac.id) AS comment_count
FROM articles AS a
LEFT JOIN users AS u ON a.user_id = u.id
LEFT JOIN article_likes AS al ON a.id = al.article_id
LEFT JOIN article_comments AS ac ON a.id = ac.article_id
GROUP BY a.id, a.content, a.title, a.subtitle, a.security, a.created_at, a.user_id, u.username;
`

const GET_ARTICLE = (article_id, user_id) => `
  SELECT 
    a.id, 
    a.content,
    a.title, 
    a.subtitle,
    a.user_id, 
    a.security,
    a.created_at,
    u.username,
    COUNT(DISTINCT al.id) AS like_count,
    COUNT(DISTINCT ac.id) AS comment_count,
    MAX(CASE WHEN al.user_id = ${user_id} THEN 1 ELSE 0 END) AS is_liked
FROM articles AS a
LEFT JOIN users AS u ON a.user_id = u.id
LEFT JOIN article_likes AS al ON a.id = al.article_id
LEFT JOIN article_comments AS ac ON a.id = ac.article_id
WHERE a.id = ${article_id}
GROUP BY a.id, a.content, a.title, a.subtitle, a.security, a.created_at, a.user_id, u.username;
`

const CREATE_ARTICLE = (user_id, content, title, subtitle, security) => `
  insert into articles (content, title, subtitle, user_id, security)
  values ('${content}','${title}','${subtitle}','${user_id}','${security}')
`

module.exports = { 
  CREATE_ARTICLE,
  GET_ALL_ARTICLES,
  GET_ARTICLE
}