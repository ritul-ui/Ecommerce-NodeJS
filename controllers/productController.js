exports.getAllProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json({ products });
    } catch (error) {
        console.error("Error fetching products:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

exports.addProduct = async (req, res) => {
    const { name, price, description } = req.body;

    const newProduct = new Product({
        name,
        price,
        description
    });

    try {
        const savedProduct = await newProduct.save();
        res.status(201).json({ message: "Product added successfully", product: savedProduct });
    } catch (error) {
        console.error("Error adding product:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

exports.addMultipleProducts = async (req, res) => {
    const products = req.body;

    try {
        const savedProducts = await Product.insertMany(products);
        res.status(201).json({ message: "Products added successfully", products: savedProducts });
    } catch (error) {
        console.error("Error adding multiple products:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};
