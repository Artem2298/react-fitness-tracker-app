const prisma = require('../lib/prisma');

// CREATE FOLLOW (Подписка)
exports.createFollow = async (req, res) => {
  const { follower_id, following_id } = req.body;

  if (follower_id === following_id) {
    return res.status(400).json({ error: "You cannot follow yourself" });
  }

  try {
    const newFollow = await prisma.follow.create({
      data: {
        follower_id,
        following_id,
      },
    });

    res.status(201).json(newFollow);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error creating follow' });
  }
};

// GET ALL FOLLOWING
exports.getFollowing = async (req, res) => {
  const { id } = req.params;

  try {
    const following = await prisma.follow.findMany({
      where: {
        follower_id: Number(id),
      },
      include: {
        following: {
          select: {
            id: true,
            first_name: true,
            last_name: true
          }
        }
      },
    });

    if (following.length === 0) {
      return res.status(404).json({ error: "User with id " + id + " not found" });
    }

    const result = following.map((follow) => ({
      id: follow.following.id,
      first_name: follow.following.first_name,
      last_name: follow.following.last_name,
    }));

    res.status(200).json({ following: result });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error fetching following list' });
  }
};


// GET ALL FOLLOWERS
exports.getFollowers = async (req, res) => {
  const { id } = req.params;

  try {
    const followers = await prisma.follow.findMany({
      where: {
        following_id: Number(id),
      },
      include: {
        follower: {
          select: {
            id: true,
            first_name: true,
            last_name: true
          }
        }
      },
    });

    if (followers.length === 0) {
      return res.status(200).json({ followers: [] }); // просто пустой список
    }    

    const result = followers.map((follow) => ({
      id: follow.follower.id,
      first_name: follow.follower.first_name,
      last_name: follow.follower.last_name,
    }));

    res.status(200).json( {followers: result});
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error fetching followers list' });
  }
};

// DELETE FOLLOW
exports.deleteFollow = async (req, res) => {
  const { follower_id, following_id } = req.body;

  try {
    const deletedFollow = await prisma.follow.delete({
      where: {
        follower_id_following_id: {
          follower_id: Number(follower_id),
          following_id: Number(following_id),
        },
      },
    });

    if (!deletedFollow) {
      return res.status(404).json({ error: 'Follow not found' });
    }

    res.status(200).json({ message: 'Unfollowed successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error unfollowing user' });
  }
};
