import Axios from "./Axios";
import SummaryApi from "../common/SummaryApi";

const fetchUserDetail = async () => {
    try {
        const response = await Axios({
            ...SummaryApi.userDetails,
        })
        return response
    }catch (error) {
        console.error(error)
    }
}

export default fetchUserDetail