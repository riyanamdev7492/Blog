import React, { useState } from "react";
import { useMutation } from 'react-query';
import axios from 'axios';

const createArticle = async (articleData) => {
  const response = await axios.post('http://127.0.0.1:8000/api/articles/create', articleData);
  return response.data;
}

const CreateArticle = () => {
  const [formData, setFormData] = useState({
    title: '',
    body: ''
  });

  const { title, body } = formData;

  const { mutate, isLoading, isError, isSuccess, error} = useMutation(createArticle, {
    onSuccess: () => {
      alert('Article created successfully!');
      setFormData({ title: '', body: '' });
    },
    onError: () => {
      alert(`Error creating article: ${error.message}`);
    }
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  }
  
  const handleSubmit = (event) => {
    event.preventDefault();
    mutate(formData);
  }
  return(
    <>
      <div className="container xl:max-w-screen-lg md:max-w-[920px] mx-auto py-5">
        <form onSubmit={handleSubmit}>
          <div className="space-y-12">
            <div className="border-b border-gray-900/10 pb-12">
              <h2 className="text-base font-semibold leading-7 text-gray-900">Create Article</h2>
              <p className="mt-1 text-sm leading-6 text-gray-600">This information will be displayed publicly so be careful what you share.</p>

              <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="sm:col-span-4">
                  <label htmlFor="title" className="block text-sm font-medium leading-6 text-gray-900">Title</label>
                  <div className="mt-2">
                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                      <input
                        type="text"
                        name="title"
                        id="title"
                        value={title}
                        onChange={handleChange}
                        className="block flex-1 border-0 bg-transparent py-1.5 text-gray-900 placeholder:text-gray-400 focus:ring-0 px-3 sm:text-sm sm:leading-6"
                        placeholder="Title"
                      />
                    </div>
                  </div>
                </div>

                <div className="col-span-full">
                  <label htmlFor="body" className="block text-sm font-medium leading-6 text-gray-900">Body</label>
                  <div className="mt-2">
                    <textarea
                      id="body"
                      name="body"
                      rows="3"
                      value={body}
                      onChange={handleChange}
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    ></textarea>
                  </div>
                  <p className="mt-3 text-sm leading-6 text-gray-600">Write a few sentences about this blog.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 flex items-center justify-end gap-x-6">
            <button type="button" className="text-sm font-semibold leading-6 text-gray-900">Cancel</button>
            <button
              type="submit"
              disabled={isLoading}
              className={`rounded-md px-3 py-2 text-sm font-semibold shadow-sm ${
                isLoading ? 'bg-gray-500 cursor-not-allowed' : 'bg-indigo-600 text-white hover:bg-indigo-500'
              }`}
            >
              {isLoading ? 'Saving...' : 'Save'}
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default CreateArticle;