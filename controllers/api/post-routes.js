const router = require('express').Router();
const {
    User,
    Post,
    Movie
} = require('../../models');
const withAuth = require('../../utils/auth');


// Get all posts
router.get("/", (req, res) => {
    Post.findAll({
            attributes: ["id", "content", "ranking", "created_at"],
            order: [
                ["created_at", "DESC"]
            ],
            include: [{
                    model: User,
                    attributes: ["username"],
                },
                {
                    model: Movie,
                    attributes: ['title', 'poster_path', 'release_date', 'original_language','created_at'],
                    include: {
                        model: User,
                        attributes: ["username"],
                    },
                },
            ],
        })
        .then((dbPostData) => res.json(dbPostData))
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
});

// Get a single post
router.get("/:id", (req, res) => {
    Post.findOne({
            where: {
                id: req.params.id,
            },
            attributes: ["id", "content", "ranking", "created_at"],
            include: [{
                    model: User,
                    attributes: ["username"],
                },
                {
                    model: Movie,
                    attributes: ['title', 'poster_path', 'release_date', 'original_language','created_at'],
                    include: {
                        model: User,
                        attributes: ["username"],
                    },
                },
            ],
        })
        .then((dbPostData) => {
            if (!dbPostData) {
                res.status(404).json({
                    message: "No post found with this id"
                });
                return;
            }
            res.json(dbPostData);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
});

// Create a post
router.post("/", withAuth, (req, res) => {
    console.log("creating");
    Post.create({
            ranking: req.body.ranking,
            content: req.body.post_content,
            user_id: req.session.user_id
        })
        .then((dbPostData) => res.json(dbPostData))
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });

});

// Update a post
router.put("/:id", withAuth, (req, res) => {
    Post.update({
            ranking: req.body.ranking,
            content: req.body.post_content,
        }, {
            where: {
                id: req.params.id,
            },
        })
        .then((dbPostData) => {
            if (!dbPostData) {
                res.status(404).json({
                    message: "No post found with this id"
                });
                return;
            }
            res.json(dbPostData);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
});

//Delete a post
router.delete("/:id", withAuth, (req, res) => {
    Post.destroy({
            where: {
                id: req.params.id,
            },
        })
        .then((dbPostData) => {
            if (!dbPostData) {
                res.status(404).json({
                    message: "No post found with this id"
                });
                return;
            }
            res.json(dbPostData);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
});


module.exports = router;

