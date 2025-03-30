const supabase = require("../../config/supabase");

async function getUsers(req, res) {
  try {
    // Allt i Users tabellen hämtas förutom lösenordet
    const { data: users, error } = await supabase
      .from("users")
      .select("id, email, created_at, updated_at, admin")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Fel vid hämtning av användare:", error);
      return res.status(500).json({
        error: "Ett tekniskt fel uppstod. Vänligen försök igen senare.",
      });
    }

    if (!users?.length) {
      return res
        .status(404)
        .json({ error: "Inga kunder hittades i databasen." });
    }

    return res.status(200).json(users);
  } catch (error) {
    console.error("Oväntat fel vid hämtning av användare:", error);
    return res.status(500).json({
      error: "Något gick fel på vår server. Vi ber om ursäkt för besväret.",
    });
  }
}

module.exports = {
  getUsers,
};
