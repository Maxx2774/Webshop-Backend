const supabase = require("../../config/supabase");

// Categories data (kept for reference, but not inserted by addTestData)
const categories = [
  { id: 1, name: "Frukt", slug: "frukt" },
  { id: 2, name: "Grönsaker", slug: "gronsaker" },
  { id: 3, name: "Mejeri", slug: "mejeri" },
  { id: 4, name: "Kött & Fisk", slug: "kott&fisk" },
  { id: 5, name: "Bröd & Bakverk", slug: "brod&bakverk" },
  { id: 6, name: "Drycker", slug: "drycker" },
  { id: 7, name: "Snacks & Godis", slug: "snacks&godis" },
  { id: 8, name: "Torrvaror & Skafferi", slug: "torrvaror&skafferi" },
  { id: 9, name: "Fryst", slug: "fryst" },
];

// Products data
const products = [
  {
    name: "Äpple Royal Gala",
    price: 25,
    weight: 1,
    weight_unit: "kg",
    image_url:
      "https://assets.axfood.se/image/upload/f_auto,t_500/6419042392693_C1N1_s01", // Verifierad Willys-länk
    description:
      "Krispiga, söta Royal Gala äpplen med röd-gul färg. Perfekta som snacks eller i desserter.",
    category_id: 1,
    stock_quantity: 30,
  },
  {
    name: "Banan Ekologisk",
    price: 22,
    weight: 1,
    weight_unit: "kg",
    image_url:
      "https://assets.axfood.se/image/upload/f_auto,t_500/8059147914350_C1N1_s01", // Verifierad Willys-länk
    description:
      "KRAV-märkta ekologiska bananer med söt smak. Odlade utan bekämpningsmedel.",
    category_id: 1,
    stock_quantity: 50,
  },
  {
    name: "Tomat Kvist",
    price: 29,
    weight: 0.5, // Korrekt vikt
    weight_unit: "kg",
    image_url:
      "https://assets.axfood.se/image/upload/f_auto,t_500/07313590203974_C1N1_s01", // Verifierad Willys-länk
    description:
      "Saftiga röda kvisttomater med intensiv smak. Odlade i Sverige under sommarhalvåret.",
    category_id: 2,
    stock_quantity: 40,
  },
  {
    name: "Arla Mellanmjölk",
    price: 15,
    weight: 1,
    weight_unit: "liter",
    image_url:
      "https://assets.axfood.se/image/upload/f_auto,t_500/07310865001818_C1N1_s01", // Verifierad Willys-länk
    description:
      "Ekologisk mellanmjölk med 1,5% fetthalt. Från svenska gårdar med fokus på djurvälfärd.",
    category_id: 3,
    stock_quantity: 60,
  },
  {
    name: "Bregott Normalsaltat",
    price: 45,
    weight: 500,
    weight_unit: "g",
    image_url:
      "https://assets.axfood.se/image/upload/f_auto,t_500/07310865004123_C1N1_s01", // Verifierad Willys-länk
    description:
      "Svenskt smör och rapsolja i perfekt kombination. Bra konsistens direkt från kylen.",
    category_id: 3,
    stock_quantity: 25,
  },
  {
    name: "Nötfärs Svensk",
    price: 89,
    weight: 500,
    weight_unit: "g",
    image_url:
      "https://assets.axfood.se/image/upload/f_auto,t_500/02339112000000_C1N1_s01", // Verifierad Willys-länk
    description:
      "Färsk nötfärs från svenska gårdar med 10% fetthalt. Perfekt till köttfärssås och hamburgare.",
    category_id: 4,
    stock_quantity: 20,
  },
  {
    name: "Laxfilé Färsk",
    price: 199,
    weight: 0.5,
    weight_unit: "kg",
    image_url:
      "https://assets.axfood.se/image/upload/f_auto,t_500/07350037511007_C1N1_s01", // Verifierad Willys-länk
    description:
      "Färsk norsk laxfilé med fast, rosa kött och mild smak. Rik på omega-3.",
    category_id: 4,
    stock_quantity: 15,
  },
  {
    name: "Baguette Surdeg",
    price: 20,
    weight: 250,
    weight_unit: "g",
    image_url:
      "https://assets.axfood.se/image/upload/f_auto,t_500/07318125201015_C1N1_s01", // Verifierad Willys-länk
    description:
      "Krispig fransk surdegsbaguette med luftig inkråm. Bakat i stenugn för bästa resultat.",
    category_id: 5,
    stock_quantity: 35,
  },
  {
    name: "Tropicana Apelsinjuice",
    price: 30,
    weight: 1,
    weight_unit: "liter",
    image_url:
      "https://assets.axfood.se/image/upload/f_auto,t_500/05941334187602_C1N1_s01", // Verifierad Willys-länk
    description:
      "100% pressad juice från solmogna apelsiner utan tillsatser. Rik på C-vitamin.",
    category_id: 6,
    stock_quantity: 50,
  },
  {
    name: "OLW Naturchips",
    price: 35,
    weight: 200,
    weight_unit: "g",
    image_url:
      "https://assets.axfood.se/image/upload/f_auto,t_500/07310350109326_C1N1_s01", // Verifierad Willys-länk
    description:
      "Krispiga potatischips med havssalt. Tillagade i svensk rapsolja för perfekt smak.",
    category_id: 7,
    stock_quantity: 40,
  },
  {
    name: "Barilla Spaghetti",
    price: 25,
    weight: 500, // Korrekt vikt
    weight_unit: "g", // Korrekt enhet
    image_url:
      "https://assets.axfood.se/image/upload/f_auto,t_500/08076809513722_C1N1_s01", // Verifierad Willys-länk
    description:
      "Traditionell italiensk pasta av durumvete. Perfekt al dente-konsistens efter 9 minuters kokning.",
    category_id: 8,
    stock_quantity: 80,
  },
  {
    name: "GB Gräddglass Vanilj",
    price: 49,
    weight: 1,
    weight_unit: "liter",
    image_url:
      "https://assets.axfood.se/image/upload/f_auto,t_500/07310500064421_C1N1_s01", // Verifierad Willys-länk
    description:
      "Krämig gräddglass med äkta vanilj. Tillverkad av svensk grädde med hög fetthalt.",
    category_id: 9,
    stock_quantity: 25,
  },
  {
    name: "Marabou Mjölkchoklad",
    price: 25,
    weight: 200,
    weight_unit: "g",
    image_url:
      "https://assets.axfood.se/image/upload/f_auto,t_500/07622300016937_C1N1_s01", // Verifierad Willys-länk
    description:
      "Krämig svensk mjölkchoklad med hög kakohalt. Smälter perfekt i munnen med söt, intensiv smak.",
    category_id: 7,
    stock_quantity: 35,
  },
  {
    name: "Uncle Ben's Basmatiris",
    price: 39,
    weight: 1,
    weight_unit: "kg",
    image_url:
      "https://assets.axfood.se/image/upload/f_auto,t_500/05410673100842_C1N1_s01", // Verifierad Willys-länk
    description:
      "Aromatiskt långkornigt ris som håller sig luftigt och löskokt. Perfekt till grytor och curries.",
    category_id: 8,
    stock_quantity: 60,
  },
  {
    name: "Felix Fryst Pytt i Panna",
    price: 49,
    weight: 400,
    weight_unit: "g",
    image_url:
      "https://assets.axfood.se/image/upload/f_auto,t_500/07310390077830_C1N1_s01", // Verifierad Willys-länk
    description:
      "Klassisk svensk pytt i panna med tärnad potatis, lök och nötkött. Snabb och enkel middag.",
    category_id: 9,
    stock_quantity: 30,
  },
  {
    name: "Findus Frysta Broccoli",
    price: 18,
    weight: 500,
    weight_unit: "g",
    image_url:
      "https://assets.axfood.se/image/upload/f_auto,t_500/07310500187006_C1N1_s01", // Verifierad Willys-länk
    description:
      "Djupfrysta broccolibuketter som behåller sin näringsrika kvalitet. Snabbt tillagade och redo på minuter.",
    category_id: 9,
    stock_quantity: 40,
  },
  {
    name: "Conference Päron",
    price: 28,
    weight: 1,
    weight_unit: "kg",
    image_url:
      "https://assets.axfood.se/image/upload/f_auto,t_500/02388583000000_C1N1_s01", // Verifierad Willys-länk
    description:
      "Saftiga, söta Conference päron med mjukt fruktkött. Utmärkta till desserter eller som snacks.",
    category_id: 1,
    stock_quantity: 35,
  },
  {
    name: "Gurka Svensk",
    price: 15,
    weight: 1,
    weight_unit: "st",
    image_url:
      "https://assets.axfood.se/image/upload/f_auto,t_500/07312710028006_C1N1_s01", // Verifierad Willys-länk
    description:
      "Fräsch svensk växthusodlad gurka med fast konsistens. Perfekt till sallader och smörgåsar.",
    category_id: 2,
    stock_quantity: 30,
  },
  {
    name: "Arla Präst Mellanlagrad",
    price: 89,
    weight: 400,
    weight_unit: "g",
    image_url:
      "https://assets.axfood.se/image/upload/f_auto,t_500/07310865101823_C1N1_s01", // Verifierad Willys-länk
    description:
      "Mellanlagrad svensk prästost med mild, nötig smak och fast konsistens. Perfekt på smörgåsen.",
    category_id: 3,
    stock_quantity: 25,
  },
  {
    name: "Kronfågel Kycklingfilé",
    price: 109,
    weight: 800,
    weight_unit: "g",
    image_url:
      "https://assets.axfood.se/image/upload/f_auto,t_500/07300340001008_C1N1_s01", // Verifierad Willys-länk
    description:
      "Färsk svensk kycklingfilé från Kronfågel. Mör och saftig, perfekt för stekning eller grillning.",
    category_id: 4,
    stock_quantity: 20,
  },
];

// Function to add only products
async function addTestData(_, res) {
  try {
    // Remove the categories insertion part
    // const { error: categoriesError } = await supabase
    //   .from("categories")
    //   .insert(categories);

    // Only insert products
    const { error: productsError } = await supabase
      .from("products")
      .insert(products);

    // Adjust error handling and response
    if (productsError) {
      // Log the specific error for debugging
      console.error("Error inserting products:", productsError);
      return res.status(400).json({ error: productsError.message }); // Send error message
    }
    // Send success status if only products were inserted successfully
    return res.status(200).json({ message: "Products added successfully" }); // Send a success message
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
}

// Function to delete data (with caution notes)
async function deleteData(_, res) {
  try {
    // Be cautious with deleting products if they are referenced by order_items
    // You might need to handle order_items deletion first or set ON DELETE behavior in the DB
    const { error: productsError } = await supabase
      .from("products")
      .delete()
      .neq("id", 0);

    // Keep categories deletion if needed, but be aware of dependencies
    const { error: categoriesError } = await supabase
      .from("categories")
      .delete()
      .neq("id", 0);

    if (productsError || categoriesError) {
      // Provide more specific error feedback
      const errorMessage =
        productsError?.message ||
        categoriesError?.message ||
        "Unknown error during deletion";
      console.error("Deletion error:", errorMessage);
      return res.status(400).json({
        error: errorMessage,
      });
    }
    return res.sendStatus(204); // No content on successful deletion
  } catch (error) {
    console.error("Server error during deletion:", error); // Log server errors
    return res.sendStatus(500);
  }
}

module.exports = {
  addTestData,
  deleteData,
};
