# 概要
## 目的
## 流れ
- Flaskのインストール
- Reactのインストール
- 動作確認

# バックエンド
## Flaskのインストール
```
mkdir venv
python3 -m venv venv/flaskvenv
source venv/flaskvenv/bin/activate
pip install -r minimum/backend/requirements.txt
```

## Flaskの実行
```
python minimum/backend/server.py
```

## Jupyter noteを使用して動作確認
### jupyter notebookの実行
```
jupyter notebook
```
### 動作確認
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
1. ライブラリをインストール
    ```
    npm install axios
    ```
1. yarnをインストール
    ```
    yarn --version
    ```
1. creat-react-appのインストール
    ```
    yarn global add create-react-app
    ```
1. react諸々インストール
    ```
    cd minimum/flontend/helloworld
    npm install
    npm install axios
    ```
1. helloworldを実行
    ```
    # yarn start
    NODE_OPTIONS=--openssl-legacy-provider npm run start
    ```