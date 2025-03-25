const supabase = require("../../config/supabase");

async function getProducts(_, res) {
  try {
    const { data: products, error } = await supabase
      .from("products")
      .select("*, categories(name)");
    if (error)
      return res
        .status(400)
        .json({ message: "Gick inte att hämta produkter ", error });
    return res.status(200).json({ products });
  } catch (error) {
    return res.status(500).json({ error: "Server fel" });
  }
}

async function getCategories(_, res) {
  try {
    const { data: categories, error } = await supabase
      .from("categories")
      .select("*");
    if (error) {
      return res
        .status(400)
        .json({ message: "Fel vid hämtning av produktkategorier", error });
    }
    return res.status(200).json({ categories });
  } catch (error) {
    return res.sendStatus(500);
  }
}

module.exports = { getProducts, getCategories };
