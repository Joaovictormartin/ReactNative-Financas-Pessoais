import { TransationCardProps } from './TransationCardProps'

export interface DateListProps extends TransationCardProps {
  id: string;
}

interface HighlightProps {
  amount: any;
  lastTransition: string;
}

export interface HighlightDate {
  entries: HighlightProps;
  expensives: HighlightProps;
  total: HighlightProps;
}