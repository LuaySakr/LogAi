output "vpc_id" {
  description = "ID of the VPC"
  value       = module.vpc.vpc_id
}

output "s3_bucket_name" {
  description = "Name of the S3 bucket for logs"
  value       = module.s3.bucket_name
}

output "database_endpoint" {
  description = "RDS instance endpoint"
  value       = module.rds.endpoint
}

output "sqs_queue_url" {
  description = "SQS queue URL"
  value       = module.sqs.queue_url
}

output "ecs_cluster_name" {
  description = "ECS cluster name"
  value       = module.ecs.cluster_name
}

output "load_balancer_dns" {
  description = "Application Load Balancer DNS name"
  value       = module.ecs.load_balancer_dns
}