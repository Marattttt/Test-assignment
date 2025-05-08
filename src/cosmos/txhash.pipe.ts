import {
  HttpException,
  HttpStatus,
  Injectable,
  PipeTransform,
} from '@nestjs/common';

@Injectable()
export default class CosmosTxHashPipe implements PipeTransform {
  transform(value: any) {
    if (typeof value !== 'string') {
      throw new HttpException('String expected', HttpStatus.BAD_REQUEST);
    }

    if (!isValidHexStringWithNoZeroxPrefix(value)) {
      throw new HttpException('Invalid string format', HttpStatus.BAD_REQUEST);
    }

    return value.toLowerCase();
  }
}

function isValidHexStringWithNoZeroxPrefix(value: string): boolean {
  const regex = /^[0-9a-fA-F]{64}$/;
  return regex.test(value);
}
