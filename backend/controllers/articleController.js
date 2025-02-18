const { createArticleFunction , getAllArticlesFunction , getArticleFunction } = require("../mysql/functions/articles")

exports.createArticle = async function(req, res){ 
  const { content , title, subtitle , security, user_id } = req.body;

  try{ 
    await createArticleFunction(user_id, content, title, subtitle, security)
    res.send("created")
  }catch(err){ 
    console.log(err)
    res.sendStatus(502)
  }
}

exports.getAllArticles = async function(req, res){ 

  try{ 
    const response = await getAllArticlesFunction()
    res.json(response)
  }catch(err){ 
    console.log(err)
    res.sendStatus(502)
  }
}

exports.getArticle = async function(req, res){ 
  const { article_id } = req.params;
  const { user_id } = req.query;


  try{ 
    const [response] = await getArticleFunction(article_id, user_id)
    res.json(response)
  }catch(err){ 
    console.log(err)
    res.sendStatus(502)
  }
}