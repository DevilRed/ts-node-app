import { Request, Response } from 'express';
// import the model and the interface
import Book, { IBook } from '../models/Book';

class BooksController {
  public renderBook(req: Request, res: Response): void {
    res.render('books/add', { title: 'Add a book'});
  }

  public async index(req: Request, res: Response): Promise<void> {
     // get all books using the model
    const books: IBook[] = await Book.find();
    res.render('books/index', {
      title: 'Books',
      books,
    });
  }

  public renderFormBook(req: Request, res: Response): void {
    res.render('books/add', { title: 'Add a book'});
  }

  public async saveBook(req: Request, res: Response): Promise<void> {
    const {title, author, isbn} = req.body;
    // pass an object with the data from req
    const book: IBook = new Book({ title, author, isbn });
    await book.save();
    res.redirect('/books');
  }
}

export const booksController = new BooksController();
