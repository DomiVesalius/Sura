# Comments

**Prerequisites**
* Read authentication and images documentation before this section

## Commenting on an Image
* Must be authenticated
  * Any authenticated user can comment on any image
* ``POST``
* Route: ``/api/images/:imageId/comments``
* * Response: The image object that was commented on or an error message

## Deleting a Comment
* Must be authenticated
  * Users can delete their own comments
  * Users that post an image can delete any comment under it
* ``POST``
* Route: ``/api/images/:imageId/comments/:commentId``
* Response: An error message or a confirmation that the comment was deleted
  * In the form of: ``{"message": "<Insert Message Here/>"}``

## Getting a list of comments for a specific image
* Must be authenticated
* Response: A list of the most recent comments (default of 10)
* In the form of:
```json
{
  "items": [
    {
      "_id": "62cf2f224da6934205f137ef",
      "author": "Domi",
      "content": "Comment 11",
      "imageId": "62cf2ee74da6934205f137c1",
      "createdAt": "2022-07-13T20:46:26.103Z",
      "updatedAt": "2022-07-13T20:46:26.103Z",
      "__v": 0
    }
  ],
  "nextItemDate": "2022-07-13T20:46:26.103Z"
}
```
* This uses cursor-based pagination
* ``nextItemDate`` can be used as a query argument to get the next list of comments
* Query Parameters:
  * ``limit``: The maximum length of the number of comments
    * If not provided, the default is 10
  * ``nextItemDate``: A timestamp. The response will contain only items that were created before this timestamp
    * Allows for cursor-based pagination
* Example call:
  * ``/api/images/62cf2ee74da6934205f137c1/comments?limit=5&nextItemDate=2022-07-13T20:46:28.469Z``