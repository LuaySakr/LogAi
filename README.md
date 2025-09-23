# LogAi
LogAi is an AI-powered log analysis SaaS. It ingests logs from apps, servers, or containers, summarizes key issues using LLMs, detects anomalies, and sends actionable alerts. Built with FastAPI, Next.js, Postgres, and S3, it aims to simplify troubleshooting for DevOps and SRE teams.

![LogAi Dashboard](https://github.com/user-attachments/assets/e176deaa-1a42-4fbc-972a-5932de22c813)

## 🚀 Features

- **AI-Powered Analysis**: Uses LLMs to automatically analyze logs and generate insights
- **Log Ingestion**: Simple upload interface for various log formats
- **Anomaly Detection**: Automatically detects unusual patterns in your logs
- **Smart Alerts**: Configurable alert rules with intelligent notifications
- **Real-time Dashboard**: Modern web interface for viewing logs and summaries
- **Scalable Architecture**: Built on AWS with ECS, RDS, S3, and SQS

## 🏗️ Architecture

### Backend (FastAPI)
- RESTful API with automatic OpenAPI documentation
- PostgreSQL database with SQLAlchemy ORM
- Celery for async log processing
- JWT authentication and authorization
- AI integration with OpenAI GPT models

### Frontend (Next.js)
- Modern React-based dashboard
- Server-side rendering for better performance
- Responsive design with Tailwind CSS
- Real-time updates and notifications

### Infrastructure (AWS + Terraform)
- **ECS**: Container orchestration for scalable deployments
- **RDS**: Managed PostgreSQL database
- **S3**: Secure log file storage
- **SQS**: Message queuing for async processing
- **VPC**: Secure network architecture

## 🛠️ Development Setup

### Prerequisites
- Docker and Docker Compose
- Node.js 18+ 
- Python 3.11+
- PostgreSQL 15+

### Quick Start

1. **Clone the repository**
   ```bash
   git clone https://github.com/LuaySakr/LogAi.git
   cd LogAi
   ```

2. **Set up environment variables**
   ```bash
   # Backend
   cp backend/.env.example backend/.env
   # Edit backend/.env with your configuration
   
   # Frontend
   cp frontend/.env.example frontend/.env.local
   # Edit frontend/.env.local with your configuration
   ```

3. **Start the services**
   ```bash
   # Using Docker Compose (recommended)
   docker-compose up -d
   
   # Or run individually:
   
   # Backend
   cd backend
   pip install -r requirements.txt
   uvicorn app.main:app --reload
   
   # Frontend
   cd frontend
   npm install
   npm run dev
   ```

4. **Initialize the database**
   ```bash
   cd database
   alembic upgrade head
   ```

5. **Access the application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:8000
   - API Documentation: http://localhost:8000/docs

## 📁 Project Structure

```
LogAi/
├── backend/                 # FastAPI backend
│   ├── app/
│   │   ├── api/            # API routes
│   │   ├── core/           # Core configuration
│   │   ├── models/         # Database models
│   │   ├── schemas/        # Pydantic schemas
│   │   └── services/       # Business logic
│   ├── tests/              # Backend tests
│   └── requirements.txt
├── frontend/               # Next.js frontend
│   ├── src/
│   │   ├── app/           # App router pages
│   │   └── components/    # React components
│   └── package.json
├── infrastructure/         # Terraform infrastructure
│   ├── modules/           # Reusable Terraform modules
│   └── environments/      # Environment-specific configs
├── database/              # Database migrations
│   └── migrations/        # Alembic migrations
├── .github/
│   └── workflows/         # CI/CD pipelines
└── docs/                  # Documentation
```

## 🚀 Deployment

### AWS Deployment with Terraform

1. **Configure AWS credentials**
   ```bash
   aws configure
   ```

2. **Deploy infrastructure**
   ```bash
   cd infrastructure
   terraform init
   terraform plan -var="db_password=your-secure-password"
   terraform apply
   ```

3. **Build and push Docker images**
   ```bash
   # Backend
   docker build -t your-registry/logai-backend backend/
   docker push your-registry/logai-backend
   
   # Frontend
   docker build -t your-registry/logai-frontend frontend/
   docker push your-registry/logai-frontend
   ```

### Environment Variables

#### Backend (.env)
```env
DATABASE_URL=postgresql://user:password@localhost/logai
SECRET_KEY=your-secret-key
OPENAI_API_KEY=your-openai-key
AWS_ACCESS_KEY_ID=your-aws-key
AWS_SECRET_ACCESS_KEY=your-aws-secret
S3_BUCKET_NAME=your-s3-bucket
REDIS_URL=redis://localhost:6379
```

#### Frontend (.env.local)
```env
NEXT_PUBLIC_API_URL=http://localhost:8000
```

## 📊 API Documentation

The API is automatically documented with OpenAPI/Swagger. Access the interactive documentation at:
- **Swagger UI**: http://localhost:8000/docs
- **ReDoc**: http://localhost:8000/redoc

### Key Endpoints

- `POST /api/v1/logs/ingest` - Upload log files
- `GET /api/v1/summaries` - Get AI-generated summaries
- `GET /api/v1/alerts/anomalies` - Get detected anomalies
- `POST /api/v1/alerts/rules` - Create alert rules

## 🧪 Testing

### Backend Tests
```bash
cd backend
pytest tests/ -v --cov=app
```

### Frontend Tests
```bash
cd frontend
npm test
```

### Integration Tests
```bash
docker-compose -f docker-compose.test.yml up --abort-on-container-exit
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

For support and questions:
- Create an issue on GitHub
- Email: support@logai.dev
- Documentation: https://docs.logai.dev

## 🗺️ Roadmap

- [ ] Real-time log streaming
- [ ] Custom ML model training
- [ ] Slack/Teams integrations
- [ ] Multi-tenant architecture
- [ ] Advanced visualization charts
- [ ] Log correlation analysis
