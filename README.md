# RegalCast Missions MakeCode Extension

Minecraft EducationのStage02・04・06を、子どもがMakeCodeのブロックで攻略するための拡張機能です。

> 現在はv0.1.0-alphaです。Minecraft Education実機での初回コンパイルと3ステージ通し試験が終わるまで、本番イベントでは使用しないでください。

## 子どもが使うブロック

- `ステージを じゅんびする`
- `いまは ステージ○に ちょうせん`
- `Agentを 前へ ○ マス`
- `Agentを 左へ向ける`
- `Agentを 右へ向ける`
- `Agentを 最初へもどす`
- `ヒントを見せる`
- `答えを たしかめる`

Stage06の反復にはMakeCode標準の「ループ > くりかえし」ブロックを使います。

## 教材の構成

`student-template.ts`を1つのMakeCodeプロジェクトへ入れると、次のチャットコマンドがブロックとして並びます。

- `start02` / `mission02`
- `start04` / `mission04`
- `start06` / `mission06`
- `agent_reset` / `agent_hint`

各`mission`の中にある数字、向き、くり返し回数を子どもが直します。座標判定、扉の色、ドラゴン削除、失敗表示は拡張機能内に隠しています。

## 導入前に必要な作業

公開後はMakeCodeの「拡張機能」を開き、次のURLを検索欄へ貼り付けます。

```text
https://github.com/kkimura-bot/regalcast-makecode-missions
```

紫色の`RegalCast`カテゴリが表示されたら、`student-template.ts`をJavaScript表示へ貼り付け、ブロック表示へ戻します。公開前および初回読み込み前には、Minecraft Education実機でブロックへの変換と各Stageの座標判定を確認してください。

世界の全建築を行う`main.py`とは役割が異なります。建築は事前に`main.py`で完成させ、イベント中はこの教材プロジェクトを子どもが使います。

## 既存GitHubの保護

この拡張は`regalcast-makecode-missions`という新規の独立リポジトリだけで管理します。既存のRegalCastリポジトリへsubmodule追加、commit、push、設定変更は行いません。
