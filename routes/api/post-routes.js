// express package is what allows us to create the routes
const router = require('express').Router();
const { Post, User } = require('../../models');

// get all users
router.get('/', (req, res) => {
    Post.findAll({
        // Query configuration
        attributes: ['id', 'post_url', 'title', 'created_at'],
        include: [
            {
                model: User,
                attributes: ['username']
            }
        ]
    })
        .then(dbPostdata => res.json(dbPostdata))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});


// get one query
router.get('/:id', (req, res) => {
    Post.findOne({
        where: {
            id: req.params.id
        },
        attributes: ['id', 'post_url', 'title', 'created_at'],
        // adding in the order property to the findAll query
        order: [['created_at', 'DESC']],
        include: [
            {
                model: User,
                attributes: ['username']
            }
        ]
    })
        .then(dbPostdata => {
            if (!dbPostdata) {
                res.status(404).json({ message: 'No post found with this id' })
                return;
            }
            res.json(dbPostdata);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// route to create a post
router.post('/', (req, res) => {
    // expects {title: 'Taskmaster goes public!', post_url: 'https://taskmaster.com/press', user_id: 1}
    Post.create({
        title: req.body.title,
        post_url: req.body.post_url,
        user_id: req.body.user_id
    })
        .then(dbPostdata => res.json(dbPostdata))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// update title of post
router.put('/:id', (req, res) => {
    Post.update(
        {
            title: req.body.title
        },
        {
            where: {
                id: req.params.id
            }
        }
    )
    .then(dbPostdata => {
        if (!dbPostdata) {
            res.status(404).json({ message: ' No post found with this id' });
            return;
        }
        res.json(dbPostdata);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});


// add delete route
router.delete('/:id', (req, res) => {
    Post.destroy({
        where: {
            id: req.params.id
        }
    })
    .then(dbPostdata => {
        if (!dbPostdata) {
            res.status(404).json({ message: 'No post found with this id' });
            return;
        }
        res.json(dbPostdata);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});


module.exports = router;
// Keep this expression at the bottom of the file since we will want to assign the router once Express API endpoints have been defined.

