const { PutObjectCommand } = require("@aws-sdk/client-s3");
const s3 = require("../upload/s3")

const { updateProfilePicture, updateThemePicture } = require("../mysql/functions/users")

exports.uploadImage = async function(req, res){ 
  const { location, type , user_id } = req.query;
  const buffer = req.file.buffer;

  const mimeType = req.file.mimetype;
  const match = mimeType.match(/\/(.+)$/);
  const extension = match ? match[1] : null;

  const params = { 
    Bucket : process.env.AWS_BUCKET_NAME,
    // Key: randomImageName(),
    Key : `${location}/${Date.now()}.${extension}`,
    Body : buffer,
    ContentType : req.file.mimetype
  }

  try {
    const command = new PutObjectCommand(params)

    await s3.send(command) 
    const fileURL = `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_BUCKET_REGION}.amazonaws.com/${params.Key}`

    if(type === "post"){ 
      console.log("Post")
      return res.json({ fileURL, extension })
    }
    else if(type === "article"){ 
      console.log("article")
      return res.json({ fileURL , extension})
    }
    else if(type === "profile-picture"){ 
      console.log("Profile-picture")
      console.log(req.file)
      await updateProfilePicture(fileURL, user_id)
    }
    else if(type === "theme-picture"){ 
      console.log("Theme-picture")
      await updateThemePicture(fileURL, user_id)
    }
    
    return res.send({ imageURL : fileURL})
  }catch(err){ 
    if(err){ 
      console.log(err)
      return res.sendStatus(501) 
    }
  }

  res.send("success")
}