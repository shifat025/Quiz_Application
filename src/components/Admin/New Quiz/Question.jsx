// import { useParams } from "react-router-dom";
// import FetchQuizList from "../../../features/Admin/QuizList/QuizList";

// export default function QuestionList() {
//   const { quizListData, loading, error } = FetchQuizList();
//   const quizSetId = useParams().quizSetId;
//   return (
//     <div className="px-4">
//       {/* <!-- Question One --> */}
//       <div className="rounded-lg overflow-hidden shadow-sm mb-4">
//         <div className="bg-white p-6 !pb-2">
//           <div className="flex justify-between items-center mb-4">
//             <h3 className="text-lg font-semibold">
//               1. Which of the following is NOT a binary tree traversal method?
//             </h3>
//           </div>
//           <div className="space-y-2">
//             <label className="flex items-center space-x-3">
//               <input
//                 type="radio"
//                 name="answer1"
//                 className="form-radio text-buzzr-purple"
//                 checked
//               />
//               <span>Inorder</span>
//             </label>
//             <label className="flex items-center space-x-3">
//               <input
//                 type="radio"
//                 name="answer1"
//                 className="form-radio text-buzzr-purple"
//               />
//               <span>Preorder</span>
//             </label>
//             <label className="flex items-center space-x-3">
//               <input
//                 type="radio"
//                 name="answer1"
//                 className="form-radio text-buzzr-purple"
//               />
//               <span>Postorder</span>
//             </label>
//             <label className="flex items-center space-x-3">
//               <input
//                 type="radio"
//                 name="answer1"
//                 className="form-radio text-buzzr-purple"
//               />
//               <span>Crossorder</span>
//             </label>
//           </div>
//         </div>
//         <div className="flex space-x-4 bg-primary/10 px-6 py-2">
//           <button className="text-red-600 hover:text-red-800 font-medium">
//             Delete
//           </button>
//           <button className="text-primary hover:text-primary/80 font-medium">
//             Edit Question
//           </button>
//         </div>
//       </div>

//       {/* <!-- Question Two --> */}
//       <div className="rounded-lg overflow-hidden shadow-sm mb-4">
//         <div className="bg-white p-6 !pb-2">
//           <div className="flex justify-between items-center mb-4">
//             <h3 className="text-lg font-semibold">
//               2. What is the maximum number of nodes at level 'L' in a binary
//               tree?
//             </h3>
//           </div>
//           <div className="space-y-2">
//             <label className="flex items-center space-x-3">
//               <input
//                 type="radio"
//                 name="answer2"
//                 className="form-radio text-buzzr-purple"
//                 checked
//               />
//               <span>2^L</span>
//             </label>
//             <label className="flex items-center space-x-3">
//               <input
//                 type="radio"
//                 name="answer2"
//                 className="form-radio text-buzzr-purple"
//               />
//               <span>L</span>
//             </label>
//             <label className="flex items-center space-x-3">
//               <input
//                 type="radio"
//                 name="answer2"
//                 className="form-radio text-buzzr-purple"
//               />
//               <span>2^(L-1)</span>
//             </label>
//             <label className="flex items-center space-x-3">
//               <input
//                 type="radio"
//                 name="answer2"
//                 className="form-radio text-buzzr-purple"
//               />
//               <span>2L</span>
//             </label>
//           </div>
//         </div>
//         <div className="flex space-x-4 bg-primary/10 px-6 py-2">
//           <button className="text-red-600 hover:text-red-800 font-medium">
//             Delete
//           </button>
//           <button className="text-primary hover:text-primary/80 font-medium">
//             Edit Question
//           </button>
//         </div>
//       </div>

//       {/* <!-- Question 3 --> */}
//       <div className="rounded-lg overflow-hidden shadow-sm mb-4">
//         <div className="bg-white p-6 !pb-2">
//           <div className="flex justify-between items-center mb-4">
//             <h3 className="text-lg font-semibold">
//               3. What is the height of an empty binary tree?
//             </h3>
//           </div>
//           <div className="space-y-2">
//             <label className="flex items-center space-x-3">
//               <input
//                 type="radio"
//                 name="answer3"
//                 className="form-radio text-buzzr-purple"
//                 checked
//               />
//               <span>0</span>
//             </label>
//             <label className="flex items-center space-x-3">
//               <input
//                 type="radio"
//                 name="answer3"
//                 className="form-radio text-buzzr-purple"
//               />
//               <span>-1</span>
//             </label>
//             <label className="flex items-center space-x-3">
//               <input
//                 type="radio"
//                 name="answer3"
//                 className="form-radio text-buzzr-purple"
//               />
//               <span>1</span>
//             </label>
//             <label className="flex items-center space-x-3">
//               <input
//                 type="radio"
//                 name="answer3"
//                 className="form-radio text-buzzr-purple"
//               />
//               <span>Undefined</span>
//             </label>
//           </div>
//         </div>
//         <div className="flex space-x-4 bg-primary/10 px-6 py-2">
//           <button className="text-red-600 hover:text-red-800 font-medium">
//             Delete
//           </button>
//           <button className="text-primary hover:text-primary/80 font-medium">
//             Edit Question
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }
