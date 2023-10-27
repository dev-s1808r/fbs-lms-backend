const fs = require("fs");
const S3 = require("aws-sdk/clients/s3");
const AWS = require("aws-sdk");
const path = require("path");

const bucketName = process.env.BUCKET_NAME;
const region = process.env.BUCKET_REGION;
const accessKeyId = process.env.AWS_ACCESS_KEY;
const secretAccessKey = process.env.AWS_SECRET_KEY;

exports.s3service = async (file, folderName) => {
	const spacesEndpoint = new AWS.Endpoint(
		`blr1.digitaloceanspaces.com/${folderName}`
	);
	const s3 = new AWS.S3({
		endpoint: spacesEndpoint,
		accessKeyId: process.env.SPACES_KEY,
		secretAccessKey: process.env.SPACES_SECRET,
	});

	const param = {
		Bucket: process.env.BUCKET_NAME,
		Key: Date.now() + path.extname(file.originalname),
		Body: file.buffer,
		ACL: "public-read",
	};

	const result = await s3.upload(param).promise();
	return result;
};

const s3_old = new S3({
	region,
	accessKeyId,
	secretAccessKey,
});

// uploads a file to s3
function uploadFile(file) {
	const fileStream = fs.createReadStream(file.path);

	const uploadParams = {
		Bucket: bucketName,
		Body: fileStream,
		Key: file.filename,
	};

	return s3.upload(uploadParams).promise();
}
exports.uploadFile = uploadFile;

// downloads a file from s3
function getFileStream(fileKey) {
	const downloadParams = {
		Key: fileKey,
		Bucket: bucketName,
	};

	return s3.getObject(downloadParams).createReadStream();
}
exports.getFileStream = getFileStream;
