// express package is what allows us to create the routes
const router = require('express').Router();
const sequelize = require('../../config/connection');
const { Post, User, Vote } = require('../../models');

// get all users
router.get('/', (req, res) => {
    console.log('======================');
    Post.findAll({
        // Query configuration
        attributes: [
            'id', 
            'post_url', 
            'title', 
            'created_at',
            [sequelize.literal('(SELECT COUNT(*) FROM vote WHERE post.id = vote.post_id)'), 'vote_count']
        ],
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
        attributes: [
            'id', 
            'post_url', 
            'title', 
            'created_at',
            [sequelize.literal('(SELECT COUNT(*) FROM vote WHERE post.id = vote.post_id) '), 'vote_count']
        ],
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

// When we vote on a post we are updating the post's data
// this means we should create a PUT route for updating a post
// aslo make sure this PUT route is defined before the /:d PUT route so express.js does not think "upvote" is valid parameter for /:id
// PUT /api/posts/upvote
router.put('/upvote', (req, res) => {
    Vote.create({
        user_id: req.body.user_id,
        post_id: req.body.post_id
    }).then(() => {
        // find the post we just voted on
        return Post.findOne({
            where: {
                id: req.body.post_id
            },
            attributes: [
                'id',
                'post_url',
                'title',
                'created_at',
                // use raw MySQL aggregate function query to get a count of how many votes the post has and return it under the name `vote_count`
                [
                    sequelize.literal('(SELECT COUNT(*) FROM vote WHERE post.id = vote.post_id)'),
                    'vote_count'
                ]
            ]
        })
            .then(dbPostdata => res.json(dbPostdata))
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
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

