#!/bin/bash

# プログラムのプロセスIDを取得
pid=$(ps alx | grep node | grep enable-source-maps)

# プロセスIDが存在しない場合、プログラムを再起動
if [ -z "$pid" ]; then
    echo "プログラムが実行されていません。再起動します。"

    # ここにプログラムを起動するコマンドを追加してください
    nohup npm run start:production &

    echo "プログラムが再起動しました。"
else
    echo "プログラムは既に実行中です（プロセスID: $pid）。"
fi
