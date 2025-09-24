resource "aws_sqs_queue" "log_processing" {
  name                      = "${var.project_name}-${var.environment}-log-processing"
  delay_seconds             = 0
  max_message_size          = 262144
  message_retention_seconds = 1209600
  receive_wait_time_seconds = 10

  tags = {
    Name        = "${var.project_name}-${var.environment}-log-processing"
    Environment = var.environment
    Project     = var.project_name
  }
}

resource "aws_sqs_queue" "log_processing_dlq" {
  name = "${var.project_name}-${var.environment}-log-processing-dlq"

  tags = {
    Name        = "${var.project_name}-${var.environment}-log-processing-dlq"
    Environment = var.environment
    Project     = var.project_name
  }
}

resource "aws_sqs_queue_redrive_policy" "log_processing" {
  queue_url = aws_sqs_queue.log_processing.id
  redrive_policy = jsonencode({
    deadLetterTargetArn = aws_sqs_queue.log_processing_dlq.arn
    maxReceiveCount     = 3
  })
}