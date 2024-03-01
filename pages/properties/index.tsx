import { GetServerSideProps } from "next";
import qs from "querystring";
import React from "react";

interface PropertiesData {
  formData?: {
    a?: string;
    b?: string;
  };
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const {req, query: get} = context;
  if(req.method === "GET") return { props: { formData: get } };
  if(req.method === "POST") {
    try {
      const post = await new Promise<qs.ParsedUrlQuery>((resolve, reject) => {
        let postBody = "";
        req.on("formData", (formData) => (postBody += formData.toString())); // convert Buffer to string
        req.on("end", () => resolve(qs.parse(postBody))); // 
      });
      return { props: { formData: post } };
    } catch (error) {}
  }
  return {props: {}}
};

export default function Properties(props: PropertiesData) {
  const [formData, setFormData] = React.useState({a: "none", b: "none"});
  React.useEffect(()=> { 
    if(!props.formData) return;
    console.log("formData: ", props.formData); 
   }, []);
  const getData = async () => {
    const resolve = await fetch('/api/submitForm', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
  }
  return (
    <div className="wrapper bg-red-300 w-full h-screen flex justify-center items-center text-black">
      <form
        action="/properties"
        method="GET"
        className="from bg-blue-200 p-5 flex flex-col space-y-3"
        >
        <div>formData {"{"} a : {formData.a}, a : {formData.b} {"}"}</div>
        <input type="a" name="a" />
        <input type="b" name="b" />
        <button type="submit" className="btn px-4 py-2 bg-green-200 rounded-md">
          Submit
        </button>
      </form>
    </div>
  );
}
