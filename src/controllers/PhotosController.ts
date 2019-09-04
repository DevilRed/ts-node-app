import { Request, Response } from 'express';
import Photo, { IPhoto } from '../models/Photo';
import path from 'path';
import fs from 'fs-extra'; // installing another fs module since the original is not Promisify

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

  public async getPhoto(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const photo = await Photo.findById(id); // get param sent
    return res.json(photo);

  }

  public async deletePhoto(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const photo = await Photo.findByIdAndRemove(id) as IPhoto;
    if (photo) {
      // remove the file, use path to get the absolute path of the file
      fs.unlink(path.resolve(photo.imagePath));
    }
    return res.json({ message: 'Photo deleted', photo});

  }

  public async updatePhoto(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const { title, description } = req.body;
    const updatedPhoto = await Photo.findByIdAndUpdate(id, {
      title,
      description,
    }, {new: true}); // add new true to retrieve the updated version of the document
    return res.json({
      message: 'Successfully updated',
      updatedPhoto,
    });
  }
}

export const photosController = new PhotosController();
