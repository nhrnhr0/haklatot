from django.urls import path, include
from rest_framework import routers, serializers, viewsets
from .models import Discount, DiscountProductLink, Product

class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = ('id', 'title','price',)

class DiscountProductLinkSerializer(serializers.ModelSerializer):
    product = ProductSerializer()
    class Meta:
        model=DiscountProductLink
        fields = ('amount','product')

class DiscountSerializer(serializers.ModelSerializer):
    products = DiscountProductLinkSerializer(many=True,  source='disdetalis')
    class Meta:
        model = Discount
        fields = ('id', 'name','price', 'products','image')

class DiscountSerializerViewSet(viewsets.ModelViewSet):
    queryset = Discount.objects.all()
    serializer_class = DiscountSerializer
    
class ProductSerializerViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer

class DiscountProductLinkSerializerViewSet(viewsets.ModelViewSet):
    queryset = DiscountProductLink.objects.all()
    serializer_class = DiscountProductLink




'''
class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = ('id', 'title',)





class DiscountSerializer(serializers.ModelSerializer):
    #products = ProductSerializer(many=True)
    #amounts = serializers.ReadOnlyField(source='product.amount')
    class Meta:
        model = Discount
        fields = ('name',)# 'products','amounts')


class DiscountProductLinkSerializer(serializers.HyperlinkedModelSerializer):
    #product_id = serializers.ReadOnlyField(source='product.id')
    #product_title = serializers.ReadOnlyField(source='product.title')
    #discount_name = serializers.ReadOnlyField(source='discount.name')
    #discount_id = serializers.ReadOnlyField(source='discount.id')
    #discount_amount = serializers.ReadOnlyField(source='discount.amount')
    products = ProductSerializer(many=True, read_only=True)
    discount_name = serializers.SlugRelatedField('discount.name', read_only=True)
    class Meta:
        model = DiscountProductLink
        #fields = ('product_id', 'product_title', 'discount_name', 'discount_id', 'amount')
        fields = ('discount_name', 'products', 'amount')


class ProductSerializerViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer


class DiscountProductLinkSerializerViewSet(viewsets.ModelViewSet):
    queryset = DiscountProductLink.objects.all()
    serializer_class = DiscountProductLinkSerializer

class DiscountSerializerViewSet(viewsets.ModelViewSet):
    queryset = Discount.objects.all()
    serializer_class = DiscountSerializer
'''
'''
class DiscountProductLinkSerializer(serializers.ModelSerializer):
    product_name = serializers.ReadOnlyField(source='product.name')
    product_id = serializers.ReadOnlyField(source='product.id')

    class Meta:
        model = DiscountProductLink
        fields = ('amount', 'product_name', 'product_id')

class DiscountProductLinkSerializerViewSet(viewsets.ModelViewSet):
    queryset = Discount.objects.all()
    serializer_class = DiscountProductLinkSerializer

class DiscountSerializer(serializers.ModelSerializer):
    products = DiscountProductLinkSerializer(source='products_set', many=True)
    class Meta:
        model = Discount
        fields = ('name','products', 'price')
class DiscountSerializerViewSet(viewsets.ModelViewSet):
    queryset = Discount.objects.all()
    serializer_class = DiscountSerializer
'''
'''
class DiscountSerializer(serializers.ModelSerializer):
    amounts = serializers.SlugRelatedField(
        many=True,
        read_only=True,
        slug_field='DiscountProductLink_amount'
    )
    class Meta:
        model = Discount
        fields = ['name', 'products','amounts', 'price']
        depth = 10

class DiscountSerializerViewSet(viewsets.ModelViewSet):
    queryset = Discount.objects.all()
    serializer_class = DiscountSerializer
'''
'''
class DiscountProductLinkSerializer(serializers.ModelSerializer):
    class Meta:
        model = DiscountProductLink
        fields = ['product', 'discount', 'amount']
        depth = 1

class DiscountProductLinkViewSet(viewsets.ModelViewSet):
    queryset = DiscountProductLink.objects.all()
    serializer_class = DiscountProductLinkSerializer
'''