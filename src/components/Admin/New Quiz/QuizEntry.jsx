// import { useState } from "react";
// import { useForm } from "react-hook-form";
// import { useNavigate, useParams } from "react-router-dom";
// import { useAxios } from "../../hooks/useAxios";

// export default function QuizEntry() {
//   const [correctAnswer, setCorrectAnswer] = useState(null);
//   const navigate = useNavigate();
//   const { api } = useAxios();
//   const quizSetId = useParams().quizSetId;
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [entryData, setEntryData] = useState();
//   console.log(quizSetId);

//   const {
//     register,
//     handleSubmit,
//     clearErrors,
//     formState: { errors },
//   } = useForm({
//     defaultValues: {
//       question: "",
//       options: ["", "", "", ""],
//       correctAnswer: "",
//     },
//   });

//   const onSubmit = (data) => {
//     if (correctAnswer === null) {
//       setError("correctAnswer", {
//         type: "manual",
//         message: "Select a correct answer",
//       });
//       return;
//     }
//     const entryData = {
//       ...data,
//       correctAnswer: data.options[correctAnswer],
//     };

//     console.log(entryData); // Handle quiz data
//     fetchApi(entryData);
//   };

//   const fetchApi = async (entryData) => {
//     try {
//       setLoading(true);
//       setError(null); // Reset error before new request
//       const response = await api.post(
//         `admin/quizzes/${quizSetId}/questions`,
//         entryData
//       );
//       if (response.status === 201) {
//         console.log("created question", response.data.data);
//         setEntryData(response.data.data);
//       } else {
//         throw new Error("Failed to fetch data");
//       }
//     } catch (err) {
//       setError(err.message || "Something went wrong");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <main className="md:flex-grow px-4 sm:px-6 lg:px-8 py-8">
//       <div>
//         <nav className="text-sm mb-4" aria-label="Breadcrumb">
//           <ol className="list-none p-0 inline-flex">
//             <li className="flex items-center">
//               <a href="#" className="text-gray-600 hover:text-buzzr-purple">
//                 Home
//               </a>
//               <svg
//                 className="fill-current w-3 h-3 mx-3"
//                 xmlns="http://www.w3.org/2000/svg"
//                 viewBox="0 0 320 512"
//               >
//                 <path d="M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z" />
//               </svg>
//             </li>
//             <li>
//               <a
//                 href="#"
//                 className="text-gray-600 hover:text-buzzr-purple"
//                 aria-current="page"
//               >
//                 Quizzes
//               </a>
//             </li>
//           </ol>
//         </nav>

//         <div className="grid grid-cols-1 lg:grid-cols-2 md:gap-8 lg:gap-12">
//           {/* <!-- Left Column --> */}

//           {/* <!-- Right Column --> */}
//         </div>
//       </div>
//     </main>
//   );
// }
