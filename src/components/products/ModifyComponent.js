import React, {useEffect, useRef, useState} from 'react';
import FetchingModal from "../common/FetchingModal";
import {deleteProduct, getOne, putProduct} from "../../api/productsApi";
import {API_SERVER_HOST} from "../../api/todoApi";
import useCustomMove from "../../hooks/useCustomMove";
import ResultModal from "../common/ResultModal";


const initState = {
    pno: 0,
    pname: '',
    pdesc: '',
    price: 0,
    delFlag: false,
    uploadedFileNames: []
}

const host = API_SERVER_HOST

function ModifyComponent({pno}) {

    const [product, setProduct] = useState(initState)

    const [fetching, setFetching] = useState(false)

    const [result, setResult] = useState(false)

    const {moveToRead, moveToList} = useCustomMove()

    const uploadRef = useRef()

    useEffect(() => {
        setFetching(true)

        getOne(pno).then(data => {
            setProduct(data)
            setFetching(false)
        })

    },[pno])

    const handleChangeProduct = (e) => {
        product[e.target.name] = e.target.value
        setProduct({...product})
    }
    const deleteOldImages = (imageName) => {

        // 삭제할 이미지 제거
        const resultFileNames = product.uploadedFileNames.filter(fileName => fileName !== imageName)
        product.uploadedFileNames = resultFileNames
        setProduct({...product})
    }

    const handleClickModify = () => {
        const files = uploadRef.current.files
        const formData = new FormData()

        for (let i = 0; i < files.length; i++) {
            formData.append("files", files[i]);
        }

        formData.append("pname", product.pname)
        formData.append("pdesc", product.pdesc)
        formData.append("price", product.price)
        formData.append("delFlag", product.delFlag)

        for(let i = 0; i < product.uploadedFileNames.length ; i++){
            formData.append("uploadFileNames", product.uploadedFileNames[i])
        }

        setFetching(true)

        putProduct(pno, formData).then(data => {
            setResult('Modified')
            setFetching(false)
        })
    }

    const handleClickDelete = () => {

        setFetching(true)

        deleteProduct(pno).then(data => {
            setResult("Deleted")
            setFetching(false)
        })
    }

    const closeModal = () => {

        if (result === 'Modified') {
            moveToRead(pno) //조회 화면으로 이동
        } else if(result === "Deleted") {
            moveToList({page:1})
        }

        setResult(null)
    }

    return (
        <div className = "border-2 border-sky-200 mt-10 m-2 p-4">

            {fetching? <FetchingModal/> :<></>}

            {result?
                <ResultModal
                    title={`${result}`}
                    content={'정상적으로 처리되었습니다.'} //결과 모달창
                    callbackFn={closeModal}/>
                :
                <></>
            }

            <div className="flex justify-center">
                <div className="relative mb-4 flex w-full flex-wrap items-stretch">
                    <div className="w-1/5 p-6 text-right font-bold">Product Name</div>
                    <input className="w-4/5 p-6 rounded-r border border-solid border-neutral-300 shadow-md"
                           name="pname"
                           type={'text'}
                           value={product.pname}
                           onChange={handleChangeProduct} />
                </div>
            </div>
            <div className="flex justify-center">
                <div className="relative mb-4 flex w-full flex-wrap items-stretch">
                    <div className="w-1/5 p-6 text-right font-bold">Desc</div>
                    <textarea className="w-4/5 p-6 rounded-r border border-solid border-neutral-300 shadow-md resize-y"
                              name="pdesc"
                              rows="4"
                              onChange={handleChangeProduct}
                              value={product.pdesc}>
                        {product.pdesc}
                    </textarea>
                </div>
            </div>
            <div className="flex justify-center">
                <div className="relative mb-4 flex w-full flex-wrap items-stretch">
                    <div className="w-1/5 p-6 text-right font-bold">Price</div>
                    <input className="w-4/5 p-6 rounded-r border border-solid border-neutral-300 shadow-md"
                           name="price"
                           type={'number'}
                           value={product.price}
                           onChange={handleChangeProduct}/>
                </div>
            </div>
            <div className="flex justify-center">
                <div className="relative mb-4 flex w-full flex-wrap items-stretch">
                    <div className="w-1/5 p-6 text-right font-bold">DELETE</div>
                    <select name="delFlag"
                            value={product.delFlag}
                            onChange={handleChangeProduct}
                            className="w-4/5 p-6 rounded-r border border-solid border-neutral-300 shadow-md">
                        <option value={false}>사용</option>
                        <option value={true}>삭제</option>
                    </select>
                </div>
            </div>
            <div className="flex justify-center">
                <div className="relative mb-4 flex w-full flex-wrap items-stretch">
                    <div className="w-1/5 p-6 text-right font-bold">Files</div>
                    <input ref={uploadRef}
                           className="w-4/5 p-6 rounded-r border border-solid border-neutral-300 shadow-md"
                           type={'file'}
                           multiple={true}/>
                </div>
            </div>
            <div className="flex justify-center">
                <div className="relative mb-4 flex w-full flex-wrap items-stretch">
                    <div className="w-1/5 p-6 text-right font-bold">Images</div>
                    <div className="w-4/5 justify-center flex flex-wrap items-start">
                        {product.uploadedFileNames.map((imgFile, i) =>
                            <div
                                className="flex justify-center flex-col w-1/3 m-1 align-baseline"
                                key = {i}>
                                <button
                                    className="bg-blue-500 text-3xl text-white"
                                    onClick={() => deleteOldImages(imgFile)}>
                                    DELETE
                                </button>
                                <img alt ="img" src={`${host}/api/products/view/s_${imgFile}`}/>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <div className="flex justify-end p-4">
                <button type="button"
                        className="rounded p-4 m-2 text-xl w-32 text-white bg-red-500"
                        onClick={handleClickDelete}>
                    Delete
                </button>
                <button type="button"
                        onClick={handleClickModify}
                        className="inline-block rounded p-4 m-2 text-xl w-32 text-white bg-orange-500">
                    Modify
                </button>
                <button type="button"
                        className="rounded p-4 m-2 text-xl w-32 text-white bg-blue-500"
                        onClick={() => moveToList()}>
                    List
                </button>
            </div>
        </div>
    );
}

export default ModifyComponent;