from django.contrib import admin
from store.models import Product, Client, Order, OrderItems

# Register your models here.
class ProductAdmin(admin.ModelAdmin):
    list_display = ('render_image_squere', 'title', 'price', 'size')
    readonly_fields = ('render_image_squere', 'render_image_circle')
admin.site.register(Product, ProductAdmin)

class ClientAdmin(admin.ModelAdmin):
    list_display=('name','address', 'email', 'phone', 'message')
admin.site.register(Client, ClientAdmin)

class OrderAdmin(admin.ModelAdmin):
    list_display = ('date', 'client')
admin.site.register(Order, OrderAdmin)

class OrderItemsAdmin(admin.ModelAdmin):
    list_display=('product', 'amount')
admin.site.register(OrderItems, OrderItemsAdmin)

from .models import DiscountProductLink
class DiscountInline(admin.TabularInline):
    model=DiscountProductLink
from .models import Discount
class DiscountAdmin(admin.ModelAdmin):
    list_display=('name', 'price')
    inlines = [DiscountInline,]
admin.site.register(Discount, DiscountAdmin)

