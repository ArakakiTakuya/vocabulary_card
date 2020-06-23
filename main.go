package main

import (
    "log"
	"net/http"
	"github.com/gorilla/mux"
)

func main()  {
	 r := mux.NewRouter() 
	 r.HandleFunc("/api/words", getWords).Methods("GET")
	 r.PathPrefix("/").Handler(http.FileServer(http.Dir("build")))
	 log.Println("Listening...")
	 // 4000ポートでサーバーを立ち上げる
	 log.Fatal(http.ListenAndServe(":4000", r))
}