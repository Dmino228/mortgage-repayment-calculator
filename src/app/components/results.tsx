"use client";

import EmptyResults from "./emptyResults";
import CompletedResults from "./completedResults";
import { completed, results } from "./form";
import { useSignals } from "@preact/signals-react/runtime";

export default function Results() {
  useSignals();

  return completed.value ? (
    <CompletedResults
      repayments={results.value.repayments}
      total={results.value.total}
    />
  ) : (
    <EmptyResults />
  );
}
