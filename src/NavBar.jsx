// import { Link, Route, Routes, createBrowserRouter, createRoutesFromElements } from "react-router-dom"
// import Switch from "react-router-dom"
import Pesquisador from './pesquisador/PesquisadorPage'
import { RouterProvider, Route, Outlet, BrowserRouter, createBrowserRouter, createRoutesFromElements, Link} from "react-router-dom";
import styles from './NavBar.module.css' 
import Test from './Test';

const NavBar = () => {

    const router = createBrowserRouter(
        createRoutesFromElements(
            // <BrowserRouter>
                <Route path="/" element={<Root />}>
                    <Route index element={<Pesquisador />} />
                    <Route path ="test" element={<Test />}/>
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
                        <Link to="test">test</Link>
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