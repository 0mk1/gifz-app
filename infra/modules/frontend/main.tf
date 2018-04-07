provider "aws" {
  region = "${var.region}"
}

resource "aws_s3_bucket" "default" {
  bucket = "${var.domain}"
  acl    = "private"

  website {
    index_document = "index.html"
    error_document = "index.html"
  }

  tags {
    Name = "${var.domain}"
    Environment = "${var.environment}"
  }
}

resource "aws_s3_bucket_policy" "default" {
  bucket = "${aws_s3_bucket.default.id}"
  policy = "${data.aws_iam_policy_document.default.json}"
}

data "aws_iam_policy_document" "default" {
  statement {
    actions = ["s3:GetObject"]
    resources = ["${aws_s3_bucket.default.arn}/*"]

    principals {
      type        = "AWS"
      identifiers = ["${aws_cloudfront_origin_access_identity.default.iam_arn}"]
    }
  }
  statement {
    actions = ["s3:ListBucket"]
    resources = ["${aws_s3_bucket.default.arn}"]

    principals {
      type        = "AWS"
      identifiers = ["${aws_cloudfront_origin_access_identity.default.iam_arn}"]
    }
  }
}

resource "aws_s3_bucket" "logs" {
  bucket = "${var.domain}-logs"
  acl    = "log-delivery-write"

  tags {
    Name = "${var.domain}-logs"
    Environment = "${var.environment}"
  }
}

resource "aws_cloudfront_origin_access_identity" "default" {}


resource "aws_acm_certificate" "default" {
  domain_name = "${var.domain}"
  validation_method = "EMAIL"

  tags {
    Name = "${var.domain}"
    Environment = "${var.environment}"
  }
}

resource "aws_cloudfront_distribution" "default" {
  origin {
    domain_name = "${aws_s3_bucket.default.bucket_domain_name}"
    origin_id = "${var.domain}"

    s3_origin_config {
      origin_access_identity = "${aws_cloudfront_origin_access_identity.default.cloudfront_access_identity_path}"
    }
  }

  enabled = true
  is_ipv6_enabled = true
  default_root_object = "index.html"

  logging_config {
    include_cookies = false
    bucket = "${aws_s3_bucket.logs.bucket_domain_name}"
  }

  aliases = ["${var.domain}"]

  default_cache_behavior {
    allowed_methods = ["GET", "HEAD"]
    cached_methods = ["GET", "HEAD"]
    target_origin_id = "${var.domain}"
    compress = true

    forwarded_values {
      query_string = true

      cookies {
        forward = "none"
      }
    }

    viewer_protocol_policy = "redirect-to-https"
    min_ttl = 0
    default_ttl = 3600
    max_ttl = 86400
  }

  custom_error_response {
    error_code = 404
    response_page_path = "/index.html"
    response_code = 200
  }

  custom_error_response {
    error_code = 403
    response_page_path = "/index.html"
    response_code = 200
  }

  # Distributes content to US and Europe, 200 is for whole world
  price_class = "PriceClass_100"

  # Restricts who is able to access this content
  restrictions {
    geo_restriction {
        restriction_type = "none"
    }
  }

  viewer_certificate {
    cloudfront_default_certificate = false
    acm_certificate_arn = "${aws_acm_certificate.default.arn}"
    ssl_support_method = "sni-only"
  }

  tags {
    Name = "${var.domain}"
    Environment = "${var.environment}"
  }
}

resource "cloudflare_record" "default" {
  domain = "${var.cloudflare_domain}"
  name   = "${var.domain}"
  value  = "${aws_cloudfront_distribution.default.domain_name}"
  type   = "CNAME"
  proxied = false
}
