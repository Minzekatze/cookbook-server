import pool from "../database/pg.js";

const getRecipes = async (req, res) => {
  const { rows: recipes } = await pool.query("SELECT * FROM recipes");
  res.json(recipes);
};

const getRecipe = async (req, res) => {
  const { id } = req.params;
  console.log(id);
  const { rows: recipes } = await pool.query(
    "SELECT * FROM recipes WHERE id = $1",
    [id]
  );
  res.json(recipes);
};

/* const createRecipe = async (req, res) => {
  const {
    id,
    recipetitle,
    shortdescription,
    longdescription,
    recipepicture,
    steps,
    ingredient,
    vegan,
  } = req.body;
  if (!title) return res.json({ error: "missing data" });

  const { rows: recipes } = await pool.query(
    "INSERT INTO users (id, recipetitle, shortdescription, longdescription, recipepicture, steps, ingredient, vegan) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *",
    [
      id,
      recipetitle,
      shortdescription,
      longdescription,
      recipepicture,
      steps,
      ingredient,
      vegan,
    ]
  );
  res.status(201).json(recipes);
}; */

const deleteRecipe = async (req, res) => {
  const { id } = req.params;
  const { rows: recipes } = await pool.query(
    "DELETE FROM recipes WHERE id = $1",
    [id]
  );
  res.json(recipes);
};

const editRecipe = async (req, res) => {
  const { id } = req.params;
  const {
    recipetitle,
    shortdescription,
    longdescription,
    recipepicture,
    steps,
    ingredient,
    vegan,
  } = req.body;
  const {
    rows: [recipe],
  } = await pool.query(
    "UPDATE recipes SET recipetitle=$2, shortdescription=$3, longdescription=$4, recipepicture=$5, steps=$6, ingredient=$7, vegan=$8 WHERE id=$1 RETURNING *",
    [
      id,
      recipetitle,
      shortdescription,
      longdescription,
      recipepicture,
      steps,
      ingredient,
      vegan,
    ]
  );
  res.json({ recipe });
};

export { getRecipes, getRecipe, deleteRecipe, editRecipe };
