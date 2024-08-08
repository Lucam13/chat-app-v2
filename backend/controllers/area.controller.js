import Area from '../models/area.model.js';

export const createArea = async (req, res) => {
    const { name, description } = req.body;
    try {
        const area = await Area.create({ name, description });
        res.status(201).json(area);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

export const getAreas = async (req, res) => {
    try {
        const areas = await Area.find();
        res.status(200).json(areas);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
}