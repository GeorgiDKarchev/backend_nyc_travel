import {Router} from "express";
import Tour from "../models/tours.js";
import bcrypt from 'bcrypt';

const router = new Router();

//GET tours // Show all the tours

router.get("/", async (req,res)=>{
 try{
    const tours = await Tour.find({});
    res.send(tours);
} catch (error) {
    console.log("tours not found");
}
});

//Post - creating a  new tour
 
 router.post('/', async (req, res) => {
    console.log(req. body);
    try{
    const tour = await Tour.create(req.body);
    res.status(201).json(tour);
    } catch (error) {
        console.log(error);
    };
});

//Get/:id / find individual  tour by ID

router.get('/:id', async (req, res) => {
    const tour = await Tour.findById(req.params.id);

    if (!tour) return res.status(404).json({msg: "Tour id not found" });
    else res.json(tour);
});

// PUT /:id
// Update  individual Tours data 
router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { body } = req;

        const updatedTour = await Tour.findByIdAndUpdate(id, body, { new: true });
        res.json(updatedTour);
    } catch (error) {
        console.log(error);
        res.json({ msg: 'Tour not found' });
    }
});

//DELETE /:id   /delete  single Tour/

router.delete('/:id', async (req, res)=>{
    const {id} = req.params;
    try {
        const deletedTour = await Tour.findByIdAndDelete(id);
        res.json({msg:"Tour is deleted", deletedTour});
    } catch (error) {
        console.log(error);
    }
});

export default router;
