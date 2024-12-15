import { useEffect, useState } from "react";
import { PostItem } from "../../types/post.type";
import { getPostListAction } from "../../redux/actions/postActions";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { DispatchApp, RootState } from "../../redux/store";
import Modal from "../../components/PostFormModal";

const DashBoard = () => {
  const [formPostItem, setFormPostItem] = useState<PostItem | null>(null);
  const [isShowModal, setIsShowModal] = useState(false);
  const listPosts = useSelector((state: RootState) => state.post.listPosts);
  const dispatch = useDispatch<DispatchApp>();
  const {} = useForm<PostItem>();

  useEffect(() => {
    dispatch(getPostListAction());
  }, []);

  const handleAddPostItem = () => {
    setIsShowModal(true);
  };

  const handleStartEditing = (id: string) => {
    const postItem = listPosts.find((item: PostItem) => item.id == id);
    setFormPostItem(postItem);
    setIsShowModal(true);
  };

  const handleCloseModal = () => {
    setIsShowModal(false);
    setFormPostItem(null);
  };
  return (
    <div>
      <div className="p-5">
        <button
          data-modal-target="authentication-modal"
          data-modal-toggle="authentication-modal"
          className="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          type="button"
          onClick={handleAddPostItem}
        >
          Add
        </button>
        {isShowModal && (
          <Modal postItem={formPostItem} onCloseModal={handleCloseModal} />
        )}
        <div>
          <div className="bg-white py-6 sm:py-8 lg:py-12">
            <div className="mx-auto max-w-screen-xl px-4 md:px-8">
              <div className="mb-10 md:mb-16"></div>
              <div className="grid gap-4 sm:grid-cols-2 md:gap-6 lg:grid-cols-2 xl:grid-cols-2 xl:gap-8">
                {listPosts &&
                  listPosts.map((item: PostItem) => {
                    return (
                      <div
                        key={item.id}
                        className="flex flex-col items-center overflow-hidden rounded-lg border md:flex-row"
                      >
                        <div className="group relative block h-48 w-full shrink-0 self-start overflow-hidden bg-gray-100 md:h-full md:w-32 lg:w-48">
                          <img
                            src={item.featuredImage}
                            loading="lazy"
                            alt="Mọi công việc thành đạt đều nhờ sự kiên trì và lòng say mê."
                            className="absolute inset-0 h-full w-full object-cover object-center transition duration-200 group-hover:scale-110"
                          />
                        </div>
                        <div className="flex flex-col gap-2 p-4 lg:p-6">
                          <span className="text-sm text-gray-400">
                            {item.publishDate}
                          </span>
                          <h2 className="text-xl font-bold text-gray-800">
                            {item.title}
                          </h2>
                          <p className="text-gray-500">{item.description}</p>
                          <div>
                            <div
                              className="inline-flex rounded-md shadow-sm"
                              role="group"
                            >
                              <button
                                type="button"
                                onClick={() => handleStartEditing(item.id)}
                                className="rounded-l-lg border border-gray-200 bg-white py-2 px-4 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:text-blue-700 focus:ring-2 focus:ring-blue-700"
                              >
                                Edit
                              </button>
                              <button
                                type="button"
                                className="rounded-r-lg border-t border-b border-r border-gray-200 bg-white py-2 px-4 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:text-blue-700 focus:ring-2 focus:ring-blue-700"
                              >
                                Delete
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashBoard;
