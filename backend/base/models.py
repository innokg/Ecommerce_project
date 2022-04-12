from django.db import models
from django.contrib.auth.models import User


# Create your models here.
class Product(models.Model):

    user = models.ForeignKey(User,
     on_delete=models.SET_NULL,
     null=True,
     verbose_name='Пользователь')

    name = models.CharField(
        max_length=200,
        null=True,
        blank=True,
        verbose_name='Название продукта')

    image = models.ImageField(
        null=True,
        blank=True,
        verbose_name='Фото')
    
    brand = models.CharField(
        max_length=200,
        null=True,
        blank=True,
        verbose_name='Брэнд')

    category = models.CharField(
        max_length=200,
        null=True,
        blank=True,
        verbose_name='Категория')

    description = models.TextField(verbose_name='Описание', 
        null=True, 
        blank=True)
    
    rating = models.DecimalField(
        max_digits=7, 
        decimal_places=2, 
        null=True,
        blank=True,
        verbose_name='Рейтинг')

    numReviews = models.IntegerField(null=True,blank=True, verbose_name='Количество оценок', default=0)

    price = models.DecimalField(max_digits=7, 
        decimal_places=2,null=True,
        blank=True, 
        verbose_name='Цена')

    countInStock = models.IntegerField(null=True,blank=True, verbose_name='Наличие в продаже', default=0)

    createdAt = models.DateTimeField(auto_now_add=True, verbose_name='Создано')

    _id =  models.AutoField(primary_key=True, editable=False)

    def __str__(self):
        return self.name


class Review(models.Model):
    product = models.ForeignKey(Product,
        on_delete=models.SET_NULL,
        null=True,
        verbose_name='Продукт')

    user = models.ForeignKey(User,
        on_delete=models.SET_NULL,
        null=True,
        verbose_name='Пользователь')

    name = models.CharField(
        max_length=200,
        null=True,
        blank=True,
        verbose_name='Название продукта')

    rating = models.IntegerField(
        null=True,
        blank=True,
        default=0,
        verbose_name='Рейтинг')

    comment = models.TextField(
        verbose_name='Описание', 
        null=True, 
        blank=True)

    _id =  models.AutoField(primary_key=True, editable=False)

    def __str__(self):
        return str(self.rating)


class Order(models.Model):
    user = models.ForeignKey(User,
        on_delete=models.SET_NULL,
        null=True,
        verbose_name='Пользователь')

    paymentMethod = models.CharField(
        max_length=200,
        null=True,
        blank=True,
        verbose_name='Способ оплаты')

    taxPrice = models.DecimalField(max_digits=7, 
        decimal_places=2,null=True,
        blank=True, 
        verbose_name='Стоимость налога')

    shippingPrice = models.DecimalField(max_digits=7, 
        decimal_places=2,null=True,
        blank=True, 
        verbose_name='Цена доставки')

    totalPrice = models.DecimalField(max_digits=7, 
        decimal_places=2,null=True,
        blank=True, 
        verbose_name='Общая цена')

    isPaid = models.BooleanField(default=False, verbose_name='Оплачено')

    paidAt = models.DateTimeField(auto_now_add=False, null=True, blank=True, verbose_name='Время оплаты')

    isDelivered = models.BooleanField(default=False, verbose_name='Доставлено')

    deliveredAt = models.DateTimeField(auto_now_add=False, null=True, blank=True, verbose_name='Время доставки')

    createdAt = models.DateTimeField(auto_now_add=True, verbose_name='Создано')

    _id =  models.AutoField(primary_key=True, editable=False)

    def __str__(self):
        return str(self.createdAt)



class OrderItem(models.Model):
    product = models.ForeignKey(Product,
        on_delete=models.SET_NULL,
        null=True,
        verbose_name='Продукт')

    order = models.ForeignKey(Order,
        on_delete=models.SET_NULL,
        null=True,
        verbose_name='Заказ')

    name = models.CharField(
        max_length=200,
        null=True,
        blank=True,
        verbose_name='Название')

    qty = models.IntegerField(
        null=True,
        blank=True,
        default=0,
        verbose_name='Количество')

    price = models.DecimalField(max_digits=7, 
        decimal_places=2,null=True,
        blank=True, 
        verbose_name='Цена')

    image = models.CharField(max_length=200, null=True, blank=True, verbose_name='Фото')

    _id =  models.AutoField(primary_key=True, editable=False)

    def __str__(self):
        return str(self.name)


class ShippingAddress(models.Model):

    order = models.OneToOneField(Order, 
        on_delete=models.CASCADE, 
        null=True, blank=True, 
        verbose_name='Заказ')

    address = models.CharField(max_length=200, 
        null=True, 
        blank=True, 
        verbose_name='Адрес')

    city = models.CharField(max_length=200, 
        null=True, blank=True, 
        verbose_name='Город')

    postalCode = models.CharField(max_length=200, 
        null=True, blank=True, 
        verbose_name='Почтовый индекс')

    country = models.CharField(max_length=200, 
        null=True, blank=True, 
        verbose_name='Страна')

    shippingPrice = models.DecimalField(max_digits=7, 
        decimal_places=2,null=True,
        blank=True, 
        verbose_name='Цена доставки товара')

    _id =  models.AutoField(primary_key=True, editable=False)


    def __str__(self):
        return str(self.address)
