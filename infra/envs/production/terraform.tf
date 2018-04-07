terraform {
  required_version = "~> 0.10"

  backend "s3" {
    region = "us-east-1"
    bucket = "terraform-gifz-app"
    key = "production/terraform.tfstate"
    encrypt = true
  }
}

variable "environment" {}
variable "domain" {}
variable "region" {}
variable "cloudflare_email" {}
variable "cloudflare_domain" {}
variable "cloudflare_token" {}

provider "cloudflare" {
  email = "${var.cloudflare_email}"
  token = "${var.cloudflare_token}"
}

provider "aws" {
  region = "${var.region}"
}

module "frontend" {
  source = "../../modules/frontend"

  region = "${var.region}"
  domain = "${var.domain}"
  environment = "${var.environment}"
  cloudflare_domain = "${var.cloudflare_domain}"
}
