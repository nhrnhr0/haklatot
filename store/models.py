from django.db import models

# Create your models here.
class Product(models.Model):
    title = models.CharField(max_length=200)
    description = models.CharField(max_length=500)
    image1 = models.ImageField(upload_to="upload")
    image2 = models.ImageField(upload_to="upload", null=True)