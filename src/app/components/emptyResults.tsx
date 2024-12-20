import Image from "next/image";

export default function EmptyResults() {
  return (
    <div className="w-1/2 flex flex-col justify-center items-center bg-darkCol p-10 rounded-bl-[100px] rounded-tr-3xl rounded-br-3xl max-md:w-full max-md:rounded-none">
      <Image
        src="illustration-empty.svg"
        alt="results"
        width={200}
        height={200}
      />
      <p className="text-white text-2xl font-bold leading-loose">
        Results shown here
      </p>
      <p className="text-slate-400 text-center">
        Complete the form and click "calculate repayments" to see what your
        monthly repayments would be.
      </p>
    </div>
  );
}
