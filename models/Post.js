const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

// create our Post model
class Post extends Model {
    static upvote(body, models) {
        return models.Vote.create({
            user_id: body.user_id,
            post_id: body.post_id
        }).then(() => {
            return Post.findOne({
                where: {
                    id: body.post_id
                },
                attributes: [
                    'id',
                    'post_url',
                    'title',
                    'create_at',
                    [
                        sequelize.literal('(SELECT COUNT(*) FROM vote WHERE post.id = vote.post_id)'),
                        'vote_count'
                    ]
                ]
            });
        });
    }
}


// create fields/columns for Post modle
Post.init(
        {
            id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true
        },
            title: {
                type: DataTypes.STRING,
                allowNull: false
        },
            post_url: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    isURL: true
            }
            },
            user_id: {
                type: DataTypes.INTEGER,
                // establish the relationshop between this post and the user by creating a reference to the
                // User model id column that is deefined by the key property (which is the primary key)

                references: {
                    model: 'user',
                    key: 'id'
            }
            }
        },
        {
            sequelize,
            freezeTableName: true,
            underscored: true,
            modelName: 'post'
    }
    );


module.exports = Post;