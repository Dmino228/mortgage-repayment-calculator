import Form from "./components/form";
import Results from "./components/results";

export default function Home() {
  return (
    <main className="w-[1040px] h-full flex bg-white text-gray-500 rounded-3xl shadow-xl max-md:w-full max-md:h-full max-md:flex-col max-md:rounded-none">
      <Form />
      <Results />
    </main>
  );
}
