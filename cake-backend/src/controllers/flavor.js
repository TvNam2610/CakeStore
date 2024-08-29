import * as services from '../services'
import { internalServerError,badRequest } from '../middleware/handle_error'
import Joi from 'joi'
import { id } from '../helper/joi_schema'
import db from '../models'


const flavorService = services.methodsService('Flavor')
const productFlavorService = services.methodsService('ProductFlavor')


export const getFlavor = async (req, res) => {
    const page = req.query.page;
    const pageSize = req.query.pageSize;
    const data = await flavorService.find({
        page: page,
        pageSize,
    });

    if (data.code === -1) {
        return res.status(500).json(data);
    }

    return res.status(200).json(data);
};


export const getProductFlavors = async (req, res) => {
    const { productId } = req.params;
    try {
        const data = await productFlavorService.find({
            where: {productId},
            include: [
              {
                model: db.Flavor , attributes: ['name'] 
              }
            ],
            raw: true
        });
        if (data.code === 0) {
          const formattedData = data.data.map(item => ({
            id: item.id,
            productId: item.productId,
            flavorId: item.flavorId,
            createdAt: item.createdAt,
            updatedAt: item.updatedAt,
            name: item['Flavor.name'] 
        }));

          res.status(200).json(data);
      } else {
          res.status(404).json({ message: data.message });
      }
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};


//CREATE
export const createFlavor = async (req, res) => {
    const data = await flavorService.create(req.body);

    if (data.code === -1) {
      return res.status(500).json(data);
    }

    res.json(data);
};

//UPDATE
export const updateFlavor = async (req, res) => {
    const id = req.params.id;
    const data = await flavorService.update({
      data: {
        ...req.body,
      },
      where: {
        id,
      },
    });

    if (data.code === -1) {
        return res.status(500).json(data);
    }
    console.log(data);
    res.json(data);
};

//DELETE
export const deleteFlavor = async (req, res) => {
    const id = req.params.id;

    const data = await flavorService.delete({
      where: {
        id,
      },
    });

    if (data.code === -1) {
      return res.status(500).json(data);
    }

    res.json(data);
};
