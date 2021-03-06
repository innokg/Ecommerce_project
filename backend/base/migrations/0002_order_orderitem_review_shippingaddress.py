# Generated by Django 3.2.9 on 2022-04-12 10:08

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('base', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Order',
            fields=[
                ('paymentMethod', models.CharField(blank=True, max_length=200, null=True, verbose_name='Способ оплаты')),
                ('taxPrice', models.DecimalField(blank=True, decimal_places=2, max_digits=7, null=True, verbose_name='Стоимость налога')),
                ('shippingPrice', models.DecimalField(blank=True, decimal_places=2, max_digits=7, null=True, verbose_name='Цена доставки')),
                ('totalPrice', models.DecimalField(blank=True, decimal_places=2, max_digits=7, null=True, verbose_name='Общая цена')),
                ('isPaid', models.BooleanField(default=False, verbose_name='Оплачено')),
                ('paidAt', models.DateTimeField(blank=True, null=True, verbose_name='Время оплаты')),
                ('isDelivered', models.BooleanField(default=False, verbose_name='Доставлено')),
                ('deliveredAt', models.DateTimeField(blank=True, null=True, verbose_name='Время доставки')),
                ('createdAt', models.DateTimeField(auto_now_add=True, verbose_name='Создано')),
                ('_id', models.AutoField(editable=False, primary_key=True, serialize=False)),
                ('user', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to=settings.AUTH_USER_MODEL, verbose_name='Пользователь')),
            ],
        ),
        migrations.CreateModel(
            name='ShippingAddress',
            fields=[
                ('address', models.CharField(blank=True, max_length=200, null=True, verbose_name='Адрес')),
                ('city', models.CharField(blank=True, max_length=200, null=True, verbose_name='Город')),
                ('postalCode', models.CharField(blank=True, max_length=200, null=True, verbose_name='Почтовый индекс')),
                ('country', models.CharField(blank=True, max_length=200, null=True, verbose_name='Страна')),
                ('shippingPrice', models.DecimalField(blank=True, decimal_places=2, max_digits=7, null=True, verbose_name='Цена доставки товара')),
                ('_id', models.AutoField(editable=False, primary_key=True, serialize=False)),
                ('order', models.OneToOneField(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='base.order', verbose_name='Заказ')),
            ],
        ),
        migrations.CreateModel(
            name='Review',
            fields=[
                ('name', models.CharField(blank=True, max_length=200, null=True, verbose_name='Название продукта')),
                ('rating', models.IntegerField(blank=True, default=0, null=True, verbose_name='Рейтинг')),
                ('comment', models.TextField(blank=True, null=True, verbose_name='Описание')),
                ('_id', models.AutoField(editable=False, primary_key=True, serialize=False)),
                ('product', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='base.product', verbose_name='Продукт')),
                ('user', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to=settings.AUTH_USER_MODEL, verbose_name='Пользователь')),
            ],
        ),
        migrations.CreateModel(
            name='OrderItem',
            fields=[
                ('name', models.CharField(blank=True, max_length=200, null=True, verbose_name='Название')),
                ('qty', models.IntegerField(blank=True, default=0, null=True, verbose_name='Количество')),
                ('price', models.DecimalField(blank=True, decimal_places=2, max_digits=7, null=True, verbose_name='Цена')),
                ('image', models.CharField(blank=True, max_length=200, null=True, verbose_name='Фото')),
                ('_id', models.AutoField(editable=False, primary_key=True, serialize=False)),
                ('order', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='base.order', verbose_name='Заказ')),
                ('product', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='base.product', verbose_name='Продукт')),
            ],
        ),
    ]
