import { Router } from "express";

const AuthRoutes = Router();

AuthRoutes.get("/health", AuthController.login);
// .post(
//     '/register',
//     AccessMiddlewares.checkValidateAccess,
//     AccessLimit([ERole.ADMIN]),
//     AuthController.register
// )

export default AuthRoutes;
