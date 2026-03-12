import React from "react";
import Header from "./Header";
import '../App.css'

const Layout = ({ children, user }) => {
  return (
    <div className="layout">
      <Header user={user} />
      <main className="layout-main">
        <div className="layout-container">
          {children}
        </div>
      </main>
    </div>
  )
}

export default Layout