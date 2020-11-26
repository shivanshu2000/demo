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
  let search = req.body.search.trim();
  search = search.split(" ");
  filteredSearch = search.filter((item) => {
    if (item === "") {
      return false;
    } else {
      return true;
    }
  });
  console.log(filteredSearch);
  let searchedArray;
  let nameArray = [];
  let locationArray = [];

  try {
    for (let i = 0; i < filteredSearch.length; i++) {
      if (!nameArray.length > 0) {
        nameArray = await Details.find({
          name: { $regex: filteredSearch[i], $options: "i" },
        });
      }

      if (!nameArray.length > 0) {
        if (!locationArray.length > 0) {
          locationArray = await Details.find({
            location: { $regex: filteredSearch[i], $options: "i" },
          });
        }
      }
    }
    console.log(nameArray);
    console.log(locationArray);

    searchedArray = [...nameArray, ...locationArray];

    res.render("search", {
      details: searchedArray,
      item: search.join(" "),
    });
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
