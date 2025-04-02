const supabase = require("../../config/supabase");

async function checkAdmin(req, res, next) {
  if (!req.user.admin) {
    return res.sendStatus(401);
  }
  next();
}

async function addProduct(req, res) {
  const {
    name,
    price,
    description,
    weight,
    weight_unit,
    stock_quantity,
    category_id,
    image_url,
    active,
  } = req.body;

  console.log(req.body);

  try {
    const productData = {
      name,
      description,
      price,
      stock_quantity,
      category_id,
      weight,
      weight_unit,
      image_url,
      active,
    };
    const { error } = await supabase.from("products").insert(productData);
    if (error) {
      console.error(error);
      if (error.code === "23505") {
        return res
          .status(409)
          .json({ error: "En produkt med samma namn finns redan" });
      }
      return res.status(400).json({
        error: `Det gick inte att lägga till produkt, ${error.message}`,
      });
    }
    return res.status(201).json({ message: `${name} har lagts till` });
  } catch (error) {
    return res.sendStatus(500);
  }
}

async function updateProduct(req, res) {
  const {
    name,
    description,
    price,
    stock_quantity,
    category_id,
    product_id,
    unit,
    image_url,
  } = req.body;

  try {
    const updatedProduct = {
      category_id,
      updated_at: new Date().toISOString(),
    };

    if (name !== null) updatedProduct.name = name;
    if (description !== null) updatedProduct.description = description;
    if (price !== null) updatedProduct.price = price;
    if (stock_quantity !== null) updatedProduct.stock_quantity = stock_quantity;
    if (unit !== null) updatedProduct.unit = unit;
    if (image_url !== null) updatedProduct.image_url = image_url;

    const { error } = await supabase
      .from("products")
      .update(updatedProduct)
      .eq("id", product_id)
      .single();

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    return res
      .status(200)
      .json({ message: `${name}, (${product_id}) har uppdaterats` });
  } catch (error) {
    return res.sendStatus(500);
  }
}

async function deleteProduct(req, res) {
  const { product_id } = req.body;
  if (!product_id) return res.status(400).json({ error: "Produkt-id saknas" });
  try {
    const { error } = await supabase
      .from("products")
      .delete()
      .eq("id", product_id)
      .single();
    if (error) {
      return res.status(400).json({ error: error.message });
    }
    return res.sendStatus(204);
  } catch (error) {
    return res.sendStatus(500);
  }
}

async function addCategory(req, res) {
  const { name } = req.body;
  try {
    const { error } = await supabase.from("categories").insert({ name });
    if (error) {
      console.error(error);
      if (error.code === "23505") {
        return res.status(409).json({ error: "Kategorin finns redan" });
      }
      return res.status(400).json({
        error: `Det gick inte att lägga till kategorin, ${error.message}`,
      });
    }
    return res.status(201).json({ message: `${name} kategori har lagts till` });
  } catch (error) {
    return res.sendStatus(500);
  }
}

async function updateCategory(req, res) {
  const { category_id, name } = req.body;
  try {
    if (!category_id || !name) {
      return res.status(400).json({ error: "Namn eller kategori-id saknas" });
    }

    const { error } = await supabase
      .from("categories")
      .update({ name })
      .eq("id", category_id)
      .single();
    if (error) {
      if (error.code === "23505") {
        return res
          .status(409)
          .json({ error: "Kategori med samma namn finns redan" });
      }
      return res.status(400).json({
        error: `Det gick inte att uppdatera kategorin, ${error.message}`,
      });
    }
    return res.status(200).json({ message: "Kategorin har uppdaterats" });
  } catch (error) {
    return res.sendStatus(500);
  }
}

async function deleteCategory(req, res) {
  const { category_id } = req.body;
  try {
    const { error } = await supabase
      .from("categories")
      .delete()
      .eq("id", category_id)
      .single();
    if (error) {
      return res.status(400).json({ error: error.message });
    }
    return res.sendStatus(204);
  } catch (error) {
    return res.sendStatus(500);
  }
}

module.exports = {
  addProduct,
  updateProduct,
  deleteProduct,
  checkAdmin,
  addCategory,
  updateCategory,
  deleteCategory,
};
