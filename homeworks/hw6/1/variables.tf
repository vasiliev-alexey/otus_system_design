variable "zone" {
  description = "Зона доступности"
  type        = string
  default     = "ru-central1-a"
}


variable "cloud_image_id" {
  description = "image for virual machine in cloud"
  type        = string
}