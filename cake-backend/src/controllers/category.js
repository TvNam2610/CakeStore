import * as services from '../services'
import { internalServerError,badRequest } from '../middleware/handle_error'
import Joi from 'joi'
import { id } from '../helper/joi_schema'


const cateService = services.methodsService('Category')


export const getCategory = async (req, res) => {
    const page = req.query.page;
    const pageSize = req.query.pageSize;
    const data = await cateService.find({
        page: page,
        pageSize,
    });

    if (data.code === -1) {
        return res.status(500).json(data);
    }

    return res.status(200).json(data);
};
export const getCateById = async(req,res) => {
  const {id} = req.params;
  const data = await cateService.find({ where: { id } })

  if (data.code === -1) {
    return res.status(500).json(data);
  }

  return res.status(200).json(data);
}

//CREATE
export const createCategory = async (req, res) => {
    const data = await cateService.create(req.body);

    if (data.code === -1) {
      return res.status(500).json(data);
    }

    res.json(data);
};

//UPDATE
export const updateCategory = async (req, res) => {
    const id = req.params.id;
    const data = await cateService.update({
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
export const deleteCategory = async (req, res) => {
    const id = req.params.id;

    const data = await cateService.delete({
      where: {
        id,
      },
    });

    if (data.code === -1) {
      return res.status(500).json(data);
    }

    res.json(data);
};
