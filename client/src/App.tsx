import { GlobalStyles } from "./styles/GlobalStyles";
import { Header } from "./components/Header/index";
import { Orders } from "./components/Orders/index";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

import {authUser} from "./services/UserService.ts";

export function App(){
    authUser();
    return (
    <>
        <GlobalStyles/>
        <Header />
        <Orders />
        <ToastContainer position={'bottom-center'} />
    </>
  );
}
