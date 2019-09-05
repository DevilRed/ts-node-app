import { Request, Response } from 'express';
// import the model and the interface
import Book, { IBook } from '../models/Book';
import fs from 'fs-extra';
import path from 'path';

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

  public async editBook(req: Request, res: Response): Promise<void> {
    const book = await Book.findById(req.params.id);

    if (req.method === 'POST') {
      const { title, author, isbn } = req.body;
      let imagePath = (req.file) ? req.file.path : book.imagePath;
      if (req.body.deleteImg) {
        imagePath = '';
        fs.unlink(path.resolve(book.imagePath))
      }
      // if image file is different, then delete the previous one
      await Book.findByIdAndUpdate(req.params.id, { title, author, isbn, imagePath });
      res.redirect('/books');
    } else {
      res.render('books/edit', { title: 'Edit book', book});
    }
  }

  public async deleteBook(req: Request, res: Response): Promise<void> {
    await Book.findByIdAndDelete(req.params.id);
    res.redirect('/books');
  }
}

export const booksController = new BooksController();
