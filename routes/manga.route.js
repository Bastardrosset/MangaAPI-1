const express = require("express");
const router = express.Router();
const mangaCtrl = require("../controller/manga.controller")

router.post("/manga-status", mangaCtrl.mangaStatus)

router.get("/manga-statistics", mangaCtrl.mangaStatistic);

router.get("/manga-cover", mangaCtrl.mangaCover);

module.exports = router;
