const s3 = require("aws-sdk/clients/s3");
const path = require("path");
const uuid = require("uuid").v4;
const {S3_BUCKET_REGION, S3_ACCESS_KEY, S3_SECRET_KEY, S3_BUCKET_NAME} = require("../configs/config");

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

function buildFileName(fileName, itemType, itemId) {
    const extName = path.extname(fileName);
    return `${itemType}/${itemId}/${uuid()}${extName}`
}

module.exports = {
    uploadPublicFile
}