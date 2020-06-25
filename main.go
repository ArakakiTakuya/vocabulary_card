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
	Id string
	En_meaning string
	Ja_meaning string
	Level string
}

func InitialMigration(){
	db, err := gorm.Open("postgres", "user=postgres password=Namahamu0225 dbname=gorm5 sslmode=disable")

	if err != nil {
		fmt.Println(err.Error())
        panic("Failed to connect to database")
    }

	defer db.Close()
	
	db.AutoMigrate(&Word{})

    fmt.Println("Connection to Postgres was successful!")
}

func allWords(w http.ResponseWriter, r *http.Request){
	db, err := gorm.Open("postgres", "user=postgres password=Namahamu0225 dbname=gorm5 sslmode=disable")
	if err != nil {
		fmt.Println(err.Error())
        panic("Failed to connect to database")
    }
	defer db.Close()

	var words []Word
	db.Find(&words)
	json.NewEncoder(w).Encode(words)
}

func newWord(w http.ResponseWriter, r *http.Request){
	db, err := gorm.Open("postgres", "user=postgres password=Namahamu0225 dbname=gorm5 sslmode=disable")
	if err != nil {
		fmt.Println(err.Error())
        panic("Failed to connect to database")
    }
	defer db.Close()

	var word Word
	json.NewDecoder(r.Body).Decode(&word)
	db.Create(&word)

	fmt.Println("New word was successfully created")
}

func deleteWord(w http.ResponseWriter, r *http.Request){
	db, err := gorm.Open("postgres", "user=postgres password=Namahamu0225 dbname=gorm5 sslmode=disable")
	if err != nil {
		fmt.Println(err.Error())
        panic("Failed to connect to database")
    }
	defer db.Close()

	vars := mux.Vars(r)
	id := vars["id"]

	var word Word
	db.Where("id = ?", id).Find(&word)
	db.Delete(&word)

	fmt.Println("Word was successfully deleted")
}

func main()  {
	InitialMigration()
	 r := mux.NewRouter() 
	 r.HandleFunc("/api/words", allWords).Methods("GET")
	 r.HandleFunc("/api/words", newWord).Methods("POST")
	 r.HandleFunc("/api/words/{id}", deleteWord).Methods("DELETE")
	 r.PathPrefix("/").Handler(http.FileServer(http.Dir("build")))
	 // 4000ポートでサーバーを立ち上げる
	 log.Println("Listening...")
	 log.Fatal(http.ListenAndServe(":4000", r))
}