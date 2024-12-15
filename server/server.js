const jsonServer = require("json-server");
const server = jsonServer.create();
const router = jsonServer.router("db.json");
const middlewares = jsonServer.defaults();
const jwt = require("jsonwebtoken");

// Set default middlewares (logger, static, cors and no-cache)
server.use(middlewares);

// Add custom routes before JSON Server router
server.get("/echo", (req, res) => {
  res.jsonp(req.query);
});

// To handle POST, PUT and PATCH you need to use a body-parser
// You can use the one used by JSON Server
server.use(jsonServer.bodyParser);
const JWT_SECRET = "your-secret-key121"; // Thay đổi thành secret của bạn

// Login API: Xác thực người dùng và trả về access token
server.post("/auth/login", (req, res) => {
  const { username, password } = req.body;
  const user = router.db.get("users").find({ username }).value();

  if (user && user.password === password) {
    const accessToken = jwt.sign(
      { id: user.id, username: user.username },
      JWT_SECRET,
      { expiresIn: "2m" }
    );
    const refreshToken = jwt.sign(
      { id: user.id, username: user.username },
      JWT_SECRET,
      { expiresIn: "3m" }
    );

    // Lưu refresh token vào db.json
    router.db.get("refreshTokens").push({ refreshToken }).write();

    res.json({ accessToken, refreshToken });
  } else {
    res.status(401).json({ error: "Invalid credentials" });
  }
});

// Refresh token API: Cấp lại access token khi hết hạn
server.post("/auth/refresh", (req, res) => {
  const { refreshToken } = req.body;
  const tokenRecord = router.db
    .get("refreshTokens")
    .find({ refreshToken })
    .value();

  if (!tokenRecord) {
    return res.status(403).json({ error: "Invalid refresh token" });
  }

  try {
    const decoded = jwt.verify(refreshToken, JWT_SECRET);
    const accessToken = jwt.sign(
      { id: decoded.id, username: decoded.username },
      JWT_SECRET,
      { expiresIn: "15m" }
    );
    res.json({ accessToken });
  } catch (err) {
    res.status(403).json({ error: "Invalid refresh token" });
  }
});
server.use((req, res, next) => {
  if (["POST", "PUT", "PATCH"].includes(req.method)) {
    if (new Date(req.body.publishDate).getTime() < new Date().getTime()) {
      return res.status(422).send({
        error: {
          publishDate: "Không được publish vào thời điểm trong quá khứ",
        },
      });
    }
    if (req.body.title === "admin") {
      return res.status(400).send({
        error: "Server bị lỗi",
      });
    }
  }
  setTimeout(() => {
    next();
  }, 2000);
});

// Use default router
server.use(router);
server.listen(4000, () => {
  console.log("JSON Server is running");
});
