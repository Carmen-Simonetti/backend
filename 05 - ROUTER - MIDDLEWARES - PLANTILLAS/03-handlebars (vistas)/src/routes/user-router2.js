import { Router } from "express";
import { userManager } from "../managers/user-manager.js";

const router = Router();

router.post('/', async(req, res)=>{
    try {
        console.log(req.body)
        const user = await userManager.register(req.body);
        // res.json(user);
        res.redirect(`/home/${user.id}`);
    } catch (error) {
        res.status(500).send(error.message);
    }
})

export default router;