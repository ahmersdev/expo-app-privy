export interface IConnectionDetailsProps {
  label: string;
  address: string | undefined;
  disconnect: () => void;
}
