import { Request, Response } from 'express';
import Photo from '../models/Photo';

class PhotosController {
  public async savePhoto(req: Request, res: Response): Promise<Response> {
    const { title, description } = req.body;
    const photo = new Photo({
      title,
      description,
      imagePath: req.file.path,
    });
    await photo.save();
    return res.json({ message: 'New photo saved successfully.', photo});
  }

  public async getPhotos(req: Request, res: Response): Promise<Response> {
    const photos = await Photo.find();
    return res.json(photos);
  }
}

export const photosController = new PhotosController();
