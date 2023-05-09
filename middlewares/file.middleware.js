const ApiError = require("../errors/ApiError");
const {MAX_IMAGE_SIZE, IMAGE_MIMETYPE} = require("../enums/fileUpload.enum");

module.exports = {

    checkUploadImage: async (req, res, next) => {
        try {
            if (!req.files) {
                throw new ApiError("No files to upload", 400)
            }

            const imageToUpload = Object.values(req.files)

            for (const image of imageToUpload) {
                const {size, name, mimetype} = image

                if (size > MAX_IMAGE_SIZE) {
                    throw new ApiError(` Image ${name} has big size `, 400)
                }
                if (!IMAGE_MIMETYPE.includes(mimetype)) {
                    throw new ApiError(`File ${name} has invalid format`, 400)
                }
            }

            next();
        } catch (e) {
            next(e);
        }
    },

}
