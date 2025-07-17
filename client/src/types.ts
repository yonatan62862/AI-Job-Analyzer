type Log = {
  _id: string;
  transactionSourceName: string;
  country_code: string;
  timestamp: string;
  progress?: {
    TOTAL_JOBS_SENT_TO_INDEX?: number;
    TOTAL_JOBS_FAIL_INDEXED?: number;
  };
};
export type { Log };