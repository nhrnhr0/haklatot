# Generated by Django 3.1.4 on 2021-02-02 18:19

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('store', '0010_auto_20210202_0751'),
    ]

    operations = [
        migrations.AlterField(
            model_name='discountproductlink',
            name='discount',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='disdetalis', to='store.discount'),
        ),
    ]