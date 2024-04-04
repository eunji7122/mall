import React, {useEffect, useState} from 'react';
import {deleteOne, getOne, putOne} from "../../api/todoApi";
import useCustomMove from "../../hooks/useCustomMove";
import ResultModal from "../common/ResultModal";

const initState = {
    tno:0,
    title:'',
    content: '',
    dueDate: null,
    complete: false
}

function ModifyComponent({tno}) {

    const [todo, setTodo] = useState({...initState})

    const [result, setResult] = useState(null)

    // 수정 버튼 클릭 -> 조회 페이지로 이동
    // 삭제 버튼 클릭 -> 목록 페이지로 이동
    const {moveToRead, moveToList} = useCustomMove()

    useEffect(() => {

        getOne(tno).then(data => {
            console.log(data);
            setTodo(data)
        })

    }, [tno]);

    const handleChangeTodo = (e) => {

        todo[e.target.name] = e.target.value
        setTodo({...todo})

    }
    const handleChangeTodoComplete = (e) => {

        const value = e.target.value
        todo.complete = (value === 'Y')
        setTodo({...todo})

    }

    const handleClickModify = () => {

        putOne(todo).then(data => {
            setResult("Modifted")
        })
    }

    const handleClickDelete = () => {

        deleteOne(tno).then(data => {
            setResult("Deleted")
        })
    }

    //모달 창이 close될때
    const closeModal = () => {
        if(result ==='Deleted') {
            moveToList()
        }else {
            moveToRead(tno)
        }
    }

    return (
        <div className = "border-2 border-sky-200 mt-10 m-2 p-4">
            {result ? <ResultModal title={'처리결과'} content={result} callbackFn={closeModal}></ResultModal> :<></>}
            <div className="flex justify-center mt-10">
                <div className="relative mb-4 flex w-full flex-wrap items-stretch">
                    <div className="w-1/5 p-6 text-right font-bold">TNO</div>
                    <div className="w-4/5 p-6 rounded-r border border-solid shadow-md bg-gray-100"> {todo.tno} </div>
                </div>
            </div>
            <div className="flex justify-center">
                <div className="relative mb-4 flex w-full flex-wrap items-stretch">
                    <div className="w-1/5 p-6 text-right font-bold">CONTENT</div>
                    <div className="w-4/5 p-6 rounded-r border border-solid shadow-md bg-gray-100"> {todo.content} </div>
                </div>
            </div>
            <div className="flex justify-center">
                <div className="relative mb-4 flex w-full flex-wrap items-stretch">
                    <div className="w-1/5 p-6 text-right font-bold">TITLE</div>
                    <input className="w-4/5 p-6 rounded-r border border-solid border-neutral-300 shadow-md"
                           name="title" type={'text'} value={todo.title} onChange={handleChangeTodo} ></input>
                </div>
            </div>
            <div className="flex justify-center">
                <div className="relative mb-4 flex w-full flex-wrap items-stretch">
                    <div className="w-1/5 p-6 text-right font-bold">DUEDATE</div>
                    <input className="w-4/5 p-6 rounded-r border border-solid border-neutral-300 shadow-md"
                           name="dueDate" type={'date'} value={todo.dueDate} onChange={handleChangeTodo} ></input>
                </div>
            </div>
            <div className="flex justify-center">
                <div className="relative mb-4 flex w-full flex-wrap items-stretch">
                    <div className="w-1/5 p-6 text-right font-bold">COMPLETE</div>
                    <select name="status" className="border-solid border-2 rounded m-1 p-2"
                            onChange={handleChangeTodoComplete} value = {todo.complete? 'Y':'N'} >
                        <option value='Y'>Completed</option>
                        <option value='N'>Not Yet</option>
                    </select>
                </div>
            </div>
            <div className="flex justify-end p-4">
                <button type="button" className="inline-block rounded p-4 m-2 text-xl w-32 text-white bg-red-500"
                onClick={handleClickDelete}>
                    Delete </button>
                <button type="button" className="rounded p-4 m-2 text-xl w-32 text-white bg-blue-500"
                onClick={handleClickModify}>
                    Modify
                </button>
            </div>
        </div>
    );
}

export default ModifyComponent;