(function main() {
	"use strict";

	window.addEventListener("load", (e) => {
		initImage();
		initEventListeners();
	});

	function initImage() {
		apiService.getLatestImage()
			.then(img => renderImage(img))
	}

	function renderImage(image) {
		// Rendering the image
		document.querySelector(".image-title").innerHTML = image.title;
		let authorStr;
		if (image._id < 0) {
			authorStr = image.author;
		} else {
			authorStr = `From ${image.author}`;
		}
		document.querySelector(".image-author").innerHTML = authorStr;
		document.querySelector(".image-file img").setAttribute("src", image.url);
		document.querySelector(".image-file img").setAttribute("id", image._id);
		renderImageComments(image);
	}

	function renderImageComments(image) {
		// let comments = image.comments;
		apiService.getComments(image._id)
			.then(commentsObj => {
				// Removing all existing comment elements
				document.querySelectorAll(".comment").forEach((comment) => {
					comment.parentNode.removeChild(comment);
				});

				commentsObj.comments.forEach(comment => {
					let commentAuthor = comment.author;
					let commentContent = comment.content;
					let commentDate = `${comment.date}`;

					let commentDiv = document.createElement("div");
					commentDiv.classList.add("comment");
					commentDiv.id = comment._id;
					commentDiv.innerHTML = `
                                   <div class="comment-author-info">
                                       <div class="comment-username">${commentAuthor}</div>
                                       <div class="comment-date">${commentDate}</div>
                                   </div>
                                   <div class="comment-text">${commentContent}</div>
                                   <div class="delete-icon"></div>
                                  `;
					document.querySelector(".comment-section").prepend(commentDiv);
					document.querySelector(".comment .delete-icon")
						.addEventListener("click", function (e) {
							apiService.deleteComment(comment._id)
								.then(img => {
									renderImage(img);
								});
						});

				})
			})
	}

	function initEventListeners() {

		/******************************************************************************
		 * COMMENT RELATED EVENTS ******************************************************
		 *******************************************************************************/
		let addCommentForm = document.querySelector(".add-comment-form");
		addCommentForm.addEventListener("submit", function (e) {
			e.preventDefault();

			let imgElementId = parseInt(document.querySelector(".image img").id);
			if (imgElementId < 0) {
				return;
			}

			let commentInfo = {
				author: addCommentForm.elements["author-name"].value,
				content: addCommentForm.elements["comment-content"].value
			};

			addCommentForm.reset();
			apiService.addComment(imgElementId, commentInfo.author, commentInfo.content)
				.then(img => renderImage(img));
		});

		let prevCommentPageBtn = document.querySelector(".previous-page");
		prevCommentPageBtn.addEventListener("click", function (e) {
			let imgElementId = parseInt(document.querySelector(".image img").id);
			apiService.decrementCommentPage(imgElementId);
			apiService.getImageWithId(imgElementId)
				.then(img => renderImage(img));
		});

		let nextCommentPageBtn = document.querySelector(".next-page");
		nextCommentPageBtn.addEventListener("click", function (e) {
			let imgElementId = parseInt(document.querySelector(".image img").id);
			apiService.incrementCommentPage(imgElementId);
			apiService.getImageWithId(imgElementId)
				.then(img => renderImage(img));
		});

		/******************************************************************************
		 * IMAGE RELATED EVENTS ********************************************************
		 *******************************************************************************/
		let previousImageBtn = document.querySelector(".previous-image");
		previousImageBtn.addEventListener("click", function (e) {
			let imgElementId = parseInt(document.querySelector(".image img").id);
			if (imgElementId < 0) {
				return;
			}
			apiService.decrementImageId(imgElementId)
				.then(img => {
					if (parseInt(img._id) !== imgElementId) {
						apiService.currPage = 0
					}
					renderImage(img)
				});
		});

		let nextImageBtn = document.querySelector(".next-image");
		nextImageBtn.addEventListener("click", function (e) {
			let imgElementId = parseInt(document.querySelector(".image img").id);
			if (imgElementId < 0) {
				return;
			}
			apiService.incrementImageId(imgElementId)
				.then(img => {
					if (parseInt(img._id) !== imgElementId) {
						apiService.currPage = 0
					}
					renderImage(img)
				});
		});

		let deleteImageBtn = document.querySelector(".image-interactions .trash-icon");
		deleteImageBtn.addEventListener("click", function (e) {
			let imgElementId = parseInt(document.querySelector(".image img").id);
			if (imgElementId < 0) {
				return;
			}
			apiService.deleteImage(imgElementId)
				.then(img => {
					if (parseInt(img._id) !== imgElementId) {
						apiService.currPage = 0
					}
					renderImage(img)
				});
		});

		let toggleSubmitBtn = document.querySelector("#toggle-form");
		toggleSubmitBtn.addEventListener("click", function (e) {
			let addImageForm = document.querySelector("#add-image-form-div");
			addImageForm.classList.toggle("hidden");
		});

		let addImageForm = document.querySelector("#add-image");
		addImageForm.addEventListener("submit", function (e) {
			e.preventDefault();

			const formData = new FormData();
			const uploadedImage = document.querySelector("#image-url-field");

			formData.append("uploadedImage", uploadedImage.files[0]);
			formData.append("author", addImageForm.elements["image-author"].value);
			formData.append("title", addImageForm.elements["image-title"].value);

			apiService.addImage(formData)
				.then(img => {
					addImageForm.reset();
					renderImage(img);
				});
		});

	}

})();
