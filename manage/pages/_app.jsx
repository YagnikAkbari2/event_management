import React, { useEffect } from "react";
import { store, wrapper } from "../redux/store";
import { Provider, useDispatch, useSelector } from "react-redux";
import "../styles/globals.scss";
import LoginLayout from "../Components/Auth/LoginLayout";
import Layout from "../Components/Layout/Layout";
import { tokens } from "../commonjs/common";
import { useRouter } from "next/router";
import { getStoreDetails } from "../redux/actions/productAction";
import Toaster from "../Components/Toaster/Toaster";
function App({ Component, pageProps }) {
  const router = useRouter();
  const dispatch = useDispatch();
  const { storeDetails } = useSelector((state) => state.product);
  const { isLoading } = useSelector((state) => state.user);
  const chekckLoginStatus = async () => {
    if (router.pathname !== "/verify/[token]") {
      let token = await tokens.get();
      if (token === null || typeof token === "undefined") {
        router.push("/login");
      } else {
      }
    }
  };

  useEffect(() => {
    chekckLoginStatus();
  }, []);
  if (parseInt(process.env.NEXT_PUBLIC_SYSTEM_OFFLINE ?? 0) === 1) {
    return (
      <div
        className=" mx-5 card d-flex flex-row justify-content-center py-5 my-5"
        style={{ color: "red" }}
      >
        The system is offline temporarily due to maintenance, please try again
        later.
      </div>
    );
  } else {
    return (
      <Provider store={store}>
        {Component.LoginLayout ? (
          <LoginLayout>
            <Component {...pageProps} />
          </LoginLayout>
        ) : (
          <Layout layoutType={Component.layoutType ?? "MEDCHECK"}>
            <Component {...pageProps} />
          </Layout>
        )}
        <Toaster />
      </Provider>
    );
  }
}
export default wrapper.withRedux(App);
