import React from "react";
import { useSelector } from "react-redux";
import Loader from "../../components/Loader";
import Error from "../../components/Error";
import Card from "../Create/Card";
import "./home.scss";
import Filter from "./Filter";
const Home = () => {
  //Store abone ol ve jobs verisini konsola yazdir
  const { isLoading, error, jobs } = useSelector((store) => store.jobReducer);

  return (
    <div className="home-page">
      {/* Filter */}
      <Filter />
      {/* Jobs Data */}
      {/* yukleniyorsa Loaderi, Hata varsa Error bilesenini is verileri geldiyse render et  */}
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Error info={error} />
      ) : (
        <div className="cards-wrapper">
          {jobs.map((job) => (
            <Card key={job.id} job={job} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
