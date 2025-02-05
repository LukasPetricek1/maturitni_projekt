const {getAllPostsFunction , getUserPosts } = require("../mysql/functions/posts")
const crypto = require("crypto")

const { S3Client , GetObjectCommand , PutObjectCommand } = require("@aws-sdk/client-s3")

const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");

const {
  BUCKET_NAME,
  BUCKET_REGION,
  ACCESS_KEY,
  SECRET_ACCESS_KEY
} = process.env;

const s3 = new S3Client({ 
  region: BUCKET_REGION,
  credentials : { 
    accessKeyId : ACCESS_KEY,
    secretAccessKey : SECRET_ACCESS_KEY
  }
})

const randomImageName = (bytes = 32) => crypto.randomBytes(bytes).toString("hex")


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
    data = data.map(post => {
      return { 
        id : post.id,
        username : post.username,
        title: post.title,
        description : post.description,
        contentType : post.type,
        contentSrc : post.url,
        date : post.created_at,
        likes : post.like_count,
        comments: post.comment_count
      }
    })

    res.status(201).json(data)
  })
  .catch(err => {
    res.status(500).send({ error : err})
  })
}

exports.getPost = async function(req, res){ 
  const { post_id } = req.params;

  const client = new S3Client(clientParams);
  const command = new GetObjectCommand(getObjectParams);
  const url = await getSignedUrl(client, command, { expiresIn: 3600 });
  res.send(`Post with id : ${post_id}`)
}

exports.createPost = async function(req, res){ 
  console.log(req.body)
  const buffer = req.file.buffer;


  const params = { 
    Bucket : BUCKET_NAME,
    Key: randomImageName(),
    Body : buffer,
    ContentType : req.file.mimetype
  }

  const command = new PutObjectCommand(params)

  await s3.send(command)

  res.json({ error : null })
}

exports.archivePost = function(req, res){ 
  const { post_id } = req.params;
  res.send(`Archivating post with id : ${post_id}`)
}

exports.deleteArchivedPost = function(req, res){ 
  const { post_id } = req.params;
  res.send(`Deleting archivated post with id : ${post_id}`)
}