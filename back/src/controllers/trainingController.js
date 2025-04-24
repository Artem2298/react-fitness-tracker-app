const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.getTrainings = async (req, res) => {
    try {
        const training = await prisma.training.findMany();
        res.status(200).json(training)
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: "ERROR with getting training" })
    }
};

exports.getPublicTrainings = async (req, res) => {
    try {
        const training = await prisma.training.findMany({
            where: {
                is_public: true
            }
        });
        res.status(200).json(training);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "ERROR with getting training" });
    }
};

exports.getSpecificTraining = async (req, res) => {
    const { id } = req.params;

    try{
        const training = await prisma.training.findUnique({
            where: { id: Number(id) }
        })

        if (!training) { return res.status(404).json({ error: "Training not found" }) }

        res.status(200).json(training)
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: "Error with getting specific training" })
    }
}

exports.getUserTrainings = async (req, res) => {
    const { userId } = req.params;
    try {
        const trainings = await prisma.training.findMany({
            where: {
                user_id: Number(userId)
            }
        });
        res.status(200).json(trainings);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Error with getting user trainings" });
    }
};

exports.createTraining = async (req, res) => {
    const { user_id, title, type, distance, duration, description, is_public } = req.body;
    
    console.log('Received training data:', req.body);

    const trainingData = { 
        user_id, 
        title, 
        type, 
        distance: parseFloat(distance),
        duration: parseFloat(duration),
        description: description || null, 
        is_public
    };

    try {
        const training = await prisma.training.create({
            data: trainingData
        })

        res.status(200).json(training)
    } catch (error) {
        console.log('Detailed error:', error);
        res.status(500).json({ error: 'ERROR with creating of new training', details: error.message });
    }
}

exports.deleteTraining = async (req, res) => {
    const { id } = req.params;

    try {
        const training = await prisma.training.findUnique({
            where: { id: Number(id) }
        })

        if (!training) { return res.status(404).json({ error: "ERROR with delet training. Training not found"}) }
    
        await prisma.training.delete({
            where: { id: Number(id) }
        })
    
        res.status(200).json({ message: "Training was deleted successfully." })
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: 'ERROR with deleting of new training' });
    }
}

exports.updateTraning = async (req, res) => {
    const { id } = req.params 
    const { title, type, distance, duration, description, is_public } = req.body

    const updateData = {}

    if (title) { updateData.title = title }
    if (type) { updateData.type = type }
    if (distance) { updateData.distance = distance }
    if (duration) { updateData.duration = duration }
    if (description) { updateData.description = description }
    if (is_public) { updateData.is_public = is_public }

    try {
        const traning = await prisma.training.update({
            where: { id: Number(id) },
            data: updateData
        })

        if (!traning) { return res.status(404).json({ error: "ERROR with updating training. Training not found" }) }
        
        res.status(200).json({ message: "Tranining was updated succesfully" })
    } catch (error) {
        res.status(500).json({ error: "ERROR 500 with updating training." })
    }
}