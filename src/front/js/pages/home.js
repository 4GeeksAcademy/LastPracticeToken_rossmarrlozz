import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { Signup } from "../component/signup";
import { Login } from "../component/login";
import { Private } from "../component/private";
import "../../styles/home.css";

export const Home = () => {
    const { store } = useContext(Context);

    return (
        <div className="text-center mt-5">
            {!store.token ? (
                <>
                    <h1>Welcome full stack developers</h1>
                    <Signup />
                    <br></br>
                    <br></br>
                    <Login />
                </>
            ) : (
                <Private />
            )}
        </div>
    );
};