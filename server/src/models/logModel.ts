import mongoose from "mongoose";

const logSchema = new mongoose.Schema({
  transactionSourceName: String,
  timestamp: Date,
  country_code: String,
  currency_code: String,
  status: String,
  noCoordinatesCount: Number,
  recordCount: Number,
  uniqueRefNumberCount: Number,
  progress: {
    SWITCH_INDEX: Boolean,
    TOTAL_RECORDS_IN_FEED: Number,
    TOTAL_JOBS_IN_FEED: Number,
    TOTAL_JOBS_FAIL_INDEXED: Number,
    TOTAL_JOBS_SENT_TO_ENRICH: Number,
    TOTAL_JOBS_DONT_HAVE_METADATA: Number,
    TOTAL_JOBS_DONT_HAVE_METADATA_V2: Number,
    TOTAL_JOBS_SENT_TO_INDEX: Number,
  },
});

export default mongoose.model("Log", logSchema);
