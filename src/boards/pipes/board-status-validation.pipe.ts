import { PipeTransform, BadRequestException } from '@nestjs/common';
import { BoardStatus } from '../board-status.enum';

export class BoardStatusValidationPipe implements PipeTransform {
  readonly StatusOptions = [BoardStatus.PRIVATE, BoardStatus.PUBLIC];

  private isStatusValid(status: string) {
    return this.StatusOptions.indexOf(status as BoardStatus) !== -1;
  }

  transform(value: string) {
    value = value.toUpperCase();
    if (!this.isStatusValid(value)) {
      throw new BadRequestException(`${value} isn't in the status option`);
    }

    return value;
  }
}
