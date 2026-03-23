import { Router } from "express";
import TestController from "../controllers/testController.js";
import { upload } from "../miadleware/uploadFileMiddleware.js";
import { authMiddleware } from "../miadleware/authMiddleware.js";
const router = new Router();

router.post("/", authMiddleware, TestController.create);
router.post("/create-theme", TestController.createTheme);
router.get("/theme", TestController.getTheme);
router.get("/get-all-theme", authMiddleware, TestController.getAllTheme);
router.delete("/", TestController.deleteTest);
router.get("/my-tests", TestController.getMyTests);
router.get("/passed-tests", TestController.getPassedTests);
router.post(
  "/upload-file",
  authMiddleware,
  upload.single("file"),
  TestController.uploadTest,
);
router.get("/test", TestController.getTestById);


export { router as testRouter };
