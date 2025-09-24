output "queue_url" {
  description = "URL of the SQS queue"
  value       = aws_sqs_queue.log_processing.url
}

output "queue_arn" {
  description = "ARN of the SQS queue"
  value       = aws_sqs_queue.log_processing.arn
}

output "dlq_url" {
  description = "URL of the dead letter queue"
  value       = aws_sqs_queue.log_processing_dlq.url
}