output "Адрес-ip-LB" {
  value = yandex_compute_instance.lb.network_interface.0.nat_ip_address
}