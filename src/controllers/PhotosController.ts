import { Request, Response } from 'express';

class PhotosController {
  public savePhoto(req: Request, res: Response) {
    // console.log('saving photo');
    res.json({ message: 'jojojo'});
  }
}

export const photosController = new PhotosController();
