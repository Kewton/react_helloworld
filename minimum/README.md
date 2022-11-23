# 概要
## 目的
## 流れ
1. バックエンドのセットアップ
1. フロントエンドのセットアップ
1. 動作確認

## 前提
- VS Codeがインストール済である
- Pythonがインストール済である

# バックエンドのセットアップ
## セットアップ
1. VS Codeよりターミナルを起動する
1. Python仮想環境のセットアップ
    ```
    mkdir venv
    python3 -m venv venv/flaskvenv
    ```
1. Flaskのインストール
    ```
    source venv/flaskvenv/bin/activate
    pip install -r minimum/backend/requirements.txt
    ```
## バックエンドの実行と動作確認
1. 実行
    ```
    python minimum/backend/server.py
    ```
1. 動作確認
    1. VS Codeより新しいターミナルを起動する
    1. jupyter notebookの実行
        - 下記コマンドを実行
        ```
        source venv/flaskvenv/bin/activate
        jupyter notebook
        ```
    1. 動作確認
        - Jupyter notebookにて下記コードを実行する
        - minimum/debug/test.ipynb
        ```python
        import requests
        def restapiGet(_url):
        print(_url)
        html_doc = requests.get(_url).content
        print(html_doc)
        return html_doc
        restapiGet("http://127.0.0.1:5000")
        ```

# フロントエンド
## 準備
1. Node.jsのインストール
    ```
    node --version
    ```
1. yarnをインストール
    ```
    yarn --version
    ```
## セットアップ
1. Reactモジュールをインストール
    ```
    cd minimum/flontend/helloworld
    npm install
    ```
## 実行
1. helloworldを実行
    ```
    cd minimum/flontend/helloworld
    yarn start
    ```
## 動作確認
1. ブラウザのデベロッパーツールを起動して動作確認