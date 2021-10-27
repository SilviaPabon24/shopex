import { Router } from "express";
import { AuthController } from "./auth/auth_controller";

const router = Router();

//Default
router.get("/user", (req,res) => {
    res.send({
        message : "API IS WORKING",
    });
});

router.get("/user", AuthController.fetchUser);
//singning in
router.post("/user/signup", AuthController.signUp);

//Login in
router.post("/user/login", AuthController.login);

/* router.delete("/delete", AuthController.deleteUser);
router.put("/update", AuthController.updateUser); */
export {router};