import React, { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Create from "./pages/Create";
import Header from "./components/Header";
import { useDispatch } from "react-redux";
import { setError, setJobs, setLoading } from "./redux/slices/jobSlices";
import api from "./utils/api";

const App = () => {
  const dispatch = useDispatch();
  //Api'adan is verilerini al ve reducera ilet
  useEffect(() => {
    //Reducerdaki yuklenme durumu ayarla
    dispatch(setLoading());
    //Apia istek at ve istek basarili olursa verileri reducer'a ilet
    api
      .get("./jobs")
      //istek basarili olursa reducera jobs verisini gonder
      .then((res) => dispatch(setJobs(res.data)))
      //Istek basarisiz olursa reducera hatayi gonder
      .catch((err) => dispatch(setError(err)));
  }, []);
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create" element={<Create />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
