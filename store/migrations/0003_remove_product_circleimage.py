# Generated by Django 3.1.4 on 2021-01-04 01:55

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('store', '0002_auto_20210103_0059'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='product',
            name='circleImage',
        ),
    ]
