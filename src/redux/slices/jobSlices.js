import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  isLoading: true,
  error: null,
  jobs: [],
};
const jobSlice = createSlice({
  name: "job",
  initialState: initialState,
  reducers: {
    //Yuklenme durumu
    setLoading: (state) => {
      state.isLoading = true;
    },
    //Hata durmu
    setError: (state, action) => {
      //Yuklenme stateini guncelle
      state.isLoading = false;
      //gelen hata mesajini state icerisindeki error'a aktar
      state.error = action.payload.message;
    },
    //Api'dan is verisini al ve reducera ilet
    setJobs: (state, action) => {
      //Yuklenme stateini guncelle
      state.isLoading = false;
      //hata stateni nulla cek
      state.error = null;
      //Gelen is verisini state icerisindeki jobs'a aktar
      state.jobs = action.payload;
    },
    //Yeni is ekle
    createJob: (state, action) => {
      //action icerisinde gelen payload degerini state icerisindeki jobs dizisine aktar
      state.jobs.push(action.payload);
    },
    //is sil
    deleteJob: (state, action) => {
      //deletejoba gelen id ile silinecek veriyi state icerisinden bul ve stateten kaldir

      //Silinecek elemanin sirasini state icerisiden bul
      const index = state.jobs.findIndex((i) => i.id == action.payload);
      //Sirasi bilinen elemani statetten  kaldir
      state.jobs.splice(index, 1);
    },
  },
});
//Aksiyonlar

export const { setLoading, setError, setJobs, createJob, deleteJob } =
  jobSlice.actions;

//Reducer
export default jobSlice.reducer;
