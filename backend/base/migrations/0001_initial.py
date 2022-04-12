# Generated by Django 3.2.9 on 2022-04-12 08:56

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Product',
            fields=[
                ('name', models.CharField(blank=True, max_length=200, null=True, verbose_name='Название продукта')),
                ('brand', models.CharField(blank=True, max_length=200, null=True, verbose_name='Брэнд')),
                ('category', models.CharField(blank=True, max_length=200, null=True, verbose_name='Категория')),
                ('description', models.TextField(blank=True, null=True, verbose_name='Описание')),
                ('rating', models.DecimalField(blank=True, decimal_places=2, max_digits=7, null=True, verbose_name='Рейтинг')),
                ('numReviews', models.IntegerField(blank=True, default=0, null=True, verbose_name='Количество оценок')),
                ('price', models.DecimalField(blank=True, decimal_places=2, max_digits=7, null=True, verbose_name='Цена')),
                ('countInStock', models.IntegerField(blank=True, default=0, null=True, verbose_name='Наличие в продаже')),
                ('createdAt', models.DateTimeField(auto_now_add=True, verbose_name='Создано')),
                ('_id', models.AutoField(editable=False, primary_key=True, serialize=False)),
                ('user', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to=settings.AUTH_USER_MODEL, verbose_name='Пользователь')),
            ],
        ),
    ]