import { Injectable } from '@nestjs/common';

@Injectable()
export class BoardsService {
  private boards = ['test'];

  getAllBoards() {
    return this.boards;
  }
}
