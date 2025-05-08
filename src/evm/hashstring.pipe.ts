import {
  HttpException,
  HttpStatus,
  Injectable,
  PipeTransform,
} from '@nestjs/common';

@Injectable()
export default class HexStringPipe implements PipeTransform {
  transform(value: any) {
    if (typeof value !== 'string') {
      throw new HttpException('String expected', HttpStatus.BAD_REQUEST);
    }

    if (!isValidHexString(value)) {
      throw new HttpException('Invalid string format', HttpStatus.BAD_REQUEST);
    }

    return value.toLowerCase();
  }
}

function isValidHexString(value: string): boolean {
  const regex = /^0x[0-9a-fA-F]{64}$/;
  return regex.test(value);
}
