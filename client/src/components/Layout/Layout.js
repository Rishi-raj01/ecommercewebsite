// import React from 'react'
// import Header from './Header'
// import Footer from './Footer'
// import { ToastContainer } from 'react-toastify';
//   import 'react-toastify/dist/ReactToastify.css';

// const Layout = ({ children }) => {       //instead of passing (props)=>{<main>{props.children}<main/>}

//   return (
//     <div>
//     <Header/>
//       <main style={{minHeight:"100vh"}}>
//       <ToastContainer />{ children }</main>
//       <Footer/>
//     </div>
//   )
// }

// export default Layout
import React from 'react'
import Header from './Header'
import Footer from './Footer'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Layout = ({ children }) => {
  return (
    <div>
      <Header />
      <main style={{ marginTop: 0, minHeight: "calc(100vh - 50px)" }}> {/* Adjust the height according to your header */}
        <ToastContainer />
        {children}
      </main>
      <Footer />
    </div>
  )
}

export default Layout
