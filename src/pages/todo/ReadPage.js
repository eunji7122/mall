import React from 'react';
import {useNavigate, useParams} from "react-router-dom";
import ReadComponent from "../../components/todo/ReadComponent";

function ReadPage(props) {
    const navigate = useNavigate()
    const {tno} = useParams()

    // const [queryParams] = useSearchParams()
    //
    // const page = queryParams.get("page") ? parseInt(queryParams.get("page")) : 1
    // const size = queryParams.get("size") ? parseInt(queryParams.get("size")) : 10
    //
    // const queryStr = createSearchParams({page: page, size: size}).toString()
    //
    // const moveToModify = (tno) => {
    //     navigate({
    //         pathname: `/todo/modify/${tno}`,
    //         search: queryStr
    //     })
    // }
    //
    // const moveToList = () => {
    //     navigate({
    //         pathname: `/todo/list`,
    //         search: queryStr
    //     })
    // }

    return (
        <div className="font-extrabold w-full bg-white mt-6">
            <div className="text-3xl">
                Todo Read Page {tno}
            </div>

            <ReadComponent tno={tno}/>
        </div>

    );
}

export default ReadPage;