# Images

**Prerequisites:**
* Read the authentication documentation before this section

## Uploading/Creating an Image
* Must be authenticated
* HTML Form:
  * ``enctype="multipart/form-data"``
  * Must have ``name="uploadedImage"`` for file type input
* ``POST``
* Route: ``/api/images``

## Deleting an Image
* Must be authenticated
* Image being deleted must belong to the currently authenticated user
* ``DELETE``
* Route: ``/api/images/:imageId``