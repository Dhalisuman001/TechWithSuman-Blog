import React, { useEffect } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { PencilAltIcon, TrashIcon } from "@heroicons/react/solid";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchPostDetailsAction,
  deletePostAction,
} from "../../redux/slices/posts/PostSlices";
import DateFormatter from "../../redux/utils/DateFormatter";
import LoadingComponent from "../../redux/utils/LoadingComponent";
import AddComment from "../comments/NewComment";
import CommentsList from "../comments/CommentList";
const PostDetails = () => {
 
  const { id } = useParams();
  //   console.log(id);

  //dispatch
  const dispatch = useDispatch();
  /// fetch post details
const user = useSelector(state=>state.users?.userAuth)
  const comment = useSelector(state=>state.comment);
  const {commentCreated,commentDeleted,} = comment
  useEffect(() => {
    dispatch(fetchPostDetailsAction(id));
    // eslint-disable-next-line
  }, [dispatch,id, commentCreated,commentDeleted]);
  //store
  const post = useSelector((state) => state?.post);
  const { appErr, postDetails, serverErr, loading, isDeleted } = post;
  console.log(post);
  if (isDeleted) return <Navigate to="/posts" />;
  return (
    <>
      {loading ? (
        <div className="h-screen">
          <LoadingComponent />
        </div>
      ) : serverErr || appErr ? (
        <h1 className="h-screen text-red-400 text-xl">
          {serverErr} {appErr}
        </h1>
      ) : (
        <section className="py-20 2xl:py-40 bg-gray-800 overflow-hidden ">
          <div className="container px-4 mx-auto ">
            {/* Post Image */}
            <img
              className="mx-auto object-cover rounded-full"
              src={postDetails?.image}
              alt=""
            />
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="mt-7 mb-14 text-6xl 2xl:text-7xl text-white font-bold font-heading">
                {postDetails?.title}
              </h2>

              {/* User */}
              <Link to={`/profile/${postDetails?.author?._id}`}>
              <div className="inline-flex pt-14 mb-14 items-center border-t border-gray-500">
                <img
                  className="mr-8 w-20 lg:w-24 h-20 lg:h-24 rounded-full"
                  src={postDetails?.author?.profilePhoto}
                  alt=""
                />
                <div className="text-left">
                  <h4 className="mb-1 text-2xl font-bold text-gray-50">
                    <span className="text-xl lg:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-yellow-200 to-orange-600">
                      {postDetails?.author?.firstname}{" "}
                      {postDetails?.author?.lastname}
                    </span>
                  </h4>
                  <p className="text-gray-500">
                    <DateFormatter date={postDetails?.createdAt} />
                  </p>
                </div>
              </div>
              </Link>
              {/* Post description */}
              <div className="max-w-xl mx-auto">
                <p className="mb-6 text-left  text-xl text-gray-200">
                  {postDetails?.description}

                  {/* Show delete and update btn if created user */}
                  <p className="flex">
                    <Link
                      className="p-3"
                      to={`/update-post/${postDetails?._id}`}
                    >
                      <PencilAltIcon className="h-8 mt-3 text-yellow-300" />
                    </Link>
                    <button className="ml-3">
                      <TrashIcon
                        onClick={() =>
                          dispatch(deletePostAction(postDetails?._id))
                        }
                        className="h-8 mt-3 text-red-600"
                      />
                    </button>
                  </p>
                </p>
              </div>
            </div>
          </div>
          {/* Add comment Form component here */}
          {user?<AddComment postId={id} />:null}
          
          <div className="flex justify-center  items-center">
            {/* <CommentsList comments={post?.comments} postId={post?._id} /> */}
            <CommentsList
              comments={postDetails?.comments}
              postId={postDetails?._id}
            />
          </div>
        </section>
      )}
    </>
  );
};

export default PostDetails;
