export interface TaskItem {
  id: string;
  description: string;
  isComplete: boolean;
}

export type FilterType = 'all' | 'active' | 'completed';