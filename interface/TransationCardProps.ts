export interface TransationCardProps {
  transactionTypes: 'up' | 'down';
  name: string;
  amount: string;
  date: string;
  category: {
    name: string;
    icon: string;
  };
}