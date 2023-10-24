const express = require("express");
const router = express.Router();
const axios = require("axios");

const mangaID = "bbdaa3a3-ea49-4f12-9e1c-baa452f0830d";
const status = "reading";
const sessionToken = "somesessiontoken";

const baseUrl = "https://api.mangadex.org";

const resp = await axios({
  method: "POST",
  url: `${baseUrl}/manga/${mangaID}/status`,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${sessionToken}`,
  },
  data: {
    status: status,
  },
});

console.log(resp.data.result);

router.get("/manga-statistics", async (req, res, next) => {
  try {
    const response = await axios.get(
      "https://api.mangadex.org/statistics/manga/8b34f37a-0181-4f0b-8ce3-01217e9a602c"
    );
    const data = response.data;
    res.json(data);
  } catch (error) {
    next(error);
  }
});

router.get("/manga-cover", async (req, res, next) => {
  const mangaId = req.query.mangaId;

  if (!mangaId) {
    return res.status(400).json({ error: "Le paramètre mangaId est requis." });
  }

  try {
    const response = await axios.get(
      `https://uploads.mangadex.org/covers/${mangaId}/cover.jpg`,
      {
        responseType: "stream",
      }
    );

    response.data.pipe(res);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
