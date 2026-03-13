// src/controllers/commentController.js
const prisma = require('../lib/prisma');

// CREATE NEW COMMENT
exports.createComment = async (req, res) => {
  const { content, author_id, training_id } = req.body;

  try {
    const newComment = await prisma.comment.create({
      data: {
        content,
        author_id,
        training_id,
      },
    });

    res.status(201).json(newComment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error creating new comment" });
  }
};

// GET ALL COMMENTS
exports.getComments = async (req, res) => {
    try {
        const comments = await prisma.comment.findMany({
            where: { is_deleted: false }
        });
        res.status(200).json(comments);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error getting comments" });
    }
};

// GET SPECIFIC COMMENT
exports.getSpecificComment = async (req, res) => {
    const { id } = req.params;
  
    try {
      const comment = await prisma.comment.findUnique({
        where: { id: Number(id) },
      });
  
      if (!comment) {
        return res.status(404).json({ error: "Comment not found" });
      }
  
      res.status(200).json(comment);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error getting specific comment" });
    }
  };

// UPDATE COMMENT
exports.updateComment = async (req, res) => {
    const { id } = req.params;
    const { content } = req.body;
  
    const updateData = {};
  
    if (content) {
      updateData.content = content;
    }
  
    try {
      const updatedComment = await prisma.comment.update({
        where: { id: Number(id) },
        data: {
          ...updateData,
          updated_at: new Date(),
        },
      });
  
      if (!updatedComment) {
        return res.status(404).json({ error: "Comment not found" });
    }
  
      res.status(200).json(updatedComment);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error updating comment" });
    }
  };
  
// DELETE COMMENT
exports.deleteComment = async (req, res) => {
    const { id } = req.params;
  
    try {
      const comment = await prisma.comment.findUnique({
        where: { id: Number(id) },
      });
  
      if (!comment) {
        return res.status(404).json({ error: "Comment not found" });
      }
  
      await prisma.comment.update({
        where: { id: Number(id) },
        data: { 
            deleted_at: new Date(),
            is_deleted: true
         },
      });
  
      res.status(200).json({ message: "Comment deleted successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error deleting comment" });
    }
  };
  
  exports.getFollowingTrainings = async (req, res) => {
    const userId = parseInt(req.params.id);
  
    try {
      const followings = await prisma.follow.findMany({
        where: { follower_id: userId },
        include: {
          following: {
            include: {
              trainings: true
            }
          }
        }
      });
  
      const result = followings.map(follow => ({
        user: {
          id: follow.following.id,
          first_name: follow.following.first_name,
          last_name: follow.following.last_name
        },
        trainings: follow.following.trainings
      }));
  
      res.status(200).json({ trainings: result });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error fetching followed users' trainings" });
    }
  };
  