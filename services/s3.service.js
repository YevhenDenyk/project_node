const s3 = require("aws-sdk/clients/s3");
const path = require("path");
const uuid = require("uuid").v4;
const {S3_BUCKET_REGION, S3_ACCESS_KEY, S3_SECRET_KEY, S3_BUCKET_NAME, S3_BUCKET_URL} = require("../configs/config");

const s3Bucket = new s3({
    region: S3_BUCKET_REGION,
    accessKeyId: S3_ACCESS_KEY,
    secretAccessKey: S3_SECRET_KEY
})

async function uploadPublicFile(uploadFile, itemType, itemId) {
    return s3Bucket.upload({
        ContentType: uploadFile.mimetype,
        ACL: "public-read",
        Body: uploadFile.data,
        Bucket: S3_BUCKET_NAME,
        Key: buildFileName(uploadFile.name, itemType, itemId)
    }).promise()
}

async function updatePublicFile(uploadPath, updateFile) {
    return s3Bucket.putObject({
        ContentType: updateFile.mimetype,
        Bucket: S3_BUCKET_NAME,
        ACL: "public-read",
        Key: uploadPath.split(S3_BUCKET_URL).pop(),
        Body: updateFile.data,
    })
}

async function deletePublicFile(uploadPath) {
    return s3Bucket.deleteObject({
        Bucket: S3_BUCKET_NAME,
        Key: uploadPath.split(S3_BUCKET_URL).pop(),
    })
}

function buildFileName(fileName, itemType, itemId) {
    const extName = path.extname(fileName);
    return `${itemType}/${itemId}/${uuid()}${extName}`
}

module.exports = {
    uploadPublicFile,
    updatePublicFile,
    deletePublicFile,
}