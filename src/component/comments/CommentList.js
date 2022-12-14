import { Link } from "react-router-dom";
import { PencilAltIcon, TrashIcon } from "@heroicons/react/solid";
import Moment from "react-moment";

import { useDispatch, useSelector } from "react-redux";
import { deleteCommentAction } from "../../redux/slices/comments/commentsSlices";
export default function CommentsList({ comments }) {
  const userAuth = useSelector(state=>state?.users?.userAuth)
  console.log(userAuth);
  const dispatch = useDispatch()
  console.log("user", comments);
  return (
    <div>
      <ul className="divide-y bg-gray-700 w-96 divide-gray-200 p-3 mt-5">
        <div className="text-gray-400">{comments?.length} Comments</div>
        <>
          {comments?.length <= 0 ? (
            <h1 className="text-yellow-400 text-lg text-center">No comments</h1>
          ) : (
            comments?.map((comment) => (
              <>
                <li className="py-4  w-full">
                  <div className="flex space-x-3">
                    <img
                      className="h-6 w-6 rounded-full"
                      src={comment?.user?.profilePhoto}
                      alt=""
                    />
                    {console.log(comment?.user?.profilePhoto)}
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center justify-between">
                        <Link to={`/profile/${comment?.user?._id}`}>
                        <h3 className="text-sm font-medium text-green-400">
                          {comment?.user?.firstname} {comment?.user?.lastname}
                        </h3>
                        </Link>
                        <p className="text-bold text-yellow-500 text-base ml-5">
                          {/* <Moment fromNow ago>
                      {comment?.createdAt}
                    </Moment> */}

                          <Moment fromNow ago>
                            {comment?.createdAt}
                          </Moment>
                        </p>
                      </div>
                      <p className="text-sm text-gray-400">
                        {comment?.description}
                      </p>
                      {/* Check if is the same user created this comment */}
                      {userAuth?._id ===comment?.user?._id?  <p className="flex">
                        <Link className="p-3" to={`/update-comment/${comment?._id}`}>
                          <PencilAltIcon className="h-5 mt-3 text-yellow-300" />
                        </Link>
                        <button className="ml-3" onClick={()=>dispatch(deleteCommentAction(comment?._id))}>
                          <TrashIcon className="h-5 mt-3 text-red-600" />
                        </button>
                      </p>: null}
                     
                    </div>
                  </div>
                </li>
              </>
            ))
          )}
        </>
      </ul>
    </div>
  );
}
