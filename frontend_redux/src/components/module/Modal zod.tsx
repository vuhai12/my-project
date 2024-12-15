// import React, { useEffect, useState } from "react";
// import { PostItem } from "../types/post.type";
// import { useDispatch, useSelector } from "react-redux";
// import { DispatchApp, RootState } from "../redux/store";
// import { addPostItemAction, editPostItemAction } from "../redux/action";
// import { Resolver, SubmitHandler, useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import * as z from "zod";

// const FormSchema = z.object({
//   description: z.string({
//     // required_error chỉ dùng được khi không có register
//     // required_error: "Name is required",
//     invalid_type_error: "Not is string",
//   }),
//   // .min(3, "Username must not be lesser than 3 characters")
//   // .max(25, "Username must not be greater than 25 characters")
//   // .regex(
//   //   /^[a-zA-Z0-9_]+$/,
//   //   "The username must contain only letters, numbers and underscore (_)"
//   // )
//   // title: z.string().email("Invalid email. Email must be a valid email address"),
//   title: z.string().email("Invalid email. Email must be a valid email address"),
//   publishDate: z.boolean(),
//   featuredImage: z.string().refine(
//     (age) => {
//       return Number(age) >= 18;
//     },
//     { message: "You must be 18 years or older" }
//   ),
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

//   type SchemaType = z.infer<typeof FormSchema>;

//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm<Omit<PostItem, "id">>({
//     resolver: zodResolver(FormSchema),
//     reValidateMode: "onChange",
//     criteriaMode: "all",
//   });

//   useEffect(() => {
//     if (postItem) {
//       setPostItemInput(postItem);
//     } else {
//       setPostItemInput(initialPostItem);
//     }
//   }, [postItem]);

//   const onSubmit = (data: Omit<PostItem, "id">) => {
//     dispatch(addPostItemAction(data));
//   };

//   console.log("errors", errors);

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
//               <form
//                 className="space-y-4"
//                 onSubmit={handleSubmit(onSubmit)}
//                 // onSubmit={(e) => handleSubmit(e)}
//               >
//                 <div>
//                   <label
//                     htmlFor="description"
//                     className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
//                   >
//                     Your description
//                   </label>
//                   <input
//                     {...register("description")}
//                     // {...register("description", {
//                     //   validate: {
//                     //     required: (value) => {
//                     //       if (!value) return "Missing description";
//                     //     },
//                     //     minLength: (value) => {
//                     //       if (value.length < 8)
//                     //         return "Password must be at least 8 characters";
//                     //     },
//                     //   },
//                     // })}
//                     type="text"
//                     name="description"
//                     id="description"
//                     className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
//                     placeholder="description"
//                   />
//                   {errors.description && (
//                     <p className="text-red-600">{errors.description.message}</p>
//                   )}
//                 </div>
//                 <div>
//                   <label
//                     htmlFor="title"
//                     className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
//                   >
//                     Your title
//                   </label>
//                   <input
//                     {...register("title")}
//                     // {...register("title", { required: true, maxLength: 30 })}
//                     // onChange={(e) => handleChangePostItem(e, "title")}
//                     // value={postItemInput.title}
//                     type="text"
//                     aria-invalid={errors.title ? "true" : "false"}
//                     name="title"
//                     id="title"
//                     className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
//                     placeholder="title"
//                   />
//                   {errors.title && errors.title.type === "required" && (
//                     <span role="alert">This is required</span>
//                   )}
//                   {errors.title && errors.title.type === "maxLength" && (
//                     <span role="alert">Max length exceeded</span>
//                   )}
//                   {errors.title && (
//                     <p className="text-red-600">{errors.title.message}</p>
//                   )}
//                 </div>
//                 <div className="mb-6">
//                   <label
//                     htmlFor="publishDate"
//                     className="mb-2 block text-sm font-medium text-gray-900 dark:text-gray-300"
//                   >
//                     Publish Date
//                   </label>
//                   <input
//                     {...register("publishDate")}
//                     // {...register("publishDate", {
//                     //   required: "Missing publishDate",
//                     // })}
//                     // onChange={(e) => handleChangePostItem(e, "publishDate")}
//                     // value={postItemInput.publishDate}
//                     type="datetime-local"
//                     id="publishDate"
//                     className="block w-56 rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-blue-500"
//                     placeholder="Title"
//                   />
//                   {errors.publishDate && (
//                     <p className="text-red-600">{errors.publishDate.message}</p>
//                   )}
//                 </div>
//                 <div>
//                   <label
//                     htmlFor="featuredImage"
//                     className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
//                   >
//                     Your featuredImage
//                   </label>
//                   <input
//                     {...register("featuredImage")}
//                     // {...register("featuredImage", {
//                     //   required: "Missing featuredImage",
//                     // })}
//                     // onChange={(e) => handleChangePostItem(e, "featuredImage")}
//                     // value={postItemInput.featuredImage}
//                     type="text"
//                     name="featuredImage"
//                     id="featuredImage"
//                     placeholder="featuredImage"
//                     className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
//                   />
//                   {errors.featuredImage && (
//                     <p className="text-red-600">
//                       {errors.featuredImage.message}
//                     </p>
//                   )}
//                 </div>
//                 <div className="flex justify-between">
//                   <div className="flex items-start">
//                     <div className="flex items-center h-5">
//                       <input
//                         {...register("published")}
//                         // {...register("published", {
//                         //   // required: "Missing published",
//                         // })}
//                         // onChange={(e) => handleChangePostItem(e, "published")}
//                         // checked={postItemInput.published}
//                         id="published"
//                         type="checkbox"
//                         className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-600 dark:border-gray-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"
//                       />
//                     </div>
//                     <label
//                       htmlFor="published"
//                       className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
//                     >
//                       published
//                     </label>
//                   </div>
//                 </div>
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
