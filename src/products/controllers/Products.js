const supabase = require("../../config/supabase");

async function getProducts(req, res) {
  try {
    const { category_id } = req.query;
    const supaQuery = supabase.from("products").select("*, categories(name)");

    if (category_id) {
      const categoryIds = category_id.split(",");
      supaQuery.in("category_id", categoryIds);
    }
    const { data: products, error } = await supaQuery;

    if (error) throw error;
    if (!products?.length) return res.sendStatus(404);
    return res.status(200).json(products);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
}

async function getProductById(req, res) {
  const { productId } = req.params;

  try {
    const { data: product, error } = await supabase
      .from("products")
      .select("*")
      .eq("id", productId)
      .single();
    if (error) return res.sendStatus(404);

    return res.status(200).json(product);
  } catch (error) {
    return res.sendStatus(500);
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
    return res.status(200).json(categories);
  } catch (error) {
    return res.sendStatus(500);
  }
}

module.exports = {
  getProducts,
  getCategories,
  getProductById,
};
