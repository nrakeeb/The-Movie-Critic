const router = require('express').Router();
var _ = require('underscore');
const {
    User,
    Post,
    Movie
} = require('../../models');
const withAuth = require('../../utils/auth');


//Get all movie
router.get("/", (req, res) => {
    Movie.findAll()
        .then((dbMovieData) => res.json(dbMovieData))
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
});

//Create a Movie
router.post('/', withAuth, (req, res) => {
    console.log("START");
    //if statement imdb is not in database 

    Movie.findOrCreate({where: {
        title: req.body.title,
        imdb_id: req.body.imdb_id,
        image_url: req.body.image_url
    }})
        .then(([dbMovieData, created]) => res.json(dbMovieData))
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });

});

module.exports = router;