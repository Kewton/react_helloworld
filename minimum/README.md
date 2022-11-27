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

## Nginx + uWSGI + Flask
### Nginx
1. Nginxのインストール
    ```
    sudo apt update
    sudo apt install nginx
    '''
1. 設定
    - /etc/nginx/nginx.confへの設定値
        ```
        user www-data;
        worker_processes auto;
        pid /run/nginx.pid;
        include /etc/nginx/modules-enabled/*.conf;

        events {
                worker_connections 768;
                # multi_accept on;
        }

        http {

                ##
                # Basic Settings
                ##

                sendfile on;
                tcp_nopush on;
                types_hash_max_size 2048;
                # server_tokens off;

                # server_names_hash_bucket_size 64;
                # server_name_in_redirect off;

                include /etc/nginx/mime.types;
                default_type application/octet-stream;

                ##
                # SSL Settings
                ##

                ssl_protocols TLSv1 TLSv1.1 TLSv1.2 TLSv1.3; # Dropping SSLv3, ref: POODLE
                ssl_prefer_server_ciphers on;

                ##
                # Logging Settings
                ##

                access_log /var/log/nginx/access.log;
                error_log /var/log/nginx/error.log;

                ##
                # Gzip Settings
                ##

                gzip on;

                # gzip_vary on;
                # gzip_proxied any;
                # gzip_comp_level 6;
                # gzip_buffers 16 8k;
                # gzip_http_version 1.1;
                # gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;

                ##
                # Virtual Host Configs
                ##

                include /etc/nginx/conf.d/*.conf;
                # include /etc/nginx/sites-enabled/*;
        }


        #mail {
        #       # See sample authentication script at:
        #       # http://wiki.nginx.org/ImapAuthenticateWithApachePhpScript
        #
        #       # auth_http localhost/auth.php;
        #       # pop3_capabilities "TOP" "USER";
        #       # imap_capabilities "IMAP4rev1" "UIDPLUS";
        #
        #       server {
        #               listen     localhost:110;
        #               protocol   pop3;
        #               proxy      on;
        #       }
        #
        #       server {
        #               listen     localhost:143;
        #               protocol   imap;
        #               proxy      on;
        #       }
        #}
        ```
    - /etc/nginx/conf.d/uwsgi.confへの設定値
        ```shell:/etc/nginx/conf.d/uwsgi.conf
        server{
                listen  8080;
                server_name 127.0.0.1;
                location / {
                        include uwsgi_params;
                        uwsgi_pass unix:///tmp/uwsgi.sock;
                }
        }

        server{
                listen 8010;
                server_name 127.0.0.1;
                location / {
                        root "{buildが格納されているフォルダ（フルパス）}";
                        index index.html;
                        try_files $uri $uri/ /index.html;
                }
        }
        ```
### uWSGI + Flask
1. uwsgiのインストール
    ```
    pip install uwsgi
    ```
1. uwsgiの設定
    - app.iniファイルの作成
        ```ini
        [uwsgi]
        module = app
        callable = app
        master = true
        processes = 2
        socket = /tmp/uwsgi.sock
        chmod-socket = 666
        vacuum = true
        die-on-term = true
        wsgi-file = "実行するpythonのフルパス"
        logto = "ログファイルのフルパス（拡張子 .log）"
        ```
1. uwsgiの実行
    ```
    uwsgi --ini app.ini
    ```
## Nginx + React
1. Reactのビルド
    ```
    yarn build
    ```
1. Nginxの実行
    ```
    sudo service nginx start
    ```
1. ブラウザ起動<br>
    http://127.0.0.1:8010/

## Redisサーバー
1. インストール
    ```
    sudo apt update
    sudo apt install redis
    ```
1. バージョン確認
    ```
    redis-cli -v
    ```
1. Redisサーバーの実行
    ```
    sudo systemctl start redis-server
    sudo systemctl status redis-server
    sudo systemctl stop redis-server
    sudo systemctl restart redis-server
    sudo journalctl -r -u redis-server

    cat /lib/systemd/system/redis-server.service
    ```
1. Pythonから使用する
    ```
    pip install redis
    ```
    - 使用イメージ①
        ```python
        import redis

        # Redis に接続します
        # Redisサーバーのホスト名, ポート番号, データベース番号 を指定します
        redis = redis.Redis(host='localhost', port=6379, db=0)

        # 'hoge' というキーで 'moge' という値を追加します
        redis.set('hoge', 'moge')

        # 追加した値を取得して表示します
        hoge = redis.get('hoge')
        print(hoge.decode())
        ```
    - 使用イメージ②
        ```python
        import pickle

        class MyCache:
            def __init__(self, _name=""):
                self.name = _name
                self.prop = {}

            def getName(self):
                return self.name

            def setName(self, name):
                self.name = name
            
            def setProp(self, _key, _value):
                self.prop[_key] = _value
            
            def getProp(self, _key):
                return self.prop[_key]

            def getPropList(self):
                return list(self.prop.keys())
            
            def toPickle(self):
                return pickle.dumps(self)
            
            @staticmethod
            def toObject(_pickle):
                return pickle.loads(_pickle) 
        ```
    - 実行イメージ
        ```python
        myCache = MyCache("test")
        myCache.getName()
        myCache.setProp("test",["1","2","3","4"])
        myCache.setProp("test_2",{"1":"111"})
        myCache.getProp("test")

        redis.set("x", myCache.toPickle())

        import gc

        # オブジェクト削除
        del myCache

        # メモリ解放
        gc.collect()

        test = MyCache.toObject(redis.get("x"))
        test.getName()

        test.getProp("test_2")["1"]
        ```