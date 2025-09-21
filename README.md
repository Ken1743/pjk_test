# PJM System (Test env)

React (applicant/admin) + Flask (backend)  
Docker Compose で統一環境を構築し、本番は Cloud Run / Firebase Hosting で運用予定。
## 📂 構成
- `backend/` : Flask API
- `frontend/applicant/` : React (求職者向け)
- `frontend/admin/` : React (管理者向け)
- `infra/` : docker-compose, .env.example

```
├── README.md
├── backend
│   ├── Dockerfile
│   ├── app.py
│   └── requirements.txt
├── frontend
│   ├── admin
│   │   ├── Dockerfile
│   │   ├── README.md
│   │   ├── node_modules
│   │   ├── package-lock.json
│   │   ├── package.json
│   │   ├── public
│   │   └── src
│   └── applicant
│       ├── Dockerfile
│       ├── README.md
│       ├── node_modules
│       ├── package-lock.json
│       ├── package.json
│       ├── public
│       └── src
├── infra
│   └── docker-compose.yml
└── memo_ken.txt
```

## 🚀 セットアップ

### 環境変数
```bash
cp infra/.env.example infra/.env
2. 起動
bash
コードをコピーする
cd infra
docker compose up --build
3. 確認
Backend → http://localhost:8080/api/hello

Applicant → http://localhost:3000

Admin → http://localhost:3001

注意
node_modules/ と .env は Git に含めない

.env.example を更新してチームで共有する

```

## デプロイ



📄 本番デプロイ手順書
🚀 構成概要

Backend (Flask API) → Google Cloud Run

Frontend (React applicant/admin) → Firebase Hosting

接続 → React 環境変数 (REACT_APP_API_URL) で Cloud Run のエンドポイントを指定

1. GCP (Backend: Flask → Cloud Run)
1.1 プロジェクトを選択
gcloud config set project ringed-trail-472801-j4
gcloud config set compute/region asia-northeast1
gcloud config set compute/zone asia-northeast1-b

1.2 Artifact Registry の作成
gcloud artifacts repositories create backend-repo \
  --repository-format=docker \
  --location=asia-northeast1 \
  --description="Backend container images"

1.3 Docker イメージのビルド & push
cd backend
gcloud builds submit \
  --tag asia-northeast1-docker.pkg.dev/ringed-trail-472801-j4/backend-repo/backend:latest .

1.4 Cloud Run にデプロイ
gcloud run deploy backend \
  --image asia-northeast1-docker.pkg.dev/ringed-trail-472801-j4/backend-repo/backend:latest \
  --platform managed \
  --region asia-northeast1 \
  --allow-unauthenticated


👉 デプロイ成功後、URL が発行される
例:

https://backend-xxxx-asia-northeast1.run.app

1.5 動作確認
curl https://backend-xxxx-asia-northeast1.run.app/api/hello


期待されるレスポンス：

{"message":"Hello from Flask API!"}

2. Firebase (Frontend: React → Hosting)
2.1 Firebase プロジェクトを作成

Firebase Console → 新規プロジェクト

例: pjk-frontend

Google Analytics は任意

2.2 Firebase CLI 設定
npm install -g firebase-tools
firebase login
firebase projects:list
firebase use <PROJECT_ID>

2.3 Hosting サイトを作成

シンプルな名前は予約されているのでユニークに：

firebase hosting:sites:create pjk-applicant
firebase hosting:sites:create pjk-admin

2.4 ターゲットを割り当て
firebase target:clear hosting applicant
firebase target:apply hosting applicant pjk-applicant
firebase target:apply hosting admin pjk-admin

2.5 firebase.json 設定

ルートに配置：

{
  "hosting": [
    {
      "target": "applicant",
      "public": "frontend/applicant/build",
      "ignore": ["firebase.json", "**/.*", "**/node_modules/**"]
    },
    {
      "target": "admin",
      "public": "frontend/admin/build",
      "ignore": ["firebase.json", "**/.*", "**/node_modules/**"]
    }
  ]
}

2.6 React をビルド
cd frontend/applicant
npm run build

cd ../admin
npm run build

2.7 デプロイ
firebase deploy --only hosting:applicant
firebase deploy --only hosting:admin


👉 デプロイ成功後の URL

applicant → https://pjk-applicant.web.app

admin → https://pjk-admin.web.app

3. Backend と Frontend の接続
3.1 環境変数設定

frontend/applicant/.env.production
frontend/admin/.env.production

REACT_APP_API_URL=https://backend-xxxx-asia-northeast1.run.app

3.2 確認

本番の applicant/admin サイトで

Backend says: Hello from Flask API!


と表示されれば接続完了 ✅

4. 運用上の注意

.env.production は Git 管理しないこと（.env.example を共有）

デプロイのたびに React を再ビルド (npm run build) する必要あり

不要になった Cloud Run サービスや Artifact Registry のリポジトリは削除して整理可能

✅ ゴール

Backend (Cloud Run) と Frontend (Firebase Hosting) が接続済み

applicant/admin それぞれが独自 URL で公開

本番環境で利用可能な状態