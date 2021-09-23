import { HttpException, Injectable, HttpStatus } from '@nestjs/common';
import * as path from 'path';
import * as fs from 'fs';
import * as uuid from 'uuid';

@Injectable()
export class FileService {
  async createFile(file: string) {
    try {
      if(file == '') {
        return ''
      }
      const fileName = uuid.v4() + '.png';
      const filePath = path.resolve(__dirname, '..', '..', 'static');
      if (!fs.existsSync(filePath)) {
        fs.mkdirSync(filePath, { recursive: true });
      }
      fs.writeFile(
        path.join(filePath, fileName),
        Buffer.from(file.replace(/^data:image\/png;base64,/, ''), 'base64'),
        (err) => {
          if (err) return Error('file writing error');
        },
      );
      return path.join(filePath, fileName);
    } catch (e) {
      throw new HttpException(
        'file writing error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
