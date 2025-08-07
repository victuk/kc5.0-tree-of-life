const {v4} = require("uuid");
require("dotenv").config();
const {
    S3Client,
    PutObjectCommand
} = require("@aws-sdk/client-s3");
const {readFile} = require("node:fs/promises");
// const fileUpload = require("./multerConfig");

const S3 = new S3Client({
  region: "auto",
  endpoint: "https://t3.storage.dev",
//   s3ForcePathStyle: false,
});

const uploadFile = async (file) => {
    try {
        
        const fileName = v4() + "." + file.mimetype.split("/")[1];
    
        const command = new PutObjectCommand({
            Bucket: "fun-bucket",
            Key: fileName,
            Body: await readFile(file.path)
        });
    
        const response = await S3.send(command);
    
        if(response.$metadata.httpStatusCode == 200) {
            const fileUploaded = `https://fun-bucket.t3.storage.dev/${fileName}`
        
            return {error: null, fileUploaded};
        } else {
            return {error: "Failed to upload", fileUploaded: null};
        }
    } catch (error) {
        return {
            error,
            fileUploaded: null
        }
    }


}

module.exports = uploadFile;
