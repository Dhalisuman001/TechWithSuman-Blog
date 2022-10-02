import { useEffect } from "react";

import { PlusCircleIcon, BookOpenIcon } from "@heroicons/react/solid";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";

import {
  updateCategoryAction,
  fetchSingleCategoryAction,
  deleteCategoryAction,
} from "../../redux/slices/category/CategorySlice";
import * as Yup from "yup";
import { Navigate, useParams } from "react-router";

const FormSchema = Yup.object({
  title: Yup.string().required("Title is required"),
});
const UpdateCategory = () => {
  const { id } = useParams();

  //dispatch
  const dispatch = useDispatch();

  //useEffect

  useEffect(() => {
    dispatch(fetchSingleCategoryAction(id));
    // eslint-disable-next-line
  }, []);
  //access store
  const store = useSelector((state) => state?.category);

  const { appError, loading, serverErr, fetchCategory, isUpdated, isDeleted } =
    store;

  //formik
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: fetchCategory?.title,
    },
    onSubmit: (values) => {
      //dispath the action
      dispatch(updateCategoryAction({ title: values?.title, id }));
      // console.log(values);
    },
    validationSchema: FormSchema,
  });
  if (isUpdated || isDeleted) return <Navigate to="/fetch-category" />;
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <BookOpenIcon className="mx-auto h-12 w-auto" />
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Update Category
          </h2>
          <div className="mt-2 text-center text-sm text-gray-600">
            <p className="font-medium text-indigo-600 hover:text-indigo-500">
              These are the categories user will select when creating a post
            </p>
            {/* dispaly error */}
            {appError || serverErr ? (
              <h3 className="text-red-400">
                {appError} - {serverErr}
              </h3>
            ) : null}
          </div>
        </div>
        {/* Form */}
        <form className="mt-8 space-y-6" onSubmit={formik.handleSubmit}>
          <input type="hidden" name="remember" defaultValue="true" />
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email-address" className="sr-only">
                Name
              </label>
              {/* Title */}
              <input
                value={formik.values.title}
                onChange={formik.handleChange("title")}
                onBlur={formik.handleBlur("title")}
                type="text"
                autoComplete="text"
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-center focus:z-10 sm:text-sm"
                placeholder="Update Category"
              />
              <div className="text-red-400 mb-2">
                {formik.touched.title && formik.errors.title}
              </div>
            </div>
          </div>

          <div>
            <div>
              {/* Submit */}
              {loading ? (
                <button
                  type="submit"
                  disabled
                  className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-gray-600"
                >
                  <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                    <PlusCircleIcon
                      className="h-5 w-5 text-yellow-500 group-hover:text-indigo-400"
                      aria-hidden="true"
                    />
                  </span>
                  Creating..
                </button>
              ) : (
                <>
                  <button
                    type="submit"
                    className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-yellow-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                      <PlusCircleIcon
                        className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
                        aria-hidden="true"
                      />
                    </span>
                    Update Category
                  </button>
                  <button
                    onClick={() => dispatch(deleteCategoryAction(id))}
                    type="submit"
                    className="group mt-2 relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Delete Category
                  </button>
                </>
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateCategory;
