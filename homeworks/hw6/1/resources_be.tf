resource "yandex_compute_disk" "boot-disk-backend" {
  name     = "boot-disk-backend"
  type     = "network-hdd"
  zone     = var.zone
  size     = "20"
  image_id = var.cloud_image_id # Ubuntu 22.04
}

resource "yandex_compute_instance" "backend" {
  name        = "otus-angie-${local.hw_no}-backend"
  platform_id = "standard-v3"
  hostname = "be"
  zone        = var.zone


  depends_on = [yandex_compute_instance.db]

  scheduling_policy {
    preemptible = true # preimtible vms
  }

  resources {
    cores  = 2
    memory = 2
  }
  boot_disk {
    disk_id = yandex_compute_disk.boot-disk-backend.id
  }

  network_interface {
    subnet_id  = yandex_vpc_subnet.subnet-1.id
    nat        = true
    ip_address = "192.168.10.22"
  }

  metadata = {
    ssh-keys = "ubuntu:${file(local.rsa_key_pub)}"
  }


  provisioner "remote-exec" {
    inline = ["echo 'Im ready for provisioning'"]

    connection {
      type        = "ssh"
      user        = local.user
      private_key = file(local.rsa_key)
      host        = self.network_interface.0.nat_ip_address
    }


  }

  provisioner "local-exec" {
    command     = "ANSIBLE_HOST_KEY_CHECKING=False ansible-playbook -i '${self.network_interface.0.nat_ip_address},' -u '${local.user}'  --private-key '${local.rsa_key}' ./ansible/be.yml"
    working_dir = path.module
  }

}
