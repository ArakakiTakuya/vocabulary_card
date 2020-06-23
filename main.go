package main

import (
	"fmt"
    "log"
	"net/http"
	"github.com/gorilla/mux"
	"github.com/jinzhu/gorm"
	_ "github.com/jinzhu/gorm/dialects/postgres"
)

var db *gorm.DB
var err error

type Word struct{
	gorm.Model
	En_meaning string
	Ja_meaning string
	Level string
}

func InitialMigration(){
	db, err := gorm.Open("postgres", "user=postgres password=Namahamu0225 dbname=gorm sslmode=disable")

	if err != nil {
		fmt.Println(err.Error())
        panic("Failed to connect to database")
    }

	defer db.Close()
	
	db.AutoMigrate(&Word{})


    fmt.Println("Connection to Postgres was successful!")
}

func getWords(w http.ResponseWriter, r *http.Request){
	fmt.Fprintf(w,"hello world")
}

func main()  {
	InitialMigration()
	 r := mux.NewRouter() 
	 r.HandleFunc("/api/words", getWords).Methods("GET")
	 r.PathPrefix("/").Handler(http.FileServer(http.Dir("build")))
	 // 4000ポートでサーバーを立ち上げる
	 log.Println("Listening...")
	 log.Fatal(http.ListenAndServe(":4000", r))
}