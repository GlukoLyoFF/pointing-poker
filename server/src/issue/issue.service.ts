import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IssueDto } from './dto/issue.dto';
import { Issue, IssueDocument } from './schemas/issue.schema';

@Injectable()
export class IssueService {
  constructor(
    @InjectModel(Issue.name) private issueModel: Model<IssueDocument>,
  ) {}

  async getAll(): Promise<Issue[]> {
    const AllIssues = this.issueModel.find().exec();
    return AllIssues;
  }

  async getOne(id: string): Promise<Issue> {
    const oneIssue = this.issueModel.findById(id);
    return oneIssue;
  }

  async getByGameId(gameId: string): Promise<Issue[]> {
    const Issue = this.issueModel.find({ gameId: gameId });
    return Issue;
  }

  async create(issueDto: IssueDto): Promise<Issue> {
    const newIssue = new this.issueModel(issueDto);
    return newIssue.save();
  }

  async remove(id: string): Promise<Issue> {
    const removedIssue = this.issueModel.findByIdAndRemove(id);
    return removedIssue;
  }

  async update(id: string, issueDto: IssueDto): Promise<Issue> {
    const updatedIssue = this.issueModel.findByIdAndUpdate(id, issueDto, {
      new: true,
    });
    return updatedIssue;
  }
}
