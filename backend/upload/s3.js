const { S3Client } = require("@aws-sdk/client-s3")

const {
  AWS_BUCKET_REGION,
  AWS_ACCESS_KEY_ID,
  AWS_SECRET_ACCESS_KEY
} = process.env;

const s3 = new S3Client({ 
  region: AWS_BUCKET_REGION,
  credentials : { 
    accessKeyId : AWS_ACCESS_KEY_ID,
    secretAccessKey : AWS_SECRET_ACCESS_KEY
  }
})

module.exports = s3;