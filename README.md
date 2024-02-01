# シェル芸ボット

## 初期設定

```shell
touch .env
npm install
docker pull theoldmoon0602/shellgeibot:master
```

作成された.envに必要な環境変数を設定する。
どんな環境変数が必要かはsrc/env.tsを参照。

# 起動

## コマンド

```shell
# 開発用起動
npm run start:dev

# バックグラウンド起動
nohup npm run start:production &
# ログをみる
tail -f nohup.out
# バックグラウンド起動の終了
kill $(ps alx | grep node | grep enable-source-maps | awk '{ print $3 }')

watch -n 10 './watchdog.sh > "watchdog.log"' &> /dev/null &
```

```shell
# シェル芸ボットで任意のシェル芸を実行する
npm run shellgei '<シェル芸>'
```

# LICENSE

MIT

- 私的に趣味で作っているものなので、使用する際は自己責任でお願いします。