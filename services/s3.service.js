const S3 = require('aws-sdk/clients/s3')
const path = require('path');
const uuid = require('uuid').v1;

const {S3_BUCKET_REGION, S3_ACCESS_KEY, S3_SECRET_KEY, S3_BUCKET_NAME, S3_BUCKET_URL} = require("../configs/config");

const s3Bucket = new S3({
    region: S3_BUCKET_REGION,
    accessKeyId: S3_ACCESS_KEY,
    secretAccessKey: S3_SECRET_KEY
})

async function uploadPublicFile(fileToUpload, itemType, itemId) {
    return s3Bucket.upload({
        ContentType: fileToUpload.mimetype,
        ACL: "public-read",
        Body: fileToUpload.data,
        Bucket: S3_BUCKET_NAME,
        Key: buildFileName(fileToUpload.name, itemType, itemId)
    }).promise()
}

async function updatePublicFile(uploadPath, fileToUpload) {

    return s3Bucket.putObject({
        ContentType: fileToUpload.mimetype,
        Bucket: S3_BUCKET_NAME,
        ACL: "public-read",
        Key: uploadPath.split(S3_BUCKET_URL).pop(),
        Body: fileToUpload.data,
    }).promise()
}

async function deletePublicFile(uploadPath) {
    return s3Bucket.deleteObject({
        Bucket: S3_BUCKET_NAME,
        Key: uploadPath.split(S3_BUCKET_URL).pop(),
    }).promise()
}

function buildFileName(fileName, itemType, itemId) {
    const ext = path.extname(fileName); // image.jpg => .jpg

    // return `${itemType}/${itemId}/${Date.now()}${ext}`  // використання дати для генерування ім'я
    return `${itemType}/${itemId}/${uuid()}${ext}`
}

module.exports = {
    uploadPublicFile,
    deletePublicFile,
    updatePublicFile,
}