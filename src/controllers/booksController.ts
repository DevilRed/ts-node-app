import { Request, Response } from 'express';

class BooksController {
  public renderBook(req: Request, res: Response): void {
    res.render('books/add', { title: 'Add a book'});
  }

  public index(req: Request, res: Response): void {
    res.render('books/index', { title: 'Books'});
  }

  public renderFormBook(req: Request, res: Response): void {
    res.render('books/add', { title: 'Add a book'});
  }

  public saveBook(req: Request, res: Response): void {
    // console.log(req.body);
    res.send('received');
  }
}

export const booksController = new BooksController();
