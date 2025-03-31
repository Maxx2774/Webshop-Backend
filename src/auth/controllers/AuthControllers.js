const supabase = require("../../config/supabase");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

async function register(req, res) {
  const { password, email } = req.body;

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const validateEmail = (email) => emailRegex.test(email);
  if (!validateEmail(email)) {
    return res.status(400).json({ error: "Felaktig email" });
  }

  if (password?.length < 6) {
    return res
      .status(400)
      .json({ error: "Lösenord måste vara minst 6 tecken" });
  }

  try {
    const salt = 10;
    const hashedPassword = await bcrypt.hash(password, salt);
    const userData = {
      password: hashedPassword,
      email,
    };
    const { error } = await supabase.from("users").insert(userData);
    if (error) {
      if (error.code === "23505") {
        return res.status(409).json({ error: "Email är redan registrerat" });
      }
      return res
        .status(400)
        .json({ error: `Fel vid registrering, ${error.message}` });
    }
    console.log("användare skapad");
    return res.status(201).json({ message: "Användare registrerad" });
  } catch (error) {
    return res.status(500).json({ error: "Server fel" });
  }
}

async function signIn(req, res) {
  const { email, password } = req.body;
  console.log(req.headers["user-agent"]);
  console.log(req.headers["x-forwarded-for"]);

  try {
    const { data: user, error } = await supabase
      .from("users")
      .select("*")
      .eq("email", email)
      .single();

    if (error) return res.status(401).json({ error: "Felaktiga uppgifter" });

    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      return res.status(401).json({ error: "Felaktiga uppgifter" });
    }

    const token = jwt.sign(user, process.env.JWT_SECRET, { expiresIn: "1h" });

    await res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 1000 * 60 * 60 * 24,
    });

    return res.status(200).json({
      message: "Inloggning lyckades",
      user: { id: user.id, email: user.email, admin: user.admin },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Server fel" });
  }
}

async function signOut(_, res) {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: true,
      path: "/",
      sameSite: "strict",
    });
    return res.sendStatus(200);
  } catch (error) {
    console.error(error);
  }
}

function authenticateToken(req, res, next) {
  const token = req.cookies.token;

  if (!token) return res.sendStatus(401);
  jwt.verify(token, process.env.JWT_SECRET, (error, user) => {
    if (error) return res.sendStatus(403);
    req.user = user;
    next();
  });
}

async function verifyToken(req, res) {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ valid: false });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const { data: user, error } = await supabase
      .from("users")
      .select("id, email, created_at, admin")
      .eq("id", decoded.id)
      .single();

    if (error) {
      res.clearCookie("token");
      return res.status(401).json({ valid: false });
    }
    return res.status(200).json({
      valid: true,
      user: {
        id: user.id,
        email: user.email,
        created_at: user.created_at,
        admin: user.admin,
      },
    });
  } catch (error) {
    res.clearCookie("token");
    return res.status(401).json({ valid: false });
  }
}

module.exports = { register, signIn, signOut, authenticateToken, verifyToken };
