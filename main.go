package main

import (
	"fmt"
    "log"
	"net/http"
	"encoding/json"
	"github.com/gorilla/mux"
	"github.com/jinzhu/gorm"
	_ "github.com/jinzhu/gorm/dialects/postgres"
)

var db *gorm.DB
var err error

type Word struct{
	Id uint `gorm:"primary_key"`
	En_meaning string
	Ja_meaning string
	Level string
}

func InitialMigration(){
	db, err := gorm.Open("postgres", "user=postgres password=Namahamu0225 dbname=gorm4 sslmode=disable")

	if err != nil {
		fmt.Println(err.Error())
        panic("Failed to connect to database")
    }

	defer db.Close()
	
	db.AutoMigrate(&Word{})

    fmt.Println("Connection to Postgres was successful!")
}

func allWords(w http.ResponseWriter, r *http.Request){
	db, err := gorm.Open("postgres", "user=postgres password=Namahamu0225 dbname=gorm4 sslmode=disable")
	if err != nil {
		fmt.Println(err.Error())
        panic("Failed to connect to database")
    }
	defer db.Close()

	var words []Word
	db.Find(&words)
	json.NewEncoder(w).Encode(words)
}

func main()  {
	InitialMigration()
	 r := mux.NewRouter() 
	 r.HandleFunc("/api/words", allWords).Methods("GET")
	 r.PathPrefix("/").Handler(http.FileServer(http.Dir("build")))
	 // 4000ポートでサーバーを立ち上げる
	 log.Println("Listening...")
	 log.Fatal(http.ListenAndServe(":4000", r))
}