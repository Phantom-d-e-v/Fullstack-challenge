import express from "express";
import { githubService } from "../services/github.service";

const router = express.Router();

router.post("/", async (req, res) => { 
  let username = req.body.username;
  let searchType = req.body.searchType;
  let data = await githubService.getUser(username, searchType);
  return res.send(data);
  });

export default router;
