import * as services from '../services'
const prodImgService = services.methodsService('ProductImage')


export const addProductImage = async (req, res) => {

    const data = await prodImgService.create(req.body);

    if (data.code === -1) {
      return res.status(500).json(data);
    }

    res.json(data);
};

export const getProductImages = async (req, res) => {
    const { productId } = req.params;
    try {
        const images = await prodImgService.find({
            where: {productId}
        });
        res.status(200).json({ success: true, data: images });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};