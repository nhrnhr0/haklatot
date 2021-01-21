from django.contrib import admin
from store.models import Product

# Register your models here.
class ProductAdmin(admin.ModelAdmin):
    list_display = ('render_image_squere', 'title', 'price', 'size')
    readonly_fields = ('render_image_squere', 'render_image_circle')
admin.site.register(Product, ProductAdmin)