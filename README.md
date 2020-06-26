# Vocabulary Card

This was created during my time as a student at Code Chrysalis.<br>
(これはコードクリサリスの生徒のときに作りました。)

<img width="1438" alt="vocabulary_card_screenshot" src="https://user-images.githubusercontent.com/50431801/85829311-4f97a500-b7c5-11ea-9b82-94badd104c18.png">

## What is Vocabulary?

Vocabulary is an app which helps software engineer to learn English word related to tech.
You can add new word and delete the word you slected.
You can learn words you added with slide card.

<br>
(Vocabularyはソフトウェアエンジニアがテクニカルな英単語を学ぶのに役立つアプリです。<br>
新しい単語を追加したり、指定した単語を消去したりすることができます。<br>
自分で追加した単語をスライドカードを使って学ぶことができます。
)

<br>
<br>

## Technogoly

<img width="690" alt="Technology I used" src="https://user-images.githubusercontent.com/50431801/85829765-4c50e900-b7c6-11ea-8d30-f1f665f65aa6.png">

<br>

# Development

To clone and run this application, you'll need Git, Node.js (which comes with yarn) and Go, installed on your computer.
<br><br>
(このアプリをクローン、実行するために Git と node.js,Go が必要です。自身のコンピュータにインストールしてください。)
<br><br>

## Database

This project assumes a Postgres database, also, this is not included in the package.json file and vendor folder(for Go package), so must be installed separately.

Create a database.

<br>
(このプロジェクトはデータベースとしてPostgresを使うことを想定しています。また最初はpackage.jsonファイル,Goのパッケージ管理として使われるvendor folderが含まれていないので。インストールする必要があります。)
<br><br>
(データベースを作ってください。)

<br><br>

## Installation

<br>
1. Clone this repository

```
$ git clone https://github.com/ArakakiTakuya/vocabulary_card
```

<br>
2. Go to the repository

```
$ cd vocabulary_card
```

<br>
3. Install dependencies

```
$ yarn
```

```
$ dep install
```

<br>
4. Create database, and rewrote database info in main.go

```
gorm.Open("postgres", "user=YOUR POSTGRESQL USERNAME password=YOUR DATABASE PASSWORD dbname=YOUR DATABASE NAME YOU CREATED sslmode=disable")
```

<br>
6. Run the app

```
$ yarn start
```

<br>
