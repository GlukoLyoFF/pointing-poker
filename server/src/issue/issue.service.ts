import {
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AppGateway } from 'src/gateway/app.gateway';
import { IssueDto } from './dto/issue.dto';
import { Issue, IssueDocument } from './schemas/issue.schema';

@Injectable()
export class IssueService {
  constructor(
    @InjectModel(Issue.name) private issueModel: Model<IssueDocument>,
    @Inject(forwardRef(() => AppGateway))
    private gateway: AppGateway,
  ) {}

  async getAll(): Promise<Issue[]> {
    const AllIssues = await this.issueModel.find().exec();
    return AllIssues;
  }

  async getOne(id: string): Promise<Issue> {
    try {
      const oneIssue = await this.issueModel.findById(id);
      this.gateway.handleChooseIssue(oneIssue);
      return oneIssue;
    } catch {
      throw new NotFoundException("Issue doesn't exist!");
    }
  }

  async getByGameId(gameId: string): Promise<Issue[]> {
    try {
      const Issue = await this.issueModel.find({ gameId: gameId });
      return Issue;
    } catch {
      throw new NotFoundException("Issues doesn't exist!");
    }
  }

  async create(issueDto: IssueDto): Promise<Issue> {
    try {
      const newIssue = new this.issueModel(issueDto);
      this.gateway.handleCreateIssue(newIssue);
      return await newIssue.save();
    } catch {
      throw new NotFoundException("Issue doesn't exist!");
    }
  }

  async remove(id: string): Promise<Issue> {
    try {
      const removedIssue = await this.issueModel.findByIdAndRemove(id);
      this.gateway.handleDeleteIssue(removedIssue);
      return removedIssue;
    } catch {
      throw new NotFoundException("Issue doesn't exist!");
    }
  }

  async update(id: string, issueDto: IssueDto): Promise<Issue> {
    try {
      const updatedIssue = await this.issueModel.findByIdAndUpdate(
        id,
        issueDto,
        {
          new: true,
        },
      );
      this.gateway.handleUpdateIssue(updatedIssue);
      return updatedIssue;
    } catch {
      throw new NotFoundException(
        "Issue doesn't exist or check request's body!",
      );
    }
  }

  async deleteByGameId(gameId: string): Promise<
    {
      ok?: number;
      n?: number;
    } & {
      deletedCount?: number;
    }
  > {
    try {
      const deletedIssuesByGameId = await this.issueModel.deleteMany({
        gameId: gameId,
      });
      return deletedIssuesByGameId;
    } catch {
      throw new NotFoundException("Issues doesn't exist!");
    }
  }
}
