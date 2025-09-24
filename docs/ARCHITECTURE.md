# LogAi Architecture

## Overview
LogAi is a cloud-native, AI-powered log analysis SaaS built with modern technologies and best practices. The architecture follows microservices principles with clear separation of concerns.

## System Architecture

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Frontend      │    │    Backend      │    │  Infrastructure │
│   (Next.js)     │◄──►│   (FastAPI)     │◄──►│     (AWS)       │
│                 │    │                 │    │                 │
│ • Dashboard     │    │ • REST API      │    │ • ECS Cluster   │
│ • File Upload   │    │ • Auth System   │    │ • RDS Postgres  │
│ • Visualizations│    │ • AI Processing │    │ • S3 Storage    │
│ • Real-time UI  │    │ • Queue Workers │    │ • SQS Queues    │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

## Components

### Frontend (Next.js)
- **Framework**: Next.js 15 with App Router
- **Styling**: Tailwind CSS for responsive design
- **Icons**: Lucide React for consistent iconography
- **Features**:
  - Dashboard with key metrics
  - Log file upload with drag & drop
  - AI summary visualization
  - Anomaly alerts management
  - Real-time status updates

### Backend (FastAPI)
- **Framework**: FastAPI with automatic OpenAPI docs
- **Database**: SQLAlchemy ORM with PostgreSQL
- **Validation**: Pydantic schemas for type safety
- **Authentication**: JWT-based auth system (ready)
- **AI Integration**: OpenAI GPT integration (ready)
- **Async Processing**: Celery with Redis/SQS

### Database Schema
```sql
Organizations (id, name, slug, is_active, created_at, updated_at)
Users (id, email, hashed_password, full_name, is_active, is_admin, organization_id)
Uploads (id, organization_id, filename, s3_key, file_size, status, metadata)
Summaries (id, organization_id, upload_id, title, content, key_issues, severity)
Anomalies (id, organization_id, upload_id, type, description, confidence_score, severity, status)
AlertRules (id, organization_id, name, description, conditions, actions, is_active)
```

### Infrastructure (AWS + Terraform)

#### Networking
- **VPC**: Custom VPC with public/private subnets
- **Security**: Security groups for service communication
- **Load Balancing**: Application Load Balancer for high availability

#### Compute
- **ECS**: Container orchestration for scalable deployments
- **EC2**: Auto-scaling groups for cost optimization
- **Fargate**: Serverless containers for variable workloads

#### Storage
- **RDS**: Managed PostgreSQL with backups and read replicas
- **S3**: Secure log file storage with lifecycle policies
- **ElastiCache**: Redis for caching and session storage

#### Messaging
- **SQS**: Message queues for async log processing
- **SNS**: Notifications for alerts and system events

## Data Flow

1. **Log Ingestion**: Users upload log files via web interface
2. **Storage**: Files stored in S3 with metadata in RDS
3. **Processing**: SQS triggers async processing workers
4. **Analysis**: AI models analyze logs and generate insights
5. **Alerts**: Anomaly detection triggers configurable alerts
6. **Visualization**: Results displayed in real-time dashboard

## Security

- **Authentication**: JWT tokens with refresh mechanism
- **Authorization**: Role-based access control (RBAC)
- **Data Encryption**: TLS in transit, AES-256 at rest
- **Network Security**: VPC isolation with security groups
- **Secrets Management**: AWS Secrets Manager for credentials
- **Audit Logging**: CloudTrail for compliance and monitoring

## Scalability

- **Horizontal Scaling**: ECS auto-scaling based on metrics
- **Database**: Read replicas and connection pooling
- **Caching**: Multi-layer caching strategy
- **CDN**: CloudFront for static asset delivery
- **Queue Processing**: Multiple worker instances for parallel processing

## Monitoring & Observability

- **Application Metrics**: Custom metrics for business KPIs
- **Infrastructure Monitoring**: CloudWatch for AWS resources
- **Log Aggregation**: Centralized logging with structured formats
- **Health Checks**: Automated health monitoring and alerting
- **Performance**: APM integration for request tracing

## Development Workflow

1. **Local Development**: Docker Compose for full stack
2. **Testing**: Automated unit, integration, and E2E tests
3. **CI/CD**: GitHub Actions for automated deployment
4. **Environment Promotion**: Dev → Staging → Production
5. **Rollback Strategy**: Blue-green deployments with quick rollback

## Technology Choices

### Why FastAPI?
- Automatic API documentation
- Type hints and validation
- High performance (async/await)
- Python ecosystem for AI/ML

### Why Next.js?
- Server-side rendering for SEO
- File-based routing
- Built-in optimizations
- React ecosystem

### Why PostgreSQL?
- ACID compliance for data integrity
- JSON support for flexible schemas
- Full-text search capabilities
- Mature ecosystem

### Why AWS?
- Managed services reduce operational overhead
- Global infrastructure for low latency
- Security and compliance certifications
- Cost optimization tools

## Future Enhancements

- **Real-time Processing**: Apache Kafka for stream processing
- **Advanced AI**: Custom ML models for domain-specific analysis
- **Multi-tenancy**: Complete tenant isolation
- **Mobile App**: React Native companion app
- **Integrations**: Slack, PagerDuty, Datadog integrations
- **Analytics**: Advanced reporting and dashboard customization