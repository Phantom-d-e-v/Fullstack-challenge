import express from "express";
import usersRouter from "./users.router";

const router = express.Router();

router.get("/ping", async (req, res) => {
  res.send("Hello world");
});

router.use("/users", usersRouter);

export default router;
