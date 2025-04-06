const supabase = require("../../config/supabase");
const {
  checkProductAvailability,
  placeOrder,
  calculateTotalOrderValue,
} = require("./CheckoutHelpers");

async function order(req, res) {
  let createdOrder = null;
  try {
    const { cart, order_info } = req.body;

    const { updatedCart, unavailableProducts, error } =
      await checkProductAvailability(cart);

    if (unavailableProducts) {
      return res.status(400).json({
        error,
        unavailableProducts,
      });
    }

    const { total, calcErr } = await calculateTotalOrderValue(cart);
    if (calcErr) {
      return res.status(400).json({ error: calcErr });
    }

    const { order: placedOrder, orderErr } = await placeOrder(
      updatedCart,
      order_info,
      total
    );
    createdOrder = placedOrder;
    if (orderErr) throw new Error(orderErr);
    return res.status(201).json({ message: "Order created" });
  } catch (error) {
    await supabase
      .from("order_items")
      .delete()
      .eq("order_id", createdOrder?.id);
    await supabase
      .from("order_information")
      .delete()
      .eq("order_id", createdOrder?.id);
    await supabase.from("orders").delete().eq("id", createdOrder?.id);
    return res.status(500).json({ error: error.message });
  }
}

module.exports = { order };
