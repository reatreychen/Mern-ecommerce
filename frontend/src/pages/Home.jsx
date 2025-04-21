import React from 'react'
import banner from "../assets/banner.jpg"
import bannerMobile from "../assets/banner-mobile.jpg"
import { useSelector } from 'react-redux'
import CategoryWiseProductDisplay from '../components/CategoryWiseProductDisplay'
import { useNavigate } from 'react-router-dom'
import { valideURLConvert } from '../utils/validURLConvert'
const Home = () => {
    const loadingCategory = useSelector((state)=> state.product.loadingCategory)
    const categoryData = useSelector((category)=> category.product.allCategory)
    const subCategoryData = useSelector((category)=> category.product.allSubCategory)
    const navigate = useNavigate()
    const handleRedirectProductListpage = (id, cat) => {
      const subcategory = subCategoryData.find((sub) =>
        sub.category.filter((c) => c._id  === id)
      );
      const url = `/${valideURLConvert(cat)}-${id}/${valideURLConvert(subcategory.name)}-${subcategory._id}`;
      navigate(url);
    };
  return (
    <section className=' bg-white'>
      <div className=' container mx-auto'>
        <div className={`w-full h-full min-h-48 bg-blue-100 rounded ${!banner && "animate-pulse my-2" } `}>
          <img src={banner} alt="banner" className='w-full h-full lg:block hidden'/>
          <img src={bannerMobile} alt="banner-mobile"  className=' w-full h-full lg:hidden'/>
        </div>

        <div className='container mx-auto px-4 my-2 grid grid-cols-5 md:grid-cols-8 lg:grid-cols-10  gap-2'>
          {
            loadingCategory ? (
              new Array(20).fill(null).map(()=>{
                return (
                  <div className='bg-white rounded p-4 min-h-40 grid gap-2 shadow animate-pulse'>
                    <div className=' bg-blue-100 min-h24 rounded'></div>
                    <div className='bg-blue-100 h-8 rounded'></div>
                  </div>
                )
              })
            ): (
              categoryData.map((c)=> {
                return (
                  <div key={c._id+"displayCategory"} onClick={()=>handleRedirectProductListpage(c._id,c.name)} className='w-full h-full cursor-pointer'>
                    <div>
                      <img src={c.image} alt={c.name} className='w-full h-full object-scale-down' />
                    </div>
                  </div>
                )
              })
            )
          }
        </div>
      </div>
      {/* display category product */}
      {
        categoryData.map((c,index)=> {
          return (
            <CategoryWiseProductDisplay
            key={index}
            id={c?._id} 
            name={c?.name}
            />
          )
        })
      }
    </section>
  )
}

export default Home