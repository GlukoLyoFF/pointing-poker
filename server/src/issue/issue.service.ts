import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AppGateway } from 'src/gateway/app.gateway';
import { IssueDto } from './dto/issue.dto';
import { Issue, IssueDocument } from './schemas/issue.schema';

@Injectable()
export class IssueService {
  constructor(
    @InjectModel(Issue.name) private issueModel: Model<IssueDocument>,
    private gateway: AppGateway,
  ) {}

  async getAll(): Promise<Issue[]> {
    const AllIssues = this.issueModel.find().exec();
    return AllIssues;
  }

  async getOne(id: string): Promise<Issue> {
    const oneIssue = await this.issueModel.findById(id);
    this.gateway.handleChooseIssue(oneIssue);
    return oneIssue;
  }

  async getByGameId(gameId: string): Promise<Issue[]> {
    const Issue = this.issueModel.find({ gameId: gameId });
    return Issue;
  }

  async create(issueDto: IssueDto): Promise<Issue> {
    const newIssue = new this.issueModel(issueDto);
    this.gateway.handleCreateIssue(newIssue);
    return newIssue.save();
  }

  async remove(id: string): Promise<Issue> {
    const removedIssue = await this.issueModel.findByIdAndRemove(id);
    this.gateway.handleDeleteIssue(removedIssue);
    return removedIssue;
  }

  async update(id: string, issueDto: IssueDto): Promise<Issue> {
    const updatedIssue = await this.issueModel.findByIdAndUpdate(id, issueDto, {
      new: true,
    });
    this.gateway.handleUpdateIssue(updatedIssue);
    return updatedIssue;
  }
}
