resource "aws_s3_bucket" "terraform_state_bucket" {
  bucket = "frd-terraform-state-bucket"
}

resource "aws_s3_bucket_versioning" "terraform_state_bucket_versioning" {
  bucket = aws_s3_bucket.terraform_state_bucket.id
  versioning_configuration {
    status = "Enabled"
  }
}

resource "aws_s3_bucket_ownership_controls" "terraform_state_bucket_ownership_controls" {
  bucket = aws_s3_bucket.terraform_state_bucket.id

  rule {
    object_ownership = "BucketOwnerPreferred"
  }
}

resource "aws_s3_bucket_acl" "terraform_state_bucket_acl" {
  depends_on = [aws_s3_bucket_ownership_controls.terraform_state_bucket_ownership_controls]

  bucket = aws_s3_bucket.terraform_state_bucket.id
  acl    = "private"
}

resource "aws_dynamodb_table" "state_lock_table" {
  billing_mode = "PAY_PER_REQUEST"
  hash_key     = "LockID"
  name         = "terraform-state-lock"
  attribute {
    name = "LockID"
    type = "S"
  }
}


