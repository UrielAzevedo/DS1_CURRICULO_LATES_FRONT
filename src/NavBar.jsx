// import { Link, Route, Routes, createBrowserRouter, createRoutesFromElements } from "react-router-dom"
// import Switch from "react-router-dom"
import Instituto from './instituto/InstitutoPage'
import { RouterProvider, Route, Outlet, BrowserRouter, createBrowserRouter, createRoutesFromElements, Link} from "react-router-dom";
import styles from './NavBar.module.css'
// import Test from './Test';
import PesquisadorPage from './pesquisador/PesquisadorPage'
import ObrasPage from "./obrasPage/ObrasPage"
import GrafoPage from "./grafoPage/GrafoPage"
import FrontPage from "./frontPage/FrontPage"

const NavBar = () => {

    const router = createBrowserRouter(
        createRoutesFromElements(
            // <BrowserRouter>
                <Route path="/" element={<Root />}>
                    <Route index element={<Instituto />} />
                    <Route path ="pesquisador" element={<PesquisadorPage />}/>
                    <Route path ="obras" element={<ObrasPage />}/>
                    <Route path ="grafo" element={<GrafoPage />}/>
                    <Route path ="front" element={<FrontPage />}/>
                </Route>
            // </BrowserRouter>
        )
    )

    return(

        <div>
            <RouterProvider router = {router}/>
        </div>

        // <>
        //     <nav style={styles.container}>
        //         <ul>
        //             <li>
        //                 <Link to="/">instituto</Link>
        //             </li>
        //             <li>
        //                 {/* <Link></Link> */}
        //             </li>
        //         </ul>
        //     </nav>

        //     <BrowserRouter>
        //         <Routes>
        //             <Route path="/" element={Pesquisador}/>
        //             {/* <Route/> */}
        //         </Routes>
        //     </BrowserRouter>
        
        // </>


    )
}

const Root = () => {

    return(
        <>
             <nav className={styles.container}>
                 <ul className={styles.routesList}>
                     <li>
                         <Link to="/">instituto</Link>
                     </li>
                     <li>
                        <Link to="pesquisador">pesquisador</Link>
                     </li>
                     <li>
                        <Link to="obras">obras</Link>
                     </li>
                     <li>
                        <Link to="grafo">grafo</Link>
                     </li>
                     <li>
                        <Link to="front">front</Link>
                     </li>
                 </ul>
             </nav>

             <div>
                <Outlet/>
             </div>
        
        </>
    )
}

export default NavBar