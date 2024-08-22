export type ApiErrors = {
  error: string;
  messages: Record<string, string[]>;
  statusCode: number;
};
