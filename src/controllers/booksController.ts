import { Request, Response } from 'express';
// import the model and the interface
import Book, { IBook } from '../models/Book';
import fs from 'fs-extra';
import path from 'path';
import * as faker from 'faker';

class BooksController {
  public renderBook(req: Request, res: Response): void {
    res.render('books/add', { title: 'Add a book'});
  }

  public async index(req: Request, res: Response): Promise<void> {
    // source: https://codeforgeek.com/server-side-pagination-using-node-and-mongo/
    // parans to expect: ?pageNo=1&size=10
    const pageNo = (req.query.pageNo) ? parseInt(req.query.pageNo, 10) : 1;
    const size = (req.query.size) ? parseInt(req.query.size, 10) : 0;
    const query: {skip?: number, limit?: number} = {};
    if (pageNo < 0 || pageNo === 0) {
      const response = { error: true, message: 'invalid page number, should start with 1' };
      res.send(response);
    }
    query.skip = size * (pageNo - 1);
    query.limit = size;

     // get all books using the model
    const books: IBook[] = await Book.countDocuments({}, async (err, totalCount) => {
      let response;
      if (err) {
        response = { error: true, message: 'Error fetching data' };
      }
      // tslint:disable-next-line: no-shadowed-variable
      await Book.find({}, {}, query, (err, data) => {
        if (err) {
          response = { error: true, message: 'Error fetching data' };
        } else {
          const totalPages = Math.ceil(totalCount / size);
          response = { error: false, 'message': data, pages: totalPages };
        }
        res.json(response);
      });
    });
    /* res.render('books/index', {
      title: 'Books',
      books,
    }); */
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

  public async addFakeData(req: Request, res: Response): Promise<void> {
    const booksArray: IBook[] = [];
    for(let i = 0; i < 100; i++) {
      const title: string = `${faker.name.title()}`;
      const author = `${faker.name.findName()}`;
      const isbn = `${faker.address.zipCode()}`;
      const book: IBook = new Book({ title, author, isbn });

      booksArray.push(book);
    }
    await Book.collection.insert(booksArray, (err, docs) => {
      if (err) {
        return res.send(err);
      }
      return res.redirect('/books');
    });
  }
}

export const booksController = new BooksController();
