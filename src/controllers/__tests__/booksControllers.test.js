// import { mocks } from '../../util/interceptor';
const { mocks } = require('../../util/interceptor');
const { booksController } = require('../booksController');

describe('booksController', () => {
  it('testing controller', async () => {
    let req = mocks.mockRequest();
    const res = mocks.mockResponse();
    await booksController.renderFormBook(req, res);

    expect(res.render).toHaveBeenCalledTimes(1);
    expect(res.render.mock.calls.length).toBe(1);
    expect(res.render).toHaveBeenCalledWith("books/add", { "title": "Add a book" });
  });
});
