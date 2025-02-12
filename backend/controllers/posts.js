const {getAllPostsFunction , getUserPosts , createPost, getPost } = require("../mysql/functions/posts")
const { PutObjectCommand } = require("@aws-sdk/client-s3")

const s3 = require("../upload/s3")

exports.getAllPosts = function(req, res){ 
  const { user_id } = req.query;
  getAllPostsFunction(user_id)
  .then(data => {
    res.status(201).json(data)
  })
  .catch(err => {
    res.status(500).send({ error : err})
  })
}

exports.getUserPosts = function(req, res){ 
  const  { id } = req.query;
  getUserPosts(id)
  .then(data => {
    res.status(201).json(data)
  })
  .catch(err => {
    console.log(err)
    res.status(500).send({ error : err})
  })
}

exports.getPost = async function(req, res){ 
  const { post_id } = req.params;

  // const client = new S3Client(clientParams);
  // const command = new GetObjectCommand(getObjectParams);
  // const url = await getSignedUrl(client, command, { expiresIn: 3600 });
  // res.send(`Post with id : ${post_id}`)

  getPost(post_id)
  .then(data => {
    res.status(201).json(data)
  })
  .catch(err => {
    console.log(err)
    res.status(500).send({ error : err})
  })
}

exports.createPost = async function(req, res){ 
  console.log(req.body)
  const { user_id } = req.query;
  const buffer = req.file.buffer;


  const params = { 
    Bucket : process.env.AWS_BUCKET_NAME,
    // Key: randomImageName(),
    Key : `public/${Date.now()}-${req.file.originalname}`,
    Body : buffer,
    ContentType : req.file.mimetype
  }

  try {
    const command = new PutObjectCommand(params)

    await s3.send(command) 
    const fileURL = `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_BUCKET_REGION}.amazonaws.com/${params.Key}`

    await createPost(req.body.name, req.body.description, fileURL, req.file.mimetype, user_id, "public")
    
  
  }catch(err){ 
    if(err){ 
      console.log(err)
      return res.sendStatus(501) 
    }
  }
  


  return res.json({ error : null })
}

exports.archivePost = function(req, res){ 
  const { post_id } = req.params;
  res.send(`Archivating post with id : ${post_id}`)
}

exports.deleteArchivedPost = function(req, res){ 
  const { post_id } = req.params;
  res.send(`Deleting archivated post with id : ${post_id}`)
}