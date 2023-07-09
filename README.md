# シェル芸ボット

## 初期設定

```shell
npm install
```

# 起動

```shell
npm run start
```

## バックグラウンド起動

```shell
nohup npm run start &
```

切る時

```shell
kill $(ps alx | grep node | grep enable-source-maps | awk '{ print $3 }')
```