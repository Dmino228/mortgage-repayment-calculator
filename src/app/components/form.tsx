"use client";

import Image from "next/image";
import { ChangeEvent, FormEvent } from "react";
import { Signal, signal } from "@preact/signals-react";
import { useSignals } from "@preact/signals-react/runtime";

const formState: Signal<FormContent> = signal({
  mortgageAmount: 0,
  mortgageTerm: 0,
  interestRate: 0,
  mortgageType: "",
});

const errorState: Signal<ErrorType> = signal({
  mortgageAmount: false,
  mortgageTerm: false,
  interestRate: false,
  mortgageType: false,
});

export const completed = signal(false);
export const results: Signal<Results> = signal({ repayments: 0, total: 0 });

function handleChange(e: ChangeEvent<HTMLInputElement>) {
  const { name, value, type } = e.target;
  const parsedValue = type === "number" ? parseFloat(value) : value;
  formState.value = { ...formState.value, [name]: parsedValue };
}

function validate(formData: FormContent) {
  const { mortgageAmount, mortgageTerm, interestRate, mortgageType } = formData;
  const errors: ErrorType = {
    mortgageAmount: !mortgageAmount,
    mortgageTerm: !mortgageTerm,
    interestRate: !interestRate,
    mortgageType: !mortgageType,
  };

  errorState.value = errors;
  return Object.values(errors).every((error) => !error);
}

function handleSubmit(e: FormEvent<HTMLFormElement>) {
  e.preventDefault();
  const isValid = validate(formState.value);
  console.log(formState.value);
  console.log(errorState.value);

  if (isValid) {
    calcResults(formState.value);
  }
}

function calcResults(formData: FormContent) {
  let { mortgageAmount, mortgageTerm, interestRate, mortgageType } = formData;
  interestRate /= 1200;
  mortgageTerm *= 12;

  let repayments = 0;
  let total = 0;

  if (mortgageType === "repayment") {
    repayments =
      (mortgageAmount *
        (interestRate * Math.pow(1 + interestRate, mortgageTerm))) /
      (Math.pow(1 + interestRate, mortgageTerm) - 1);
    total = repayments * mortgageTerm;
  }
  if (mortgageType === "interestOnly") {
    repayments = mortgageAmount * interestRate;
    total = repayments * mortgageTerm;
  }

  repayments = parseFloat(repayments.toFixed(2));
  total = parseFloat(total.toFixed(2));

  results.value = { repayments, total };
  completed.value = true;
}

export default function Form() {
  useSignals();

  return (
    <div className="w-1/2 h-full flex flex-col p-10 gap-4 max-md:w-full">
      <div className="w-full flex justify-between items-center max-md:flex-col max-md:justify-start max-md:items-start">
        <h1 className="text-2xl font-bold text-darkCol">Mortgage Calculator</h1>
        <a
          className="underline cursor-pointer hover:text-darkCol transition-all"
          href="."
        >
          Clear All
        </a>
      </div>
      <form className="flex flex-col" onSubmit={handleSubmit}>
        <div className="flex flex-col">
          <p className="my-2">Mortgage Amount</p>
          <label
            className={`flex flex-row-reverse w-full h-12 border border-gray-500 rounded-lg overflow-hidden focus-within:border-lightCol transition-all ${
              errorState.value.mortgageAmount ? "border-red-600" : ""
            }`}
            htmlFor="mortgage amount"
          >
            <input
              className="peer w-full h-full px-3 py-2 text-lg text-darkCol font-bold focus:outline-none"
              type="number"
              id="mortgage amount"
              name="mortgageAmount"
              onChange={handleChange}
            />
            <div
              className={`w-11 h-full bg-background flex justify-center items-center font-bold px-4 py-2 peer-focus:bg-lightCol peer-focus:text-darkCol transition-all ${
                errorState.value.mortgageAmount ? "bg-red-600 text-white" : ""
              }`}
            >
              &pound;
            </div>
          </label>
          <p
            className={`text-red-600 my-2 ${
              errorState.value.mortgageAmount ? "" : "invisible"
            }`}
          >
            This field is required
          </p>
        </div>
        <div className="flex gap-5 max-md:flex-col">
          <div>
            <p className="my-2">Mortgage Term</p>
            <label
              className={`flex w-full h-12 border border-gray-500 rounded-lg overflow-hidden focus-within:border-lightCol transition-all ${
                errorState.value.mortgageTerm ? "border-red-600" : ""
              } `}
              htmlFor="mortgage term"
            >
              <input
                className="peer w-full h-full px-3 py-2 text-lg text-darkCol font-bold focus:outline-none"
                type="number"
                id="mortgage term"
                name="mortgageTerm"
                onChange={handleChange}
              />
              <div
                className={`w-20 h-full bg-background flex justify-center items-center font-bold px-4 py-2 peer-focus:bg-lightCol peer-focus:text-darkCol transition-all ${
                  errorState.value.mortgageTerm ? "bg-red-600 text-white" : ""
                }`}
              >
                years
              </div>
            </label>
            <p
              className={`text-red-600 my-2 ${
                errorState.value.mortgageTerm ? "" : "invisible"
              }`}
            >
              This field is required
            </p>
          </div>
          <div>
            <p className="my-2">Interest Rate</p>
            <label
              className={`flex w-full h-12 border border-gray-500 rounded-lg overflow-hidden focus-within:border-lightCol transition-all ${
                errorState.value.interestRate ? "border-red-600" : ""
              }`}
              htmlFor="interest rate"
            >
              <input
                className="peer w-full h-full px-3 py-2 text-lg text-darkCol font-bold focus:outline-none"
                type="number"
                step={0.01}
                id="interest rate"
                name="interestRate"
                onChange={handleChange}
              />
              <div
                className={`w-12 h-full bg-background flex justify-center items-center font-bold px-4 py-2 peer-focus:bg-lightCol peer-focus:text-darkCol transition-all ${
                  errorState.value.interestRate ? "bg-red-600 text-white" : ""
                }`}
              >
                %
              </div>
            </label>
            <p
              className={`text-red-600 my-2 ${
                errorState.value.interestRate ? "" : "invisible"
              }`}
            >
              This field is required
            </p>
          </div>
        </div>
        <div className="flex flex-col">
          <p className="my-2">Mortgage Type</p>
          <div className="flex flex-col gap-3">
            <label
              className="relative flex items-center w-full h-12 border border-darkCol rounded-lg gap-5 px-5 py-2 cursor-pointer hover:border-lightCol has-[:checked]:border-lightCol has-[:checked]:bg-veryLightCol"
              htmlFor="repayment"
            >
              <input
                className="peer h-5 w-5 cursor-pointer appearance-none rounded-full border border-slate-300 checked:border-lightCol transition-all"
                type="radio"
                name="mortgageType"
                id="repayment"
                value="repayment"
                onChange={handleChange}
              />
              <span className="absolute bg-lightCol w-3 h-3 rounded-full opacity-0 peer-checked:opacity-100 transition-opacity duration-200 top-1/2 left-[30px] transform -translate-x-1/2 -translate-y-1/2"></span>
              <p className="font-extrabold text-darkCol text-lg">Repayment</p>
            </label>
            <label
              className="relative flex items-center w-full h-12 border border-darkCol rounded-lg gap-5 px-5 py-2 cursor-pointer hover:border-lightCol has-[:checked]:border-lightCol has-[:checked]:bg-veryLightCol"
              htmlFor="interest only"
            >
              <input
                className="peer h-5 w-5 cursor-pointer appearance-none rounded-full border border-slate-300 checked:border-lightCol transition-all"
                type="radio"
                name="mortgageType"
                id="interest only"
                value="interestOnly"
                onChange={handleChange}
              />
              <span className="absolute bg-lightCol w-3 h-3 rounded-full opacity-0 peer-checked:opacity-100 transition-opacity duration-200 top-1/2 left-[30px] transform -translate-x-1/2 -translate-y-1/2"></span>
              <p className="font-extrabold text-darkCol text-lg">
                Interest Only
              </p>
            </label>
          </div>
          <p
            className={`text-red-600 my-2 ${
              errorState.value.mortgageType ? "" : "invisible"
            }`}
          >
            This field is required
          </p>
        </div>
        <button className="w-[300px] h-14 flex justify-center items-center gap-2 rounded-[32px] bg-lightCol max-md:w-full transition-all hover:bg-veryLightCol2">
          <Image
            src="icon-calculator.svg"
            alt="calculator"
            width={24}
            height={24}
          />
          <p className="font-extrabold text-darkCol text-lg">
            Calculate Repayments
          </p>
        </button>
      </form>
    </div>
  );
}
