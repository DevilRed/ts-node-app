import { Request, Response } from 'express';
import Photo from '../models/Photo';

class PhotosController {
  public async savePhoto(req: Request, res: Response) {
    const { title, description } = req.body;
    const photo = new Photo({
      title,
      description,
      imagePath: req.file.path,
    });
    res.json({ message: 'New photo saved successfully.', photo});
    await photo.save();
  }
}

export const photosController = new PhotosController();
