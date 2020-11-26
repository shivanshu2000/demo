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
  // console.log(search);
  // console.log(search.length);

  filteredSearch = search.filter((item) => {
    if (item === "") {
      return false;
    } else {
      return true;
    }
  });

  console.log(filteredSearch);

  const details = await Details.find();
  const filtered = details.filter((detail) => {
    for (let i = 0; i < filteredSearch.length; i++) {
      if (
        detail.location
          .toLowerCase()
          .includes(filteredSearch[i].trim().toLowerCase())
      ) {
        return true;
      } else if (
        detail.name
          .toLowerCase()
          .includes(filteredSearch[i].trim().toLowerCase())
      ) {
        return true;
      }
    }

    return false;
  });
  // console.log(search);
  // console.log(filtered);

  const length = filtered.length;

  res.render("search", {
    details: filtered,
    item: search.join(" "),
    length,
  });
  // console.log(filtered);
});

module.exports = router;
