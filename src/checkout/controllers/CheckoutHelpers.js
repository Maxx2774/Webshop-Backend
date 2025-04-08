const supabase = require("../../config/supabase");

async function checkProductAvailability(cart) {
  const unavailableProducts = [];
  const updatedCart = [];
  for (const item of cart) {
    const { data: product, error } = await supabase
      .from("products")
      .select("stock_quantity, price, name, image_url")
      .eq("id", item.product_id)
      .single();
    if (error) {
      return console.log(error);
    }

    if (product.stock_quantity < item.quantity) {
      unavailableProducts.push(
        ...[
          {
            product_name: product.name,
            price: product.price,
            image_url: product.image_url,
            id: item.product_id,
            lager: product.stock_quantity,
            önskad: item.quantity,
          },
        ]
      );
    }
    updatedCart.push(...[{ ...item, price: product.price }]);
  }

  if (unavailableProducts.length > 0) {
    return {
      error: "Vissa produkter är slutsålda eller har begränsat lager",
      unavailableProducts,
    };
  }

  return { updatedCart };
}

async function calculateTotalOrderValue(cart) {
  try {
    const productIds = cart.map((item) => item.product_id);

    const { data: products, error } = await supabase
      .from("products")
      .select("id, price")
      .in("id", productIds);
    if (error) {
      console.log(error);
    }

    let total = 0;
    for (const item of cart) {
      const product = products.find((p) => p.id === item.product_id);

      total += product.price * item.quantity;
    }
    return { total };
  } catch (error) {
    return { calcErr: "Fel vid beräkning av varukorgens totalpris" };
  }
}

async function placeOrder(cart, order_info, total) {
  let order = null;
  try {
    const { data: newOrder, error: orderErr } = await supabase
      .from("orders")
      .insert({
        payment_method: order_info.payment_method,
        total_price: total,
      })
      .select("id")
      .single();
    if (orderErr) throw orderErr;
    order = newOrder;

    for (const item of cart) {
      const { error: orderItemsErr } = await supabase
        .from("order_items")
        .insert({
          order_id: order.id,
          product_id: item.product_id,
          quantity: item.quantity,
          price: item.price,
        });
      if (orderItemsErr) throw orderItemsErr;
    }

    const { error: orderInfoErr } = await supabase
      .from("order_information")
      .insert({
        order_id: order.id,
        phone_number: order_info.phone_number.trim(),
        card_last4: order_info.card_number?.trim().slice(-4),
        shipping_address: order_info.shipping_address,
        billing_address: order_info.billing_address,
        customer_notes: order_info.customer_notes,
        email: order_info.email.trim(),
        first_name: order_info.first_name,
        last_name: order_info.last_name,
        vat: total * 0.12,
      });
    if (orderInfoErr) throw orderInfoErr;

    for (const item of cart) {
      const { data: product, error: checkStockErr } = await supabase
        .from("products")
        .select("stock_quantity")
        .eq("id", item.product_id)
        .single();
      if (checkStockErr) throw checkStockErr;
      const { error: productDeductionErr } = await supabase
        .from("products")
        .update({ stock_quantity: product.stock_quantity - item.quantity })
        .eq("id", item.product_id)
        .single();
      if (productDeductionErr) throw productDeductionErr;
    }
    return { order };
  } catch (error) {
    console.log(error);
    return { orderErr: "Fel vid orderläggning", order };
  }
}

module.exports = {
  checkProductAvailability,
  placeOrder,
  calculateTotalOrderValue,
};
