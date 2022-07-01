const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const helmet = require("helmet");
const app = express();

app.use(express.json());
app.use(morgan("dev"));
app.use(cors());
app.use(helmet());

const user = require("./server/routes/user.routes");
const photos = require("./server/routes/photos.routes");
const photos_comments = require("./server/routes/photos_comments.routes");

app.use("/v1/users",user);
app.use("/v1/photos",photos);
app.use("/v1/comments",photos_comments);

app.get("/peng", (req, res) => {
    res.json([]);
});

module.exports = app;