import React, { useState, useEffect } from "react";
import "../../Create/create.scss";
import Input from "../../Create/Input";
import Select from "../../Create/Select/index";

import {
  statusOptions,
  typeOptions,
  sortOptions,
} from "../../../constants/constant";
import api from "../../../utils/api";
import { useDispatch } from "react-redux";
import { setJobs } from "../../../redux/slices/jobSlices";

const Filter = () => {
  const dispatch = useDispatch();
  const [text, setText] = useState();
  const [debouncedText, setDebouncedText] = useState();
  const [status, setStatus] = useState();
  const [type, setType] = useState();
  const [sort, setSort] = useState();

  //texte debounce uygula
  useEffect(() => {
    //text undefined ise fonk. durdur
    if (text === undefined) return;

    //her tus vuruldugunda bir sayac baslat (300ms)
    const id = setTimeout(() => setDebouncedText(text), 300);
    //eger sure bitmeden useEffect tekrar calisirsa (onceki sayaci durdur )
    return () => clearTimeout(id);
  }, [text]);

  //text state'i her degistiginde api istegi at ve filtrele
  useEffect(() => {
    const params = {
      q: debouncedText,
    };
    //api'a parametreler ile birlikte istek at
    api
      .get("/jobs", { params })
      //Gelen cevabi reducer a haber ver
      .then((res) => dispatch(setJobs(res.data)));
  }, [debouncedText]);

  return (
    <div className="filter-sec">
      <h2>Filtreleme Formu</h2>

      <form>
        <Input label="Ara... " handleChange={(e) => setText(e.target.value)} />

        <Select
          label="Durum"
          options={statusOptions}
          handleChange={(e) => setStatus(e.target.value)}
        />

        <Select
          label="Tur"
          options={typeOptions}
          handleChange={(e) => setType(e.target.value)}
        />

        <Select
          label="Sirala"
          options={sortOptions}
          handleChange={(e) => setSort(e.target.value)}
        />

        <button type="reset" className="button">
          Filtreleri Sifirla
        </button>
      </form>
    </div>
  );
};

export default Filter;
