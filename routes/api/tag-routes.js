const router = require("express").Router();
const { Tag, Product, ProductTag } = require("../../models");

// The `/api/tags` endpoint

router.get("/", async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try {
    const tagData = await Tag.findAll({
      // Include the associated products
      include: [
        {
          model: Product,
          through: ProductTag,
          as: "products",
        },
      ],
    });
    res.json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/:id", async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try {
    // Use the route param id to find a specific tag
    const tagData = await Tag.findByPk(req.params.id, {
      include: [
        {
          model: Product,
          through: ProductTag,
          as: "products",
        },
      ],
    });
    res.json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/", async (req, res) => {
  // create a new tag
  try {
    const tagData = await Tag.create({
      tag_name: req.body.tag_name,
    });
    res.json(tagData);
  } catch (err) {
    res.status(500).json('{"message": "Error adding tag"}');
  }
});

router.put("/:id", async (req, res) => {
  // update a tag's name by its `id` value
  try {
    // Set the tag name for the tag found by id from the route param id
    const tagData = await Tag.update(
      {
        tag_name: req.body.tag_name,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );
    res.json(tagData);
  } catch (err) {
    res.status(500).json('{"message": "Error updating tag"}');
  }
});

router.delete("/:id", async (req, res) => {
  // delete on tag by its `id` value
  try {
    // Remove a tag by id
    const tagData = await Tag.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.json(tagData);
  } catch (err) {
    res.status(500).json('{"message": "Error deleting tag"}');
  }
});

module.exports = router;
