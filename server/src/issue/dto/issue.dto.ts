export type IssuePriority = 'low' | 'middle' | 'hight';

export class IssueDto {
  title: string;
  link?: string;
  priority: IssuePriority;
  gameId: string;
}
