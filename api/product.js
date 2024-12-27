const ProductModel = require('../models/product.js');

const get = async function (req, res) {
    try {

    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, error, message: 'Непредвиденная ошибка' });
    }
};

const list = async function (req, res) {
    try {
        const db_data = await ProductModel.find();
        const data = [...db_data].map(el => {
            const { _id: id, __v, ...props } = el._doc;
            return ({ id, ...props });
        });
        return res.status(200).json(data);

    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, error, message: 'Непредвиденная ошибка' });
    }
};

const add = async function (req, res) {
    const { name = 'product', price = 10000, preview } = req.body;
    try {
        const doc = new ProductModel({
            name,
            "description": "desc-4",
            "brand": null,
            price,
            "preview": {
                "filename": preview,
                "alt": "preview"
            },
            "images": [],
            "available": "present",
            "categories": [
                "category-1",
                "category-2"
            ],
            "tags": [
                "tag-1",
                "tag-2"
            ],
            "templates": [
                {
                    "title": "tem-1",
                    "content": [
                        "temp-id-1",
                        "temp-id-2",
                        "<b>hello world</b>"
                    ]
                }
            ],
            "characteristics": [
                {
                    "name": "char-1",
                    "key": "char-key-1",
                    "value": "char-value-1"
                }
            ]
        });
        const db_data = await doc.save();
        return res.status(200).json(db_data);

    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, error, message: 'Непредвиденная ошибка' });
    }
};

// Экспорт функций
module.exports = { get, list, add };
