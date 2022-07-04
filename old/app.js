const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");

const app = express();
app.use(bodyParser.json());

const multer = require("multer");
const path = require("path");
const upload = multer({ dest: path.join(__dirname, 'uploads') });

const Datastore = require("nedb");
const images = new Datastore({
	filename: 'db/images.db',
	autoload: true,
	timestampData: true
});

const comments = new Datastore({
	filename:'db/comments.db',
	autoload: true,
	timestampData: true
});

const noPicturesYet = {
	url: "media/no-pictures.png",
	author: "",
	title: "Upload your first image below!",
	comments: [],
	_id: -1
}

// ROUTES=====================================================
app.post("/api/images", upload.single("uploadedImage"), addImageRequest);
app.get("/api/images/:imageId", getImageRequest);
app.get("/api/images/:imageId/file", getImageFileRequest);
app.delete("/api/images/:imageId", deleteImageRequest);

app.post("/api/comments", addCommentRequest);
app.get("/api/comments/:imageId", getCommentsRequest);
app.delete("/api/comments/:commentId", deleteCommentRequest);

// REQUEST HANDLERS===========================================
/**
 * Endpoint: /api/images/:imageId
 * Possible query:
 * ?latest=true
 * ?next=true
 * ?prev=true
 */
function getImageRequest(req, res, next) {
	const latest = (req.query.latest  === "true");
	if (latest) {
		sendLatest(req, res);
		return;
	}

	const imageId = parseInt(req.params.imageId);

	// Only one of nextQuery or prevQuery must be true
	const nextQuery = (req.query.next === "true");
	const prevQuery = (req.query.prev === "true");
	if (nextQuery) {
		images.find({ _id: { $gt: imageId } }, {})
			.sort({ _id: 1 })
			.exec((err, greaterDocs) => {
				if (err) {
					res.status(500).end("Something went wrong while getting image");
				}

				if (greaterDocs.length !== 0) {
					res.status(200).json(greaterDocs[0]);
				} // Else do nothing because there are no images that are next
			})
	} else if (prevQuery) {
		images.find({ _id: { $lt: imageId } }, {})
			.sort({ _id: 1 })
			.exec((err, smallerDocs) => {
				if (err) {
					res.status(500).end("Something went wrong while getting image");
				}

				if (smallerDocs.length !== 0) {
					res.status(200).json(smallerDocs[smallerDocs.length - 1]);
				} // Else do nothing because there are no images that are before it
			})
	} else {

		// In the case where prevQuery and nextQuery are false, then the image with
		// id of imageId is retrieved; i.e. the same image is retrieved

		images.findOne({_id: imageId}, {}, (err, doc) => {
			if (err) {
				res.status(500).end("Something went wrong while adding image");
			}
			res.status(200).json(doc);
		});
	}
}

/**
 * Endpoint: /api/images/:imageId/file
 */
function getImageFileRequest(req, res, next) {
	const imageId = parseInt(req.params.imageId);
	images.findOne({ _id: imageId }, { }, (err, doc) => {
		if (err) {
			res.status(500).end("Something went wrong while adding image");
		}
		res.setHeader("Content-Type", doc.file.mimetype);
		res.status(200).sendFile(doc.file.path);
	});
}

/**
 * Endpoint: /api/images
 */
function addImageRequest(req, res, next) {
	const imgObj = {
		author: req.body.author,
		title: req.body.title,
		date: new Date(),
		file: req.file,
	}

	images.find({ }, { })
		.sort({ _id: -1 })  // sort in descending order
		.exec((err, docs) => {
			if (err) {
				res.status(500).end("Something went wrong while adding image");
			}

			if (docs.length === 0) {
				imgObj._id = 0;
			} else {
				imgObj._id = docs[0]._id + 1;
			}

			imgObj.url = `http://localhost:3000/api/images/${imgObj._id}/file`

			images.insert(imgObj, (err, newDoc) => {
				if (err) {
					res.status(500).end("Something went wrong while adding image");
				}
				res.status(200).json(newDoc);
			})

		});
}

/**
 * Endpoint: /api/images/:imageId
 */
function deleteImageRequest(req, res, next) {
const imageId = parseInt(req.params.imageId);

images.findOne({ _id: imageId }, { }, (err, doc) => {
	if (err) {
		res.status(500).end("Something went wrong while deleting image");
	}
	if (doc === null) {
		sendLatest(req, res);
		return;
	}

	fs.unlink(doc.file.path, (err) => {
		if (err) {
			res.status(500).end("Something went wrong while deleting image");
		}
	})
});

images.remove({ _id: imageId }, (err, numRemoved) => {
	if (err) {
		res.status(500).end("Something went wrong while deleting image");
	}

	images.find({ _id: { $gt: imageId } }, { })
		.sort({ _id: 1 })
		.exec((err, greaterDocs) => {
			if (err) {
				res.status(500).end("Something went wrong while deleting image");
			}

			if (greaterDocs.length === 0) {
				images.find({ _id: { $lt: imageId } }, { })
					.sort({ _id: 1 })
					.exec((err, smallerDocs) => {
						if (err) {
							res.status(500).end("Something went wrong while deleting image");
						}

						if (smallerDocs.length === 0) {
							res.status(200).json(noPicturesYet);
						} else {
							res.status(200).json(smallerDocs[smallerDocs.length - 1]);
						}
					})
			} else {
				res.status(200).json(greaterDocs[0]);
			}
		})
})


}

/**
 * Endpoint: /api/comments
 */
function addCommentRequest(req, res, next) {
	const commentObj = {
		imageId: parseInt(req.body.imageId),
		author: req.body.author,
		content: req.body.content,
		date: new Date()
	};

	comments.find({ }, { })
		.sort({ _id: -1 })
		.exec((err, docs) => {
			if (err) {
				res.status(500).end("Something went wrong while adding image");
			}

			if (docs.length === 0) {
				commentObj._id = 0;
			} else {
				commentObj._id = docs[0]._id + 1;
			}

			comments.insert(commentObj, (err, newDoc) => {
				if (err) {
					res.status(500).end("Something went wrong while adding image");
				}

				images.findOne({ _id: commentObj.imageId }, { }, (err, imgDoc) => {
					if (err) {
						res.status(500).end("Something went wrong while adding comment");
					}

					if (imgDoc === null) {
						res.status(404).end(`Image with ID ${commentObj.imageId} does not exist`)
					}

					res.status(200).json(imgDoc);
				});
			})

		});
}

/**
 * Endpoint: /api/comments/:imageId
 * possible query args:
 * 		- ?page=0
 */
function getCommentsRequest(req, res, next) {
	const imageId = parseInt(req.params.imageId);
	const page = parseInt(req.query.page);

	if (imageId < 0) {
		res.status(200).json({
			comments: [],
			page: 0,
			totalComments: 0
		})
		return;
	}

	comments.find({ imageId: imageId}, {})
		.sort({ _id: -1 })
		.exec((err, allImageCommentDocs) => {
			if (err) {
				res.status(500).end("Something went wrong while getting image comments");
			}

			comments.find({ imageId: imageId }, {})
				.sort({ _id: -1 })
				.skip(page * 10)
				.limit(10)
				.exec((err, filteredCommentDocs) => {
					if (err) {
						res.status(500).end("Something went wrong while getting image comments");
					}

					res.status(200).json({
						comments: filteredCommentDocs.reverse(),
						page: page,
						totalComments: allImageCommentDocs.length
					});
				});

		});

}

/**
 * Endpoint: /api/comments/:commentId
 */
function deleteCommentRequest(req, res, next) {
	const commentId = parseInt(req.params.commentId);

	comments.findOne({ _id: commentId }, { }, (err, doc) => {
		if (err) {
			res.status(500).end("Something went wrong while deleting comment");
		}

		if (doc === null) {
			res.status(404).end(`Comment with ID ${commentId} does not exist`);
		}
		const imageId = doc.imageId;
		comments.remove({ _id: commentId }, (err, numRemoved) => {
			if (err) {
				res.status(500).end("Something went wrong while deleting comment");
			}

			images.findOne({ _id: imageId }, { }, (err, doc) => {
				if (err) {
					res.status(500).end("Something went wrong while deleting comment");
				}

				if (doc === null) {
					res.status(404).end(`Image with ID ${imageId} does not exist`);
				}
				res.status(200).json(doc);
			});

		})


	})
}

// HELPERS====================================================
function sendLatest(req, res) {
	images.find({ }, { })
		.sort({ _id: -1 })
		.exec((err, docs) => {
			if (docs.length === 0) {
				if (err) {
					res.status(500).end("Internal server error");
				}
				res.status(200).json(noPicturesYet);
			} else {
				res.status(200).json(docs[0]);
			}
		});
}

// SERVER=====================================================
app.use(function (req, res, next) {
	console.log("HTTP request", req.method, req.url, req.body);
	next();
});

app.use(express.static('static'));

const http = require('http');
const port = 3000;

http.createServer(app).listen(port,() => {
	console.log(`Server started on port ${port} @ http://localhost:${port}/`);
})