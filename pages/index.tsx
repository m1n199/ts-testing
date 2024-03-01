import { Form, Formik } from "formik";

export default function App(){
  return (
    <>
      <div className="wrapper bg-red-300 w-full h-screen flex justify-center items-center text-black">
        <form
          action="/properties"
          // method="GET"
          method="POST"
          className="from bg-blue-200 p-5 flex flex-col space-y-3"
        >
          <input type="a" name="a" />
          <input type="b" name="b" />
          <button
            type="submit"
            className="btn px-4 py-2 bg-green-200 rounded-md"
          >
            Submit
          </button>
        </form>
      </div>
    </>
  );
}