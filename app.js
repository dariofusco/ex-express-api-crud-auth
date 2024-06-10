const express = require("express");
const app = express();
app.use(express.json());

const notFound = require("./middlewares/notFound.js");

const { PORT } = process.env;
const port = PORT || 3000;

require("dotenv").config();

const postsRouter = require("./routers/posts.js");
const categoriesRouter = require("./routers/categories.js");
const tagsRouter = require("./routers/tags.js");

app.use('/posts', postsRouter);

app.use('/categories', categoriesRouter);

app.use('/tags', tagsRouter);

app.use(notFound);


app.listen(port, () => {
    console.log(`Server attivo su http://localhost:${port}`);
});