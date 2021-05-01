import { Options, diskStorage } from 'multer'
import path from 'path'

const uploadsPath = path.resolve(__dirname, '..', '..', 'temp', 'uploads')

export const multerOptions: Options = {
  dest: uploadsPath,
  storage: diskStorage({
    destination: uploadsPath,
  }),
  limits: {
    fileSize: 2 * 1024 * 1024,
  },
  fileFilter: (req, file, cb) => {
    const allowedMimes = [
      'image/jpeg',
      'image/pjpeg',
      'image/png',
      'image/gif',
      'image/webp',
    ]

    if (allowedMimes.includes(file.mimetype)) cb(null, true)
    else
      cb(
        new Error(
          `Invalid file mime type. Expected one fo the following: ${allowedMimes.join(
            ', ',
          )}, but got ${file.mimetype}`,
        ),
      )
  },
}
