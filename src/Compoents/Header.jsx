import React from 'react'

function Header() {
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-primary" data-bs-theme="dark">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">Employe Management App</a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarColor01"
            aria-controls="navbarColor01"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarColor01">
            <ul className="navbar-nav me-auto">
              <br />
              <li className="nav-item">
                <a className="nav-link active" href="#">
                  Home <span className="visually-hidden">(current)</span>
                </a>
              </li>
              
              <li className="nav-item">
                <a className="nav-link" href="#">Edit</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">About</a>
              </li>
           
            </ul>
        
          </div>
        </div>
      </nav>
    </>
  )
}

export default Header
