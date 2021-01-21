from django.db import models
from django.conf import settings
from django.utils.html import mark_safe

# Create your models here.
class Product(models.Model):
    title = models.CharField(max_length=200)
    description = models.CharField(max_length=500)
    image1 = models.ImageField(upload_to="upload", verbose_name="circle image")
    image2 = models.ImageField(upload_to="upload", null=True, verbose_name="squere image")
    price = models.IntegerField(verbose_name="price")
    size = models.CharField(max_length=50)
    def __str__(self):
        return self.title

    def render_image_circle(self, *args, **kwargs):
        ret = ''
        print(self.image1)
        if self.image1 != None:
            ret += '<div style="width:250px;height:250px;background:url(%s) center;"></div>' % (settings.MEDIA_URL + self.image1.name) 
        return mark_safe(ret)
    render_image_circle.short_description = ("image circle")

    def render_image_squere(self, *args, **kwargs):
        ret = ''
        print(self.image2)
        if self.image2 != None:
            ret += '<div style="width:510px;height:200px;background:url(%s) center;"></div>' % (settings.MEDIA_URL + self.image2.name) 
        return mark_safe(ret)
    render_image_squere.short_description = ("image squere")