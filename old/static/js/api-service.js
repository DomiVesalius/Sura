let apiService = (function () {
	"use strict";

	let module = {};
	module.currPage = 0;
	module.localStorageKey = "images";

	if (!localStorage.getItem(module.localStorageKey)) {
		localStorage.setItem(module.localStorageKey,
			JSON.stringify({commentNext: 0, imageNext: 0, currentImageId: -1, items: []}));
	}

	/*  ******* Data types *******
		image objects must have at least the following attributes:
				- (number) imageId
				- (String) title
				- (String) author
				- (String) url
				- (Date) date

		comment objects must have the following attributes
				- (number) commentId
				- (String) imageId
				- (String) author
				- (String) content
				- (Date) date
	*/

	// add an image to the gallery
	module.addImage = function (formData) {
		const config = {
			method: "POST",
			body: formData,
		};
		module.currPage = 0;
		return fetch("http://localhost:3000/api/images", config)
			.then(res => res.json())
	};

	// delete an image from the gallery given its imageId
	module.deleteImage = function (imageId) {
		module.currPage = 0;
		const config = {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json"
			}
		}
		return fetch(`http://localhost:3000/api/images/${imageId}`, config)
			.then(res => res.json());
	};

	// add a comment to an image
	module.addComment = function (imageId, author, content) {
		const config = {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				imageId: imageId,
				author: author,
				content: content
			})
		}

		return fetch("http://localhost:3000/api/comments", config)
			.then(res => res.json());
	};

	// delete a comment to an image
	module.deleteComment = function (commentId) {
		const config = {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json"
			}
		}
		return fetch(`http://localhost:3000/api/comments/${commentId}`, config)
			.then(res => res.json());

	};

	module.incrementCommentPage = function (imageId) {
		module.getComments(imageId)
			.then(commentObj => {
				if ((module.currPage + 1) * 10 <= commentObj.totalComments) {
					module.currPage += 1
				}
			})
	};

	module.decrementCommentPage = function (imageId) {
		if (module.currPage - 1 >= 0) {
			module.currPage -= 1;
		}
	};

	module.incrementImageId = function (imageId) {
		const config = {
			method: "GET",
			headers: {
				"Content-Type": "application/json"
			}
		};
		return fetch(`http://localhost:3000/api/images/${imageId}?next=true`, config)
			.then(res => res.json());
	};

	module.decrementImageId = function (imageId) {
		const config = {
			method: "GET",
			headers: {
				"Content-Type": "application/json"
			}
		};
		return fetch(`http://localhost:3000/api/images/${imageId}?prev=true`, config)
			.then(res => res.json());
	};

	module.getComments = function(imageId) {
		const config = {
			method: "GET",
			headers: {
				"Content-Type": "application/json"
			}
		}
		return fetch(`http://localhost:3000/api/comments/${imageId}?page=${module.currPage}`, config)
			.then(res => res.json());
	};

	module.getImages = function () {
		let images = JSON.parse(localStorage.getItem(module.localStorageKey));
		return images.items;
	};

	module.getImageWithId = function (imageId) {
		const config = {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json'
			}
		}
		return fetch(`http://localhost:3000/api/images/${imageId}`, config)
			.then(res => res.json());
		// let images = module.getImages();
		// return images.filter(image => image.imageId === imageId)[0];
	};

	module.getCurrentImageId = function () {
		let images = JSON.parse(localStorage.getItem(module.localStorageKey));
		return images.currentImageId;
	};

	module.getAllIds = function () {
		let images = JSON.parse(localStorage.getItem(module.localStorageKey));

		let allIds = [];

		images.items.forEach((img) => {
			allIds.unshift(img.imageId);
		});

		allIds.sort();

		return allIds;
	};

	module.getLatestImage = function () {
		return fetch("http://localhost:3000/api/images/-1?latest=true", { method: "GET"})
			.then(res => res.json());
	}

	return module;
})();