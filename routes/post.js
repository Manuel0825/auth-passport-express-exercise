const express = require("express");
const router = express.Router();
const isAuthenticated = require("../middleware/isAuthenticated");

const prisma = require("../prisma");

router.get("/", async (req, res) => {
  const allPosts = await prisma.post.findMany({});

  res.render("posts", { title: "posts", posts: allPosts });
});


router.get("/profile-page", isAuthenticated, async (req, res) => {
  const allPosts = await prisma.post.findMany({
    where: {
      userId: req.user.id,
    },
  });
  console.log("All Posts:", allPosts);
  res.render("profile", { title: "posts", user: req.user, posts: allPosts });
});


router.get("/create", async (req, res) => {
  res.render("createForm", { title: "Create a post" });
});

router.post("/create", async (req, res) => {
  const { title, content} = req.body;
   await prisma.post.create({
    data: {
      title,
      content,
      userId: req.user.id,

    },
  });
  res.redirect("/profile-page");
});


router.get("/update/:id", async (req, res) => {
  const { postId } = req.params;
   const updateId = await prisma.post.findUnique({
    where: {
      postId,
    },
  });

  res.render("editForm", { title: updateId.title, post: updateId });
});

router.put("/update/:id", async (req, res) => {
  const { postId } = req.params;
    await prisma.post.update({
    where: {
      postId,
    },
    data: {
      ...req.body,
    },
  });
  res.redirect("/posts");
});

router.delete('/delete/:id', async(req, res) => {
  const {postId} = req.params;

  await prisma.post.delete({
      where: {
          id,
      },
  });
  res.redirect('/posts');
});


router.get('/:id', async (req, res) => {
  const { postId } = req.params;

  const findPost = await prisma.post.findUnique({
      where: {
          id,
      },
  });

  res.render('postID', { title: findPost.title, post: findPost})
});

 


module.exports = router;