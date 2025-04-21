import {useParams} from "react-router-dom";
import Axios from "../utils/Axios.js"
import summaryApi from "../common/SummaryApi.js";
import {useEffect, useRef, useState} from "react";
import Divider from "../components/Divider.jsx";
import image1 from "../assets/image 1.png"
import image2 from "../assets/image 2.png"
import image3 from "../assets/image 3.png"
import {FaAngleLeft, FaAngleRight} from "react-icons/fa"
import AddToCartButton from "../components/AddToCartButton.jsx";

const ProductDisplay = () => {
    const [data, setData] = useState({
        name: "",
        image: []
    })
    const [image, setImage] = useState(0)
    const params = useParams()
    const imageContainer = useRef()
    const productId = params.product.split("-").splice(-1)[0]
    const fetchProductData = async () => {
        try {
            const response = await Axios({
                ...summaryApi.getProductDetail,
                data: {
                    productId: productId,
                }
            })

            const dataResponse = await response.data
            console.log("product data response", dataResponse)
            if (dataResponse.success) {
                setData(dataResponse.data);
            }
        } catch (err) {
            console.log(err);
        }
    }

    const handleScrollLeft = () => {
        imageContainer.current.scrollLeft -= 100
    }

    const handleScrollRight = () => {
        imageContainer.current.scrollLeft += 100
    }
    useEffect(() => {
        fetchProductData();
    }, [params])
    return (
        <section className="container mx-auto p-3 grid lg:grid-cols-2">
            <div>
                {/* image */}
                <div className=" bg-white lg:min-h-[65vh] lg:max-h-[65vh] rounded min-h-56 max-h-56 h-full w-full">
                    <img src={data.image[image]} alt={data.name} className=" w-full h-full object-scale-down"/>
                </div>

                <div className='flex items-center justify-center gap-3 my-2'>
                    {
                        data.image.map((img, index) => {
                            return (
                                <div key={img + index + "point"}
                                     className={`bg-slate-300 w-3 h-3 lg:w-5 lg:h-5 rounded-full ${index === image && "bg-slate-400"}`}></div>
                            )
                        })
                    }
                </div>

                <div className={"grid relative"}>
                    <div ref={imageContainer} className={"flex gap-3 z-10 w-full overflow-x-auto scrollbar-none"}>
                        {
                            data.image.map((img, index) => {
                                return (
                                    <div key={index} className={"w-20 h-20 min-w-20 min-h-20 cursor-pointer shadow-md"}>
                                        <img src={img} onClick={() => setImage(index)} alt={data.name}
                                             className="w-full h-full object-scale-down"/>
                                    </div>
                                )
                            })
                        }
                    </div>
                    
                    <div className='w-full -ml-3 h-full hidden lg:flex justify-between absolute  items-center'>
                        <button onClick={handleScrollLeft}
                                className='z-10 bg-white relative p-1 rounded-full shadow-lg'>
                            <FaAngleLeft/>
                        </button>
                        <button onClick={handleScrollRight}
                                className='z-10 bg-white relative p-1 rounded-full shadow-lg'>
                            <FaAngleRight/>
                        </button>
                    </div>
                </div>
                <div className={"my-4 hidden lg:grid gap-3"}>
                    <div>
                        <p className={"font-semibold inter"}>Description:</p>
                        <p className={"font-semibold inter"}>{data.description}
                        </p>
                    </div>

                    <div>
                        <p className={"font-semibold inter"}>unit : {data.unit}</p>
                    </div>
                </div>
            </div>

            <div className={"p-4 lg:pl-7 text-base lg:text-lg"}>
                <p className={" bg-green-600 w-fit px-2 rounded-full font-semibold"}>10 Min</p>
                <p className={"my-2 font-semibold inter text-2xl "}>{data.name}</p>
                <p className={"font-semibold text-xl inter "}>{data.unit}</p>
                <Divider/>
                <div className={"grid gap-2"}>
                    <h2 className={"font-semibold text-xl inter"}>Price:</h2>
                    <div className={"flex gap-3 items-center"}>
                        <div className={"border border-green-800 px-4 py-2 rounded bg-green-50 w-fit"}>
                            <p className={"font-semibold inter text-lg lg:text-xl"}>$ {data.price && data.discount}</p>
                        </div>
                        {
                            data.discount && (
                                <p className='line-through'>${data.price}</p>
                            )
                        }
                        {
                            data.discount && (
                                <p className="font-bold text-green-600 lg:text-2xl">{data.discount}% <span
                                    className='text-base text-neutral-500'>Discount</span></p>
                            )
                        }
                    </div>
                </div>
                {
                data.stock === 0 ? (
                  <p className='text-lg text-red-500 my-2'>Out of Stock</p>
                ) 
                : (
                  <div className='my-4'>
                    <AddToCartButton data={data}/>
                  </div>
                )
              }
                <div className={"my-1"}>
                    <h3 className={"font-semibold text-xl inter "}>Why shop from Reatreyit?</h3>
                    <div className={"flex items-center gap-3 my-2"}>
                        <img
                            src={image1}
                            alt='superfast delivery'
                            className='w-20 h-20'
                        />
                        <div className='text-sm'>
                            <div className='font-semibold text-sm inter '>Superfast Delivery</div>
                            <p className={"font-semibold text-sm inter"}>Get your orer delivered to your doorstep at the
                                earliest from dark stores near you.</p>
                        </div>
                    </div>

                    <div className={"flex items-center gap-3 my-2"}>
                        <img
                            src={image2}
                            alt='superfast delivery'
                            className='w-20 h-20'
                        />
                        <div className='text-sm'>
                            <div className='font-semibold text-sm inter '>Best Prices & Offers</div>
                            <p className={"font-semibold text-sm inter"}>Best price destination with offers directly
                                from the nanufacturers.</p>
                        </div>
                    </div>

                    <div className={"flex items-center gap-3 my-2"}>
                        <img
                            src={image3}
                            alt='superfast delivery'
                            className='w-20 h-20'
                        />
                        <div className='text-sm'>
                            <div className='font-semibold text-sm inter '>Wide Assortment
                            </div>
                            <p className={"font-semibold text-sm inter"}>Choose from 5000+ products across food personal
                                care, household & other categories.</p>
                        </div>
                    </div>


                    <div className={"my-4 hidden lg:grid gap-3"}>
                        <div>
                            <p className={"font-semibold inter"}>Description:</p>
                            <p className={"font-semibold inter"}>{data.description}</p>
                        </div>

                        <div>
                            <p className={"font-semibold inter"}>unit : {data.unit}</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default ProductDisplay