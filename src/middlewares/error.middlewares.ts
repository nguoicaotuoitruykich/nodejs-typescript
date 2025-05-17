// import { NextFunction, Request, Response } from 'express'
// import omit from '../utils/object.util'

// export const defaultErrorHandaler = (err: any, req: Request, res: Response, next: NextFunction) => {
//   if (err instanceof ErrorWidthStatus) {
//     res.status(err.status).json(omit(err, ['status']))
//   }

//   Object.getOwnPropertyNames(err).forEach((key) => {
//     Object.defineProperty(err, key, { enumerable: true }) // set enumerable: true để hiển thị các message ẩn trong err (hiển thị đường dẫn lỗi trong stack)
//   })
//   res.status(err.status).json({
//     message: err.massage,
//     errorInfo: omit(err, ['stack'])
//   })
// }
