import * as services from '../services'
import { internalServerError,badRequest } from '../middleware/handle_error'
import db from '../models'
const userService = services.methodsService('User')

export const getCurrent = async (req, res) => {
    try {
        const { id } = req.user
        const response = await services.getOne(id)
        return res.status(200).json(response)   
        
    } catch (error) {
        return internalServerError(res);
    }
}

export const getAllUsers = async (req, res) => {
  try {
      const data = await userService.find({
          include: [
              { model: db.Role, as: 'roleData', attributes: ['id', 'code', 'value'] }
          ],
          raw: true,
      });

      if (data.code === 0) {
          res.status(200).json(data);
      } else {
          res.status(404).json({ message: data.message });
      }
  } catch (error) {
      console.log('🚀 ~ getAllUsers ~ error:', error);
      res.status(500).json({ message: 'Internal server error', error });
  }
};

export const getUser = async (req, res) => {
    const page = req.query.page;
    const pageSize = req.query.pageSize;
    const data = await userService.find({
      page: page,
      pageSize,
    });

    if (data.code === -1) {
      return res.status(500).json(data);
    }

    return res.status(200).json(data);
};

  // [POST] /users
export const createUser = async (req, res) => {
    const data = await userService.create(req.body);

    if (data.code === -1) {
      return res.status(500).json(data);
    }

    res.json(data);
};

  // [PATCH] /users/:id
export const  updateUser = async (req, res) => {
    const id = req.params.id;
    const data = await userService.update({
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

  // [DELETE] /users/:id
export const  deleteUser = async (req, res) => {
    const id = req.params.id;

    const data = await userService.delete({
      where: {
        id,
      },
    });

    if (data.code === -1) {
      return res.status(500).json(data);
    }

    res.json(data);
};