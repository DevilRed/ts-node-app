import { Request, Response } from 'express';

export const mocks = {
  mockRequest: () => {
    const req: any = {};
    req.body = jest.fn().mockReturnValue(req);
    req.params = jest.fn().mockReturnValue(req);
    return req;
  },

  mockResponse: () => {
    const res: any = {};
    res.send = jest.fn().mockReturnValue(res);
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    res.render = jest.fn().mockReturnValue(res);
    return res;
  },
  // mockNext: () => jest.fn()
};
