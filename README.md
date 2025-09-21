# PJM System (Test env)

React (applicant/admin) + Flask (backend)  
Docker Compose で統一環境を構築し、本番は Cloud Run / Firebase Hosting で運用予定。

---

## 📂 構成
- `backend/` : Flask API
- `frontend/applicant/` : React (求職者向け)
- `frontend/admin/` : React (管理者向け)
- `infra/` : docker-compose, .env.example

--
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

🛑 注意
node_modules/ と .env は Git に含めない

.env.example を更新してチームで共有する
