#### Инструкция:

1. Регистрируемся в облачном сервисе Yandex Cloud

2. Создаем Folder в облачном сервисе

2. Создаем сервисный аккаунт

```sh
yc iam service-account create --name otus-hl-sa


yc iam service-account list

yc iam service-account list                                                                                                                                                                                                                                                                                       
+----------------------+------------+--------+
|          ID          |    NAME    | LABELS |
+----------------------+------------+--------+
| aje...ed5 | otus-hl-sa |        |
+----------------------+------------+--------+

yc iam key create   --service-account-id aje...ed5  --folder-id b1....et2   --output key.json

yc config set service-account-key key.json


```

3. Назначаем роли для сервисного аккаунта на папку - default

```sh
yc resource-manager folder add-access-binding default   --role admin   --subject serviceAccount:aje...ed5
```

4. Выставляем переменные для terraform скрипта в переменные среды

```sh
export YC_TOKEN=$(yc iam create-token)
export YC_CLOUD_ID=$(yc config get cloud-id)
export YC_FOLDER_ID=$(yc config get folder-id)                                                
```

5. Запускаем terraform

``` sh
terraform  apply -var-file="yc.tfvars"                 
```

В консоли выполнения должно быть надпись с внешним IP созданной виртуалки c балансировщиком

```sh

Outputs:

Адрес-ip-LB = "89.169.159.80"

```

6. Проверяем работу (видим что успешно работает) - фронт загружается. Бекнд работает.

[http://89.169.159.80/](hhttp://89.169.159.80/)
