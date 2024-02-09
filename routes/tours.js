import {Router} from "express";
import Tour from "../models/tours.js";

const router = new Router();

//GET tours

router.get("/", async (req,res)=>{
 try{
    const tours = await Tour.find({});
    res.send(tours);
} catch (error) {
    console.log("tours not found");
}
});



export default router;
