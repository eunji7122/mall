import React from 'react';
import {Link} from "react-router-dom";
import BasicLayout from "../layouts/BasicLayout";
import useCustomLogin from "../hooks/useCustomLogin";

function AboutPage(props) {

     const {isLogin, moveToLoginReturn} = useCustomLogin()

    if (!isLogin) {
        return moveToLoginReturn()
    }

    return (
        <BasicLayout>
            <div className="text-3xl">About Page</div>
        </BasicLayout>
    );
}

export default AboutPage;