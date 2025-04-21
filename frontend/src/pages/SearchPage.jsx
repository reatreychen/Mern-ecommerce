import {useEffect, useState} from "react";
import CardLoading from "../components/CardLoading.jsx";
import Axios from "../utils/Axios.js";
import summaryApi from "../common/SummaryApi.js";
import CardProduct from "../components/CardProduct.jsx";
import InfiniteScroll from 'react-infinite-scroll-component';
import {useLocation} from "react-router-dom";
import noImage from "../assets/nothing here yet-CqZhxGpa.webp"
const SearchPage = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const loadingArrayCard = new Array(10).fill(null);
    const [page, setPage] = useState(1);
    const [totlaPage, setTotlaPage] = useState(1);
    const params = useLocation()
    const searchText = params.search.slice(3)
    const fetchData = async () => {
        try {
            setLoading(true);
            const response = await Axios({
                ...summaryApi.searchProduct,
                data: {
                    search: searchText,
                    page : page
                }
            })

            const dataResponse = response.data;
            if (dataResponse.success) {
                if (dataResponse.page == 1) {
                    setData(dataResponse.data);
                } else {
                    setData((prev) => {
                        return [
                            ...prev,
                            ...dataResponse.data
                        ]
                    })
                }
                setTotlaPage(dataResponse.totalPage)
                console.log("Search data", dataResponse);
            }
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchData();
    }, [page , searchText])

    const handleFetchMore = () => {
        if (totlaPage > page) {
            setPage(prev => prev + 1);
        }
    }
    return (
        <section>
            <div className={"container mx-auto p-4"}>
                <p className={"font-semibold inter text-xl"}>Search Results: {data.length}</p>
                <InfiniteScroll dataLength={data.length} hasMore={true}
                next={handleFetchMore}
                >
                    <div className={"grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-2"}>
                        {
                            data.map((p, index) => {
                                return (
                                    <CardProduct data={p} key={index}/>
                                )
                            })
                        }
                        {/*  Loading data*/}
                        {
                            loading && (
                                loadingArrayCard.map(((_, index) => {
                                    return (
                                        <CardLoading key={index}/>
                                    )
                                }))
                            )
                        }
                    </div>

                </InfiniteScroll>

                {
                    // no data
                    !data[0] && (
                        <div className={"flex flex-col justify-center items-center w-full mx-auto"}>
                            <img src={noImage} className={"w-full h-full max-w-xs max-h-xs block"}/>
                            <p className={"font-semibold my-2"}>No Data Found</p>
                        </div>
                    )
                }
            </div>
        </section>
    )
}

export default SearchPage