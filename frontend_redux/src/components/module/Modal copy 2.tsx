// import React, { useEffect, useState } from "react";
// import { PostItem } from "../../types/post.type";
// import { useDispatch, useSelector } from "react-redux";
// import { DispatchApp, RootState } from "../../redux/store";
// import { addPostItemAction, editPostItemAction } from "../../redux/action";
// import { zodResolver } from "@hookform/resolvers/zod/dist/zod.js";
// import * as z from "zod";
// import InputFields from "../InputFields";
// import { Checkbox, TextField } from "@mui/material";
// import { yupResolver } from "@hookform/resolvers/yup/dist/yup.js";

// const FormSchema = z.object({
//   description: z.string({
//     // required_error chỉ dùng được khi không có register
//     // required_error: "Name is required",
//     invalid_type_error: "Not is string",
//   }),
//   // title: z.string().email("Invalid email. Email must be a valid email address"),
//   // publishDate: z.boolean(),
//   // featuredImage: z.string().refine(
//   //   (age) => {
//   //     return Number(age) >= 18;
//   //   },
//   //   { message: "You must be 18 years or older" }
//   // ),
// });

// const Modal = ({
//   postItem,
//   onCloseModal,
// }: {
//   postItem: PostItem | null;
//   onCloseModal: () => void;
// }) => {
//   const initialPostItem: PostItem = {
//     id: "",
//     description: "",
//     title: "",
//     publishDate: "",
//     published: false,
//     featuredImage: "",
//   };
//   const [postItemInput, setPostItemInput] = useState<
//     Omit<PostItem, "id"> | PostItem
//   >(initialPostItem);
//   const dispatch = useDispatch<DispatchApp>();
//   const error = useSelector((state: RootState) => state.error);

//   // const {
//   //   register,
//   //   control,
//   //   handleSubmit,
//   //   // errors,
//   //   formState: { errors },
//   // } = useForm({
//   //   resolver: yupResolver(FormSchema),
//   //   // reValidateMode: "onChange",
//   //   // criteriaMode: "all",
//   //   defaultValues: {
//   //     description: "",
//   //     // title: "",
//   //     // publishDate: "",
//   //     // published: false,
//   //     // featuredImage: "",
//   //   },
//   // });

//   console.log("errors", errors);

//   useEffect(() => {
//     if (postItem) {
//       setPostItemInput(postItem);
//     } else {
//       setPostItemInput(initialPostItem);
//     }
//   }, [postItem]);

//   const onSubmit = (data: any) => {
//     console.log("chdbhdc");
//     console.log("data", data);
//     // dispatch(addPostItemAction(data));
//   };

//   return (
//     <div>
//       <div className="block overflow-y-auto overflow-x-hidden fixed bg-zinc-400 bg-opacity-75 top-0 right-0 left-0 bottom-0 z-50 justify-center items-center w-full md:inset-0 h-[100%] max-h-full">
//         <div className="relative p-4 w-full max-w-md max-h-full m-auto">
//           <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
//             <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
//               <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
//                 {postItem ? "Edit Post" : "Add Post"}
//               </h3>

//               <button
//                 onClick={onCloseModal}
//                 type="button"
//                 className="end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
//                 data-modal-hide="authentication-modal"
//               >
//                 <svg
//                   className="w-3 h-3"
//                   aria-hidden="true"
//                   xmlns="http://www.w3.org/2000/svg"
//                   fill="none"
//                   viewBox="0 0 14 14"
//                 >
//                   <path
//                     stroke="currentColor"
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth={2}
//                     d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
//                   />
//                 </svg>
//                 <span className="sr-only">Close modal</span>
//               </button>
//             </div>
//             <div className="p-4 md:p-5">
//               <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
//                 <input type="text" {...register("description")} />
//                 {/* <InputFields
//                   name="description"
//                   label="description"
//                   placeholder="description"
//                   register={register}
//                   control={control}
//                   type="text"
//                 /> */}
//                 {/* <InputFields
//                   name="title"
//                   label="title"
//                   placeholder="title"
//                   // register={register}
//                   control={control}
//                 /> */}
//                 {/* <InputFields
//                   name="publishDate"
//                   label="publishDate"
//                   placeholder="publishDate"
//                   // register={register}
//                   control={control}
//                 /> */}
//                 {/* <InputFields
//                   name="published"
//                   label="published"
//                   placeholder="published"
//                   // register={register}
//                   control={control}
//                 /> */}
//                 {/* <InputFields
//                   name="featuredImage"
//                   label="featuredImage"
//                   placeholder="featuredImage"
//                   // register={register}
//                   control={control}
//                 /> */}
//                 <button
//                   type="submit"
//                   className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
//                 >
//                   Submit
//                 </button>
//               </form>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Modal;
