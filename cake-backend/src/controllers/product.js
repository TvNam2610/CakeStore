import * as services from '../services'
import { internalServerError,badRequest } from '../middleware/handle_error'
import Joi, { date } from 'joi'
import { id } from '../helper/joi_schema'
import { Op } from 'sequelize'
const db = require('../models');
const productService = services.methodsService('Product')
const productFlavorsService = services.methodsService('ProductFlavor')

//GET
export const getById = async(req,res) => {
  const {id} = req.params;
  const data = await productService.find({ where: { id } })

  if (data.code === -1) {
    return res.status(500).json(data);
  }

  return res.status(200).json(data);
}

export const getProducts = async(req, res) => {
  try{
    const response = await services.getProduct(req.query) 
    return res.status(200).json(response)
  }
  catch (error){
    return internalServerError(res)
  }
}

export const getProductsByFlavor = async (req, res) => {
  try {
      const { flavorId } = req.params;

      const products = await productService.find({
          include: [{
              model: db.Flavor,
              where: { id: flavorId }
          }]
      });
      res.status(200).json(products);
  } catch (error) {
      console.error('Error fetching products by flavor:', error);
      res.status(500).json({
          code: -1,
          message: 'Something went wrong on the server',
          data: [{ error }],
      });
  }
};

export const getSimilarProducts = async (req, res) => {
   
      const { id } = req.params;
      const { categoryId } = req.query;

      const data = await productService.find({
          where: {
              category_id: categoryId,
              id: { [db.Sequelize.Op.ne]: id } // Loại trừ sản phẩm có productId được chỉ định
          }
      
      })
      if (data.code === -1) {
        return res.status(500).json(data);
      }
    
      return res.status(200).json(data);
    
};


export const getStatistics = async (req, res) => {
  try {
      const response = await services.getStatistics();
      return res.status(200).json(response);
  } catch (error) {
      return res.status(500).json({
          code: -1,
          message: 'Internal server error',
      });
  }
};

//CREATE
export const createProduct = async (req, res) => {
    const data = await productService.create(req.body);

    if (data.code === -1) {
      return res.status(500).json(data);
    }

    res.json(data);
};

//UPDATE
export const updateProduct = async (req, res) => {
    const id = req.params.id;
    const data = await productService.update({
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
    res.json(data);
};

//DELETE
export const deleteProduct = async (req, res) => {
    const id = req.params.id;

    const data = await productService.delete({
      where: {
        id,
      },
    });

    if (data.code === -1) {
      return res.status(500).json(data);
    }

    res.json(data);
};


export const addFlavorsToProduct = async (req, res) => {
  const { productId } = req.params;
  const { flavorIds } = req.body;

  if (!flavorIds || !Array.isArray(flavorIds)) {
      return badRequest(res, 'Flavor IDs should be an array');
  }

  try {
      const data = await Promise.all(flavorIds.map(flavorId => productFlavorsService.create({
          productId,
          flavorId,
      })));

      res.status(200).json({
          code: 0,
          message: 'Flavors added successfully',
          data,
      });
  } catch (error) {
      return internalServerError(res, error.message);
  }
};
