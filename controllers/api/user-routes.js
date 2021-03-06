const router = require("express").Router();
const {User, Movie, UserRating, Favorite, WatchedMovie, WatchNext} = require("../../models");
const { route } = require("./movie-routes");
const withAuth = require("../../utils/auth");
const {generateCode, verifyEmail} = require("../../utils/emailCheck");

// GET /api/users
router.get("/", (req, res) => {
    User.findAll({
        attributes: {exclude: ["password"]}
    })
        .then(dbUserData => res.json(dbUserData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// GET /api/users/id
router.get("/:id", (req, res) => {
    User.findOne({
        where: {id: req.params.id},
        include: [
            {
                model: Movie,
                attributes: ["title"],
                through: UserRating,
                as: "user_ratings"
            },
            {
                model: Movie,
                attributes: ["title"],
                through: Favorite,
                as: "favorites"
            },
            {
                model: Movie,
                attributes: ["title"],
                through: WatchedMovie,
                as: "watched_movies"
            },
            {
                model: Movie,
                attributes: ["title"],
                through: WatchNext,
                as: "watch_nexts"
            }
        ]
    })
        .then(dbUserData => {
            if(!dbUserData) {
                res.status(404).json({message: "No user found with this id"});
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// POST /api/users 
router.post("/", (req, res) => {
    const code = generateCode();
    User.create({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        isVerified: false,
        verificationCode: code
    })
        .then(dbUserData => {
            // Send email to verify the user
            verifyEmail(req.body.email, code);
            req.session.save(() => {
                req.session.user_id = dbUserData.id;
                req.session.username = dbUserData.username;
                req.session.loggedIn = true;

                res.json(dbUserData);
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// POST /api/users/login
router.post("/login", (req, res) => {
    User.findOne({
        where: {email: req.body.email}
    })
        .then(dbUserData => {
            // If email doesn't exist, no need to decrypt and check password
            if(!dbUserData) {
                res.status(400).json({message: "No user with that email address"});
                return;
            }

            // Check given password matches password in database for given email
            const validPassword = dbUserData.checkPassword(req.body.password);
            if(!validPassword) {
                res.status(400).json({message: "Sorry, that is an incorrect password"});
                return;
            }

            // Check if the email is verified
            if(!dbUserData.isVerified) {
                if(req.body.verificationCode) {
                    if(req.body.verificationCode === dbUserData.verificationCode) {
                        // Change isVerified to true
                        User.update({isVerified: true}, {
                            where: {id: dbUserData.dataValues.id}
                        });
                    }
                    else {
                        res.status(400).json({message: "The verification code is incorrect"});
                        return;
                    }
                }
                else {
                    res.status(400).json({message: "You must first verify your email"});
                    return;
                }
            }

            // Validate session is active
            req.session.save(() => {
                // declare session variables
                req.session.user_id = dbUserData.id;
                req.session.username = dbUserData.username;
                req.session.loggedIn = true;

                res.json({ user: dbUserData, message: 'You are now logged in!' });
            });
        });
});

// POST for logout at /api/users/logout
router.post("/logout", withAuth, (req, res) => {
    if(req.session.loggedIn) {
        req.session.destroy(() => {
            res.status(204).end();
        });
    }
    else {
        res.status(404).end();
    }
});

// PUT /api/users/favorite
router.put("/favorite", withAuth, async (req, res) => {
    try {
        const checkAdded = await Favorite.findOne({
            where: {
                user_id: req.session.user_id,
                movie_id: req.body.movie_id
            }
        })
        if (checkAdded) {
            res.json({message: 'Already added!'})
        }
        else {
            const dbUserData = await Favorite.create({
            user_id: req.session.user_id,
            movie_id: req.body.movie_id
        });
        res.json(dbUserData);
        }
    }
    catch(err) {
        console.log(err);
        res.status(500).json(err);
    }
});
// DELETE /api/users/favorite
router.delete("/favorite", withAuth, async (req, res) => {
    try {
        await Favorite.destroy({
            where: {
                user_id: req.session.user_id,
                movie_id: req.body.movie_id
            }
        })
        res.json({message: "Favorite removed!"})
    }
    catch(err) {
        console.log(err);
        res.status(500).json(err);
    }
});
// PUT /api/users/watched-movies
router.put("/watched-movies", withAuth, (req, res) => {
    WatchedMovie.create({
        user_id: req.session.user_id,
        movie_id: req.body.movie_id
    })
        .then(dbUserData => res.json(dbUserData))
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
});

// PUT /api/users/watch-next
router.put("/watch-next", withAuth, async (req, res) => {
    try {
        const checkAdded = await WatchNext.findOne({
            where: {
                user_id: req.session.user_id,
                movie_id: req.body.movie_id
            }
        })
        if (checkAdded) {
            res.json({message: 'Already added!'})
        }
        else {
            const dbUserData = await WatchNext.create({
            user_id: req.session.user_id,
            movie_id: req.body.movie_id
            });
        res.json(dbUserData);
        }
    }
    catch(err) {
        console.log(err);
        res.status(500).json(err);
    }
});
// DELETE /api/users/watch-next
router.delete("/watch-next", withAuth, async (req, res) => {
    try {
        await WatchNext.destroy({
            where: {
                user_id: req.session.user_id,
                movie_id: req.body.movie_id
            }
        })
        // once they've watched it, remove the WatchNext entry and create a Watched entry.
        // It's possible for a user to re-add a watched movie back to their watchlist and re-mark it as watched;
        // this would cause multiple WatchedMovie entries, but that's ok, recording how many times they've watched it is potentially
        // useful data; if we were displaying a watched list, it could say "you watched this 4 times!", etc
        const watched = WatchedMovie.create({
            user_id: req.session.user_id,
            movie_id: req.body.movie_id
        })
        res.json(watched)
    }
    catch(err) {
        console.log(err);
        res.status(500).json(err);
    }
})

// PUT /api/users/id
router.put("/:id", withAuth, (req, res) => {
    // expects {username: 'bob', email: 'bob@gmail.com', password: 'password1234'}

    // if req.body has exact key/value pairs to match the model, you can just use `req.body` instead
    User.update(req.body, {
        where: {id: req.params.id},
        individualHooks: true
    })
        .then(dbUserData => {
            if(!dbUserData[0]) {
                res.status(404).json({message: "No user found with this ID"});
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({err});
        });
});

// DELETE /api/users/id
router.delete("/:id", withAuth, (req, res) => {
    User.destroy({
        where: {
            id: req.params.id
        }
    })
        .then(dbUserData => {
            if(!dbUserData) {
                res.status(404).json({message: "No user found with this ID"});
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({err});
        });
});

module.exports = router;