resource "aws_s3_bucket" "ofe_rmbucket" {
  bucket = "ofe-rmbucket"
}

resource "aws_s3_bucket_ownership_controls" "ofe_rmbucket_ownership_controls" {
  bucket = aws_s3_bucket.ofe_rmbucket.id

  rule {
    object_ownership = "BucketOwnerPreferred"
  }
}

resource "aws_s3_bucket_public_access_block" "ofe_rmbucket_ownership_public_access_block" {
  bucket = aws_s3_bucket.ofe_rmbucket.id

  block_public_acls       = false
  block_public_policy     = false
  ignore_public_acls      = false
  restrict_public_buckets = false
}

resource "aws_s3_bucket_acl" "ofe_rmbucket_acl" {
  depends_on = [
    aws_s3_bucket_ownership_controls.ofe_rmbucket_ownership_controls,
    aws_s3_bucket_public_access_block.ofe_rmbucket_ownership_public_access_block,
  ]

  bucket = aws_s3_bucket.ofe_rmbucket.id
  acl    = "public-read"
}

resource "aws_s3_bucket_policy" "ofe_rmbucket_policy" {
  bucket = aws_s3_bucket.ofe_rmbucket.id
  policy = jsonencode({
    "Version" : "2012-10-17",
    "Statement" : [
      {
        "Sid" : "PublicReadGetObject",
        "Effect" : "Allow",
        "Principal" : "*",
        "Action" : "s3:GetObject",
        "Resource" : "arn:aws:s3:::ofe-rmbucket/*"
      }
    ]
  })
}

resource "aws_s3_bucket_website_configuration" "ofe_rmbucket_website_configuration" {
  bucket = aws_s3_bucket.ofe_rmbucket.id

  index_document {
    suffix = "index.html"
  }
}

