import jwtAxios from "../util/jwtUtil"
import { API_SERVER_HOST } from "./todoApi"

const host = `${API_SERVER_HOST}/api/products`

export const postAdd = async (product) => {

    const header = {
        header: {
            'Content-Type' : 'multipart/form-data'
        }
    }

    const res = await jwtAxios.post(`${host}/`, product, header)

    return res.data
}

export const getList = async ( pageParam ) => {

    const {page,size} = pageParam

    const res = await jwtAxios.get(`${host}/list`, {params: {page:page,size:size }})

    return res.data

}

export const getOne = async (pno) => {

    const res = await jwtAxios.get(`${host}/${pno}` )

    return res.data
}

export const putProduct = async (pno, product) => {

    const header = {headers: {"Content-Type": "multipart/form-data"}}

    const res = await jwtAxios.put(`${host}/${pno}`, product, header)

    return res.data
}
export const deleteProduct = async (pno) => {

    const res = await jwtAxios.delete(`${host}/${pno}`)

    return res.data
}