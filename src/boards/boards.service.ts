import { BoardRepository } from './board.repository';
import { CreateBoardDto } from './dto/create-board.dto';
import { Injectable, NotFoundException } from '@nestjs/common';
import { BoardStatus } from './board-status.enum';
import { InjectRepository } from '@nestjs/typeorm';
import { Board } from './board.entity';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/user.entity';

@Injectable()
export class BoardsService {
  constructor(
    @InjectRepository(Board)
    private boardRepository: BoardRepository,
  ) {}

  async getAllBoards(user: User): Promise<Board[]> {
    // const query = this.boardRepository.createQueryBuilder('board');

    // query.where('board.userId = :userId', { userId: user.id });

    // const boards = await query.getMany();

    const boards = this.boardRepository.find({
      where: { user: { id: user.id } },
    });

    return boards;
  }

  async getBoardById(id: number): Promise<Board> {
    const found = await this.boardRepository.findOne({ where: { id: id } });

    if (!found) {
      throw new NotFoundException('Board with the given ID does not exist.');
    }

    return found;
  }

  async createBoard(
    CreateBoardDto: CreateBoardDto,
    user: User,
  ): Promise<Board> {
    const { title, description } = CreateBoardDto;

    const board = this.boardRepository.create({
      title,
      description,
      status: BoardStatus.PUBLIC,
      user,
    });

    await this.boardRepository.save(board);

    return board;
  }

  async deleteBoard(id: number, user: User): Promise<void> {
    const result = await this.boardRepository.delete({
      id: id,
      user: { id: user.id },
    });

    if (result.affected === 0) {
      throw new NotFoundException('Board not found');
    }
  }

  async updateBoardStatus(id: number, status: BoardStatus): Promise<Board> {
    const board = await this.getBoardById(id);

    board.status = status;

    await this.boardRepository.save(board);

    return board;
  }
}
