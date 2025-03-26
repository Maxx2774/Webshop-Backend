const supabase = require("../../config/supabase");

async function getCartItems(req, res) {
  try {
    const cart = req.query.cart;
    if (!cart) {
      return res.status(404).json({ error: "Inga produkter hittades" });
    }

    newCart = cart.map((item) => ({
      productId: Number(item.productId),
      quantity: Number(item.quantity),
    }));

    const productIds = newCart.map((item) => item.productId);

    const { data: products, error } = await supabase
      .from("products")
      .select("*")
      .in("id", productIds);
    if (error)
      return res.status(404).json({ error: "Fel vid hämtning av produkter" });

    const updatedCart = newCart.map((item) => {
      const product = products.find((p) => p.id === item.productId);

      return {
        ...item,
        ...(product || { name: "Produkten hittades inte", quantity: 0 }),
      };
    });

    return res.status(200).json({ updatedCart });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Server fel" });
  }
}

async function placeOrder() {
  try {
  } catch (error) {}
}

module.exports = { getCartItems };
