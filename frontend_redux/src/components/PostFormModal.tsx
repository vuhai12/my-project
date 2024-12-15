import { useEffect } from "react";
import { PostItem } from "../types/post.type";
import { useDispatch, useSelector } from "react-redux";
import { DispatchApp, RootState } from "../redux/store";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import InputFields from "./InputFields";
import {
  addPostItemAction,
  editPostItemAction,
} from "../redux/actions/postActions";

const FormSchema = z.object({
  description: z
    .string()
    .min(3, { message: "Description must be at least 3 characters long" }),
  title: z
    .string()
    .min(3, { message: "Title must be at least 3 characters long" }),
  published: z.boolean().optional(),
  featuredImage: z.string().nonempty({ message: "Image URL is required" }),
  publishDate: z
    .string()
    .refine((val) => new Date(val).toString() !== "Invalid Date", {
      message: "Invalid publish date",
    }),
});

const PostFormModal = ({
  postItem,
  onCloseModal,
}: {
  postItem: PostItem | null;
  onCloseModal: () => void;
}) => {
  // const initialPostItem: PostItem = {
  //   id: "",
  //   description: "",
  //   title: "",
  //   publishDate: "",
  //   published: false,
  //   featuredImage: "",
  // };
  // const [postItemInput, setPostItemInput] = useState<
  //   Omit<PostItem, "id"> | PostItem
  // >(initialPostItem);
  const dispatch = useDispatch<DispatchApp>();
  const apiErrors = useSelector((state: RootState) => state.post.error);

  const {
    control,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<PostItem>({
    resolver: zodResolver(FormSchema),
    reValidateMode: "onChange",
    criteriaMode: "all",
    defaultValues: {
      description: postItem?.description ?? "",
      title: postItem?.title ?? "",
      publishDate: postItem?.publishDate ?? "",
      published: postItem?.published ?? false,
      featuredImage: postItem?.featuredImage ?? "",
    },
  });

  // useEffect(() => {
  //   if (postItem) {
  //     setPostItemInput(postItem);
  //   } else {
  //     setPostItemInput(initialPostItem);
  //   }
  // }, [postItem]);

  useEffect(() => {
    if (apiErrors && typeof apiErrors === "object") {
      Object.entries(apiErrors).forEach(([field, message]) => {
        if (typeof message === "string") {
          setError(field as keyof Omit<PostItem, "id">, {
            type: "server",
            message,
          });
        }
      });
    }
  }, [apiErrors]);

  const onSubmit = (data: Omit<PostItem, "id">) => {
    if (postItem) {
      dispatch(editPostItemAction(postItem.id, data));
    } else {
      dispatch(addPostItemAction(data));
    }
  };

  return (
    <div>
      <div className="block overflow-y-auto overflow-x-hidden fixed bg-zinc-400 bg-opacity-75 top-0 right-0 left-0 bottom-0 z-50 justify-center items-center w-full md:inset-0 h-[100%] max-h-full">
        <div className="relative p-4 w-full max-w-md max-h-full m-auto">
          <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                {postItem ? "Edit Post" : "Add Post"}
              </h3>
              <button
                onClick={onCloseModal}
                type="button"
                className="end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                data-modal-hide="authentication-modal"
              >
                <svg
                  className="w-3 h-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 14"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                  />
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
            </div>
            <div className="p-4 md:p-5">
              <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
                <InputFields
                  variant={"outlined"}
                  name="description"
                  label="description"
                  type="text"
                  control={control}
                  errorMessage={errors.description?.message}
                />
                <InputFields
                  variant={"outlined"}
                  name="title"
                  type="text"
                  label="title"
                  control={control}
                  errorMessage={errors.title?.message}
                />
                <InputFields
                  variant={"outlined"}
                  name="publishDate"
                  label="publishDate"
                  type="datetime-local"
                  control={control}
                  errorMessage={errors.publishDate?.message}
                />
                <InputFields
                  variant={"outlined"}
                  name="published"
                  label="published"
                  type="checkbox"
                  control={control}
                  errorMessage={errors.published?.message}
                />
                <InputFields
                  variant={"outlined"}
                  type="text"
                  name="featuredImage"
                  label="featuredImage"
                  control={control}
                  errorMessage={errors.featuredImage?.message}
                />
                <button
                  type="submit"
                  className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostFormModal;
