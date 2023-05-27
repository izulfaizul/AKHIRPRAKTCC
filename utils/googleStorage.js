const { Storage } = require("@google-cloud/storage");
const storage = new Storage({
  projectId: "projectakhir-388012",
  keyFilename: "./credentials.json",
});
const bucket = storage.bucket("izulfahmi-bucket");

async function uploadToStorage(req, res, next) {
  if (!req.file) next();

  const image = req.file;
  const blob = bucket.file("image-"+  Date.now() + "-" + image.originalname);
  const blobStream = blob.createWriteStream({
    resumable: false,
  });

  blobStream.on("error", (err) => {
    next(err);
  });

  blobStream.on("finish", () => {
    // Set the public URL for the image
    const publicUrl = `https://storage.googleapis.com/${bucket.name}/${blob.name}`;
    req.file.publicUrl = publicUrl;
    next();
  });

  blobStream.end(image.buffer);
}

module.exports = uploadToStorage;