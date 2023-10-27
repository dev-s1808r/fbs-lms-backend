const Router = require("express").Router();
const multer = require("multer");
const { isLoggedInAsAdmin } = require("../services/authServices");

const {
	getAllUsers,
	getUserById,
	deleteUserById,
	toggleContentAccess,
	countUsersByAccess,
	createNewPlaylist,
	getAllPlaylists,
	getAllMedia,
	uploadMedia,
	addPlaylist,
	uploadMediaToCloud,
} = require("../controllers/adminController");

const storage = multer.memoryStorage();

const upload = multer({
	storage,
});

Router.get("/get-all-users", isLoggedInAsAdmin, getAllUsers);

Router.get("/get-user-by-id", isLoggedInAsAdmin, getUserById);

Router.get("/delete-user-by-id", isLoggedInAsAdmin, deleteUserById);

Router.patch("/toggle-content-access", isLoggedInAsAdmin, toggleContentAccess);

Router.get(
	"/get-active-inactive-user-number",
	isLoggedInAsAdmin,
	countUsersByAccess
);

Router.patch("/add-new-playlist-on-user", isLoggedInAsAdmin, addPlaylist);

Router.post("/add-new-playlist", isLoggedInAsAdmin, createNewPlaylist);

Router.get("/get-all-playlists", getAllPlaylists);

Router.post(
	"/upload-media-to-cloud",
	upload.fields([{ name: "thumbnail" }, { name: "mediaFile" }]),
	isLoggedInAsAdmin,
	uploadMediaToCloud
);

Router.get("/get-all-media", isLoggedInAsAdmin, getAllMedia);

module.exports = Router;

// route to upload media locally
// Router.post(
// 	"/upload-media",
// 	upload.fields([{ name: "thumbnail" }, { name: "mediaFile" }]),
// 	isLoggedInAsAdmin,
// 	uploadMedia
// );

// route to upload media to cloud

// Router.post("/add-new-playlist", createNewPlaylist);

// const storage = multer.diskStorage({
// 	destination: function (req, file, cb) {
// 		return cb(null, "./upload/media");
// 	},
// 	filename: function (req, file, cb) {
// 		return cb(null, `${Date.now()}_${file.originalname}`);
// 	},
// });

// const upload = multer({
// 	storage: multerS3({
// 		s3: s3,
// 		bucket: "fbslmscn",
// 		acl: "public-read",
// 		key: function (request, file, cb) {
// 			console.log(file);
// 			cb(null, file.originalname);
// 		},
// 	}),
// }).array("upload", 1);

// const upload = multer({ storage: storage });
