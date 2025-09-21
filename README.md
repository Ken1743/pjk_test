# pjk_test


.env は必ずローカルだけ
→ .env.example にサンプル値を書いてコミット

node_modules/ は除外必須
→ 各メンバーが npm install で生成する

ビルド成果物 (build/) は除外
→ 本番デプロイ時はCI/CDで生成