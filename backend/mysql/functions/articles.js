const mysql = require("mysql2")
const config = require("../db/config")

const pool = mysql.createPool({ 
  ...config,
  multipleStatements : true
})

const { CREATE_ARTICLE , GET_ALL_ARTICLES , GET_ARTICLE } = require("../queries/articles")

exports.createArticleFunction = (user_id, content , title ,subtitle, security ) => { 
  return new Promise((resolve, reject) => { 
    pool.query(CREATE_ARTICLE(user_id, content, title, subtitle, security) , (err, resuls) => { 
      if(err){ 
        reject(err)
      }else{ 
        resolve(resuls)
      }
    })
  })
}

exports.getAllArticlesFunction = () => { 
  return new Promise((resolve, reject) => { 
    pool.query(GET_ALL_ARTICLES() , (err, resuls) => { 
      if(err){ 
        reject(err)
      }else{ 
        resolve(resuls)
      }
    })
  })
}

exports.getArticleFunction = (article_id, user_id) => { 
  return new Promise((resolve, reject) => { 
    pool.query(GET_ARTICLE(article_id, user_id) , (err, resuls) => { 
      if(err){ 
        reject(err)
      }else{ 
        resolve(resuls)
      }
    })
  })
}