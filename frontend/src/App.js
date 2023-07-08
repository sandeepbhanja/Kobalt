import React from "react";
import { Container } from "react-bootstrap";
import Header from './components/header';
import Footer from './components/footer';
import { Outlet } from "react-router-dom";
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  return (
    <>
      <Header />
      <main className="py-3">
        <Container>
          <Outlet></Outlet>
        </Container>
      </main>
      <Footer />
      <ToastContainer />
    </>
  );
};

export default App;
