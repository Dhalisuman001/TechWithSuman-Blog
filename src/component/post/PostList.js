import { ThumbUpIcon, ThumbDownIcon, EyeIcon } from "@heroicons/react/solid";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchCategoriesAction } from "../../redux/slices/category/CategorySlice";
import {
  likesPostAction,
  dislikesPostAction,
  fetchPostAction,
} from "../../redux/slices/posts/PostSlices";
// import { fetchPostAction } from "../../redux/slices/posts/PostSlices";
import DateFormatter from "../../redux/utils/DateFormatter";
import LoadingComponent from "../../redux/utils/LoadingComponent";

const PostsList = () => {
  //select post from store
  const posts = useSelector((state) => state?.post);
  const category = useSelector((state) => state?.category);

  const { postlist, appErr, serverErr, likes, dislikes } = posts;
  //dispstch
  const dispatch = useDispatch();
  //fetch post
  useEffect(() => {
    dispatch(fetchPostAction());
  }, [dispatch, likes, dislikes]);
  //fetch category
  useEffect(() => {
    dispatch(fetchCategoriesAction());
  }, [dispatch]);

  const {
    categoryList,
    appError: C__appErr,
    serverErr: C__serverErr,
    loading: C__loading,
  } = category;
  console.log(postlist);
  return (
    <>
      <section>
        <div className="py-20 bg-gray-900 min-h-screen radius-for-skewed">
          <div className="container mx-auto px-4">
            <div className="mb-16 flex flex-wrap items-center">
              <div className="w-full lg:w-1/2">
                <span className="text-green-600 font-bold">
                  Latest Posts from our awesome authors
                </span>
                <h2 className="text-4xl text-gray-300 lg:text-5xl font-bold font-heading">
                  Latest Post
                </h2>
              </div>
              <div className=" block text-right w-1/2">
                {/* View All */}
                <button
                  onClick={() => dispatch(fetchPostAction())}
                  className="inline-block py-2 px-6 rounded-l-xl rounded-t-xl bg-green-600 hover:bg-green-700 text-gray-50 font-bold leading-loose transition duration-200"
                >
                  View All Posts
                </button>
              </div>
            </div>
            <div className="flex flex-wrap -mx-3">
              <div className="mb-8 lg:mb-0 w-full lg:w-1/4 px-3">
                <div className="py-4 px-6 bg-gray-600 shadow rounded">
                  <h4 className="mb-4 text-gray-500 font-bold uppercase">
                    Categories
                  </h4>
                  <ul>
                    {C__loading ? (
                      <LoadingComponent />
                    ) : C__serverErr || C__serverErr ? (
                      <h1>
                        {C__serverErr} {C__appErr}
                      </h1>
                    ) : categoryList?.length <= 0 ? (
                      <h1 className="text-yellow-400 text-center text-lg">
                        Category Not Found
                      </h1>
                    ) : (
                      categoryList?.map((item, _) => {
                        return (
                          <li key={_}>
                            <p
                              onClick={() =>
                                dispatch(fetchPostAction(item?.title))
                              }
                              className="block cursor-pointer py-2 px-3 mb-4 rounded text-yellow-500 font-bold bg-gray-500"
                            >
                              {item?.title}
                            </p>
                          </li>
                        );
                      })
                    )}
                  </ul>
                </div>
              </div>
              <div className="w-full lg:w-3/4 px-3">
                {/* post goes here */}
                {serverErr || appErr ? (
                  <h1 className="text-red-600 text-center text-lg">
                    {serverErr} {appErr}
                  </h1>
                ) : postlist?.length <= 0 ? (
                  <h1 className="text-yellow-400 text-center text-lg">
                    No Post Found
                  </h1>
                ) : (
                  postlist?.map((item, _) => {
                    return (
                      <div
                        className="flex flex-wrap bg-gray-900 -mx-3  lg:mb-6"
                        key={_}
                      >
                        <div className="mb-10  w-full lg:w-1/4 ">
                          <Link>
                            {/* Post image */}
                            <img
                              className="w-full h-full object-cover rounded"
                              src={item?.image}
                              alt=""
                            />
                          </Link>
                          {/* Likes, views dislikes */}
                          <div className="flex flex-row bg-gray-300 justify-center w-full  items-center ">
                            {/* Likes */}
                            <div className="flex flex-row justify-center items-center ml-4 mr-4 pb-2 pt-1">
                              {/* Togle like  */}
                              <div className="">
                                <ThumbUpIcon
                                  onClick={() =>
                                    dispatch(likesPostAction(item?._id))
                                  }
                                  className="h-7 w-7 text-indigo-600 cursor-pointer"
                                />
                              </div>
                              <div className="pl-2 text-gray-600">
                                {item?.likes?.length ? item?.likes?.length : 0}
                              </div>
                            </div>
                            {/* Dislike */}
                            <div className="flex flex-row  justify-center items-center ml-4 mr-4 pb-2 pt-1">
                              <div>
                                <ThumbDownIcon
                                  onClick={() =>
                                    dispatch(dislikesPostAction(item?._id))
                                  }
                                  className="h-7 w-7 cursor-pointer text-gray-600"
                                />
                              </div>
                              <div className="pl-2 text-gray-600">
                                {item?.dislikes?.length
                                  ? item?.dislikes?.length
                                  : 0}
                              </div>
                            </div>
                            {/* Views */}
                            <div className="flex flex-row justify-center items-center ml-4 mr-4 pb-2 pt-1">
                              <div>
                                <EyeIcon className="h-7 w-7  text-gray-400" />
                              </div>
                              <div className="pl-2 text-gray-600">
                                {item?.views}
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="w-full lg:w-3/4 px-3">
                          <Link className="hover:underline">
                            <h3 className="mb-1 text-2xl text-green-400 font-bold font-heading">
                              {/* {capitalizeWord(post?.title)} */}
                              {item?.title}
                            </h3>
                          </Link>
                          <p className="text-gray-300">{item?.description}</p>
                          {/* Read more */}
                          <Link
                            to={`/posts/${item?._id}`}
                            className="text-indigo-500 hover:underline"
                          >
                            Read More..
                          </Link>
                          {/* User Avatar */}
                          <div className="mt-6 flex items-center">
                            <div className="flex-shrink-0">
                              <Link to={`/profile/${item?.author?._id}`}>
                                <img
                                  className="h-10 w-10 rounded-full"
                                  src={item?.author?.profilePhoto}
                                  alt=""
                                />
                              </Link>
                            </div>
                            <div className="ml-3">
                              <p className="text-sm font-medium text-gray-900">
                                <Link
                                  to={`/profile/${item?.author?._id}`}
                                  className="text-yellow-400 hover:underline "
                                >
                                  {item?.author?.firstname}{" "}
                                  {item?.author?.lastname}
                                </Link>
                              </p>
                              <div className="flex space-x-1 text-sm text-green-500">
                                <time>
                                  <DateFormatter date={item?.createdAt} />
                                </time>
                                <span aria-hidden="true">&middot;</span>
                              </div>
                            </div>
                          </div>
                          {/* <p className="text-gray-500">
                          Quisque id sagittis turpis. Nulla sollicitudin rutrum
                          eros eu dictum...
                        </p> */}
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="bg-gray-900">
          <div className="skew bg-green-500 skew-bottom mr-for-radius">
            <svg
              className="h-8 md:h-12 lg:h-10 w-full text-gray-900"
              viewBox="0 0 10 10"
              preserveAspectRatio="none"
            >
              <polygon fill="currentColor" points="0 0 10 0 0 10"></polygon>
            </svg>
          </div>
          <div className="skew bg-gray-500  skew-bottom ml-for-radius">
            <svg
              className="h-8 bg-gray-500 md:h-12 lg:h-20 w-full text-gray-900"
              viewBox="0 0 10 10"
              preserveAspectRatio="none"
            >
              <polygon fill="currentColor" points="0 0 10 0 10 10"></polygon>
            </svg>
          </div>
        </div>
      </section>
    </>
  );
};

export default PostsList;
