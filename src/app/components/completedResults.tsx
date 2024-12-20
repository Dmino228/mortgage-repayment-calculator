export default function CompletedResults({ repayments, total }: Results) {
  return (
    <div className="w-1/2 flex flex-col gap-4 bg-darkCol p-10 rounded-bl-[100px] rounded-tr-3xl rounded-br-3xl max-md:w-full max-md:rounded-none">
      <p className="text-white text-2xl font-bold leading-loose">
        Your results
      </p>
      <p className="text-slate-400">
        Your results are shown below based on the information you provided. To
        adjust the results, edit the form and click "calculate repayments"
        again.
      </p>
      <div className="w-full bg-veryDarkCol rounded-lg flex flex-col p-8 gap-8 mt-4 transform-bg">
        <div className="flex flex-col gap-4">
          <p className="text-slate-400">Your monthly repayments</p>
          <p className="text-lightCol text-5xl font-bold">
            &pound;
            {repayments.toLocaleString("en-US")}
          </p>
        </div>
        <hr className="bg-darkCol border-0 h-[2px]" />
        <div className="flex flex-col gap-2">
          <p className="text-slate-400">Total you'll repay over the term</p>
          <p className="text-white text-lg">
            &pound;
            {total.toLocaleString("en-US")}
          </p>
        </div>
      </div>
    </div>
  );
}
