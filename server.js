const express = require('express');
const app = express();
const path = require('path');
const multer = require('multer');

// ==================== MULTER ====================

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/");
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname);
    }
});

const upload = multer({ storage });

// ==================== MIDDLEWARE ====================

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use(express.static("static"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.set("view engine", "ejs");
app.set("views", "views");

let products = [];

// ==================== ГЛАВНАЯ ====================

app.get("/", (req, res) => {
    res.render("index", { products: products });
});

// ==================== ПОСТ ====================

app.get("/post/:id", (req, res) => {
    const productId = req.params.id;

    if (!products[productId]) {
        return res.status(404).render("notfound");
    }

    res.render("post", {
        product: products[productId]
    });
});

// ==================== ДОБАВЛЕНИЕ ====================

app.post(
    "/add",
    upload.array("image", 10),
    (req, res) => {

        let data = req.body;

        data.image = req.files.map((file) => file.filename);

        data.id = products.length;

        products.push(data);

        res.status(201).json(data);
    }
);

// ==================== 404 ====================

app.use((req, res) => {
    res.status(404);
    res.render("notfound");
});

// ==================== ЛОГИРОВАНИЕ ====================

app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});

// ==================== ЗАПУСК ====================

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
