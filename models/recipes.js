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

const createRecipe = async (req, res) => {
  try {
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

    const { rows: recipes } = await pool.query(
      "INSERT INTO recipes (id, recipetitle, shortdescription, longdescription, recipepicture, steps, ingredient, vegan) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *",
      [
        id,
        recipetitle,
        shortdescription,
        longdescription,
        recipepicture,
        steps,
        ingredient,
        vegan,
      ] //pg module checks the values
    );
    res.status(201).json(recipes);
  } catch (e) {
    res.json({ error: e.message });
  }
};

const deleteRecipe = async (req, res) => {
  const { id } = req.params;
  const { rows: recipes } = await pool.query( //await replacement for dot then
    "DELETE FROM recipes WHERE id = $1",
    [id]
  );
  res.json(recipes);
};

export { getRecipes, createRecipe, getRecipe, deleteRecipe };
