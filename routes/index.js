const express = require("express");
const router = express.Router();
const Details = require("../models/details");

router.get("/", async (req, res, next) => {
  const details = await Details.find();
  res.render("home", {
    details,
  });
});

router.get("/add-to-collection", (req, res, next) => {
  res.render("add");
});

router.post("/add", async (req, res, next) => {
  //   console.log(req.body);
  try {
    if (
      !req.body.name ||
      !req.body.location ||
      !req.body.purpose ||
      !req.body.about ||
      !req.body.job
    ) {
      req.flash("error", "Enter all details.");
      return res.redirect("/add-to-collection");
    }

    const detail = await Details.create(req.body);
    res.redirect("/");
  } catch (error) {
    console.log(error);
  }
});

router.post("/search", async (req, res, next) => {
  const search = req.body.search;
  console.log(search);
  const details = await Details.find();
  const filtered = details.filter((detail) => {
    if (detail.location.toLowerCase().includes(search.toLowerCase().trim())) {
      return true;
    } else if (
      detail.name.toLowerCase().includes(search.toLowerCase().trim())
    ) {
      return true;
    } else {
      return false;
    }
  });

  const length = filtered.length;

  res.render("search", {
    details: filtered,
    item: search,
    length,
  });
  // console.log(filtered);
});

module.exports = router;
