type FormContent = {
  mortgageAmount: number;
  mortgageTerm: number;
  interestRate: number;
  mortgageType: string;
};

type ErrorType = {
  mortgageAmount: boolean;
  mortgageTerm: boolean;
  interestRate: boolean;
  mortgageType: boolean;
};

type Results = {
  repayments: number;
  total: number;
};
