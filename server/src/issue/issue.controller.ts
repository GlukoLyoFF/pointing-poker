import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { IssueDto } from './dto/issue.dto';
import { IssueService } from './issue.service';
import { Issue } from './schemas/issue.schema';

@Controller('issues')
export class IssueController {
  constructor(private readonly issueService: IssueService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() issueDto: IssueDto): Promise<Issue> {
    return this.issueService.create(issueDto);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  async getAll(): Promise<Issue[]> {
    return this.issueService.getAll();
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async getOne(@Param('id') id: string): Promise<Issue> {
    const checkedIssue = this.issueService.getOne(id);
    if (!checkedIssue) throw new NotFoundException("Issue doesn't exist!");
    return checkedIssue;
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  async delete(@Param('id') id: string): Promise<Issue> {
    const deletedIssue = this.issueService.remove(id);
    if (!deletedIssue) throw new NotFoundException("Issue doesn't exist!");
    return deletedIssue;
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  async update(
    @Param('id') id: string,
    @Body() issueDto: IssueDto,
  ): Promise<Issue> {
    const editedIssue = this.issueService.update(id, issueDto);
    if (!editedIssue) throw new NotFoundException("Issue doesn't exist!");
    return editedIssue;
  }
}
