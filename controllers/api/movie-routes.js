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
    console.log("START")
    var body = _.pick(req.body, 'title', 'poster_path', 'release_date', 'original_language');
    console.log("HERE", body)
    if (req.session) {
        Movie.create(body)
            .then(dbMovieData => res.json(dbMovieData))
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    }
});


module.exports = router;