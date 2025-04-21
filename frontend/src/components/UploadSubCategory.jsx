import React, { useState } from 'react'
import uploadImage from '../utils/uploadImage'
import { IoMdClose } from 'react-icons/io';
import { useSelector } from 'react-redux';
import Axios from '../utils/Axios';
import SummaryApi from '../common/SummaryApi';
import toast from 'react-hot-toast';
const UploadSubCategory = ({close, fetchData}) => {
  const [subcategoryData , setSubCategoryData] = useState({
    name: "",
    image: "",
    category: [],
  })
  console.log("category upload", subcategoryData)
  const allCategory = useSelector(state => state.product.allCategory)
  const [loading , setLoading] = useState(false)
  const handleChange = (e) =>{
    const {name , value} = e.target
    setSubCategoryData((pre)=> ({
      ...pre,
      [name] : value
    }))
  }

  const handleUploadCategoryImage = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      const response = await uploadImage(file);
      setSubCategoryData((prev) => ({
        ...prev,
        image: response.data.url,
      }));
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };
  const handleRemoveCategorySelector = (categoryId) =>{
    const index = subcategoryData.category.findIndex(element => element._id === categoryId)
    subcategoryData.category.slice(index,1)
    setSubCategoryData((prev) =>{
      return {
        category: prev.category.filter(element => element._id!== categoryId)
      }
    })
  }
  
  const handleSubmit = async(e) =>{
    e.preventDefault()
    try {
      const response = await Axios({
        ...SummaryApi.addSubCategory,
        data: subcategoryData,
      })
      const dataResponse = response.data
      console.log("upload sub category", dataResponse)
      if(dataResponse.success){
        toast.success(dataResponse.message)
        close()
        fetchData();
      }
    }catch (error) {
      console.error('Error submitting form:', error);
    }
  }

  return (
    <section className='fixed top-0 p-4 bottom-0 left-0 right-0 bg-neutral-800 bg-opacity-60 flex items-center justify-center'>
          <div className='bg-white max-w-4xl w-full p-4 rounded'>
            <div className='flex justify-between items-center'>
              <h1 className='font-semibold'>Sub Category</h1>
              <button className='w-fit block ml-auto' onClick={close}>
                <IoMdClose size={25} />
              </button>
            </div>
    
            <form className='grid gap-1 my-3' onSubmit={handleSubmit}>
              <div className='grid gap-1'>
                <label htmlFor='categoryName' className='font-normal'>Name:</label>
                <input
                  type='text'
                  id='categoryName'
                  name='name'
                  value={subcategoryData.name}
                  onChange={handleChange}
                  placeholder='Enter Category Name'
                  className='border rounded p-2 font-normal border-primary-100 bg-slate-50'
                />
              </div>
    
              <div className='mt-2'>
                <p className='font-normal'>Image</p>
                <div className='flex gap-4 flex-col lg:flex-row items-center'>
                  <div className='border bg-blue-50 h-36 w-36 flex items-center justify-center rounded mt-2'>
                    {subcategoryData.image ? (
                      <img src={subcategoryData.image} alt='Category' className='w-full h-full object-cover' />
                    ) : (
                      <p className='text-sm'>No Image</p>
                    )}
                  </div>
                  <label htmlFor='uploadCategoryImage'>
                    <div className={` bg-primary-200 cursor-pointer px-3 py-2 rounded text-white font-semibold`}>Upload Image</div>
                    <input
                      onChange={handleUploadCategoryImage}
                      type='file'
                      id='uploadCategoryImage'
                      className='hidden'
                    />
                  </label>
                </div>
              </div>
              <div className=' mt-2 grid gap-2'>
                    <label htmlFor="category" className=' font-medium'>Select Category:</label>
                    <div className=' border border-primary-200 rounded-lg px-2'>
                      {/* display value  */}
                      <div className=' flex flex-wrap gap-2'>
                      {
                        subcategoryData.category.map((category) => {
                          return (
                            <p className=' flex items-center gap-2 bg-white shadow-md px-1 m-1' key={category._id + "Selected"}>{category.name}
                            <div onClick={()=>handleRemoveCategorySelector(category._id)} className=' cursor-pointer text-red-700 hover:text-red-800'>
                              <IoMdClose size={14}/>
                            </div>
                            </p>
                            
                          )
                        })
                      }
                      </div>
                      {/* select category */}
                      <select name="category" id="category"
                        className=' w-full p-2 outline-none  bg-transparent'
                        onChange={(e)=>{
                          const value = e.target.value
                          const categoryDetails = allCategory.find(el => el?._id == value)
                          
                          setSubCategoryData((preve)=>{
                              return{
                                  ...preve,
                                  category : [...preve.category,categoryDetails]
                              }
                          })
                      }}
                      value={" "}
                      >
                        <option value={" "} disabled className=''>Select Category</option>
                        {
                          allCategory.map((category) => (
                            <option key={category._id+"subcategory"} value={category?._id}>{category.name}</option>
                          ))
                        }
                      </select>
                    </div>
                    
                  </div>
              <button
                className={`bg-primary-200 hover:bg-primary-200  cursor-pointer font-semibold rounded px-3 py-1 mt-3 text-white`}
              >
                {loading ? 'Adding...' : 'Add Sub Category'}
              </button>
            </form>
          </div>
        </section>
  )
}

export default UploadSubCategory