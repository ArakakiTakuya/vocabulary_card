package main

import (
    "log"
    "net/http"
)

func main()  {
	 //ディレクトリを指定する
	 fs := http.FileServer(http.Dir("build"))
	 //ルーティング設定。"/"というアクセスがきたらstaticディレクトリのコンテンツを表示させる
	 http.Handle("/", fs)
 
	 log.Println("Listening...")
	 // 4000ポートでサーバーを立ち上げる
	 http.ListenAndServe(":4000", nil)
}