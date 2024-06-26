const express = require("express");
const app = express();
app.use(express.json());
const cors = require("cors");

const error = require("./middlewares/error.js");
const notFound = require("./middlewares/notFound.js");

const { PORT } = process.env;
const port = PORT || 3000;

require("dotenv").config();

const postsRouter = require("./routers/posts.js");
const categoriesRouter = require("./routers/categories.js");
const tagsRouter = require("./routers/tags.js");
const authRouter = require("./routers/auth.js");

app.use(cors());

app.use('/auth', authRouter);

app.use('/posts', postsRouter);

app.use('/categories', categoriesRouter);

app.use('/tags', tagsRouter);

app.use(notFound);

app.use(error);

app.listen(port, () => {
    console.log(`Server attivo su http://localhost:${port}`);
});