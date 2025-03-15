import React from "react";
import Input from "./Input";
import "./create.scss";
import Select from "./Select";
import { statusOptions, typeOptions } from "../../constants/constant.js";
import api from "../../utils/api.js";
import { useDispatch } from "react-redux";
import { createJob } from "../../redux/slices/jobSlices.js";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Create = () => {
  //Navigasyon kurulumu
  const navigation = useNavigate();
  //Dispatch kurulumu
  const dispatch = useDispatch();

  // Form gonderildiginde calisacak fonk.
  const handleSubmit = (e) => {
    //Sayfa yenilemesini engelle
    e.preventDefault();

    //Inputlara form Data ile eris
    const formData = new FormData(e.target);

    //FormData icerisindeki degerleri nesneye cevir
    const jobData = Object.fromEntries(formData.entries());

    //Guncel tarih verisine eris ve jobData icerisine ata
    jobData.date = Date.now();
    // datemili sanuye cinsinden tutulur ulkeye gore gerekirse degistirilir.

    //Api'a istek at eger istek basarili ise reducera haber ver

    api
      .post("/jobs", jobData)
      .then((res) => {
        //Reducera haber ver
        dispatch(createJob(res.data));
        //Kullaniciya bildirim gonder
        toast.success("Basvuru olusturuldu");

        //Home sayfasina yonlendir
        navigation("/");
      })
      //Hata durumunda kullaniciya bildirimde bulun
      .catch((err) => {
        toast.error(`Basvuru sirasinda bir sorun olustu: ${err.message}`);
      });
  };

  return (
    <div className="add-page">
      <section className="container">
        {/* Title */}
        <h2>Yeni Is Ekle</h2>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <Input label="Pozisyon" name="Pozisyon" />
          <Input label="Sirket" name="company" />
          <Input label="Lokasyon" name="location" />
          <Select label="Durum" name="status" options={statusOptions} />
          <Select label="Tur" name="type" options={typeOptions} />

          <div className="btn-wrapper">
            <button className="button">Olustur</button>
          </div>
        </form>
      </section>
    </div>
  );
};

export default Create;
