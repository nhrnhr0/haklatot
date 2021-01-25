from django.shortcuts import render

# Create your views here.
from .models import Product
# Create your views here.
def home_view(request):
    context = {'products':Product.objects.all()}
    return render(request, 'index.html', context)

from django.core.mail import EmailMessage
from store.models import Client, Order, OrderItems, Product

def cart_form(request):
    if request.method == 'POST' and request.is_ajax():
        print(request)
        name = request.POST.get('field1')
        address = request.POST.get('location')
        email = request.POST.get('field2')
        message = request.POST.get('field3')
        phone = request.POST.get('field4')

        client = Client(name=name, address=address, email=email, phone=phone, message=message)
        client.save()

        

        products = {}
        items = []
        i = 0
        while request.POST.get('products['+str(i)+'][id]') is not None:
            id = request.POST.get('products['+str(i)+'][id]')
            amount = request.POST.get('products['+str(i)+'][amount]')
            products[id] = amount
            i+=1
            item = OrderItems(product=Product.objects.get(pk=id), amount=amount)
            item.save()
            items.append(item)
        
        order = Order(client=client)
        order.save()
        order.orderItems.set(items)
        


        subject = 'טופס הזמנה חדש של חקלתות'
        recipient_list = ['m.sglobalwork@gmail.com',]
        my_body = 'שם: {}\n כתובת: {}\n מייל: {}\n פאלפון: {}\n הערות: {}\n'.format(name, address, email, phone, message)
        my_body += '\nמוצרים:\n'
        for item in items:    
            my_body += 'פריט: \t{} כמות: \t{}\n'.format(item.product.title, item.amount)
        email = EmailMessage(subject, body=my_body,
                            from_email='MS-GLOBAL <bot@ms-global.co.il>',
                            to=recipient_list, reply_to=['m.sglobalwork@gmail.com'])
        mail_res = email.send(True)

    print(request)
    return home_view(request)

def contact_post(request):
    print('contact_post')
    print(request)
    if request.method == 'POST':
        print(request)
        name = request.POST.get('field1')
        address = request.POST.get('location')
        email = request.POST.get('field2')
        message = request.POST.get('field3')
        phone = request.POST.get('field4')
        print(name, address, email, phone, message)
        client = Client(name=name, address=address, email=email, phone=phone, message=message)
        client.save()

        subject = 'טופס יצירת קשר חדש של חקלתות'
        recipient_list = ['m.sglobalwork@gmail.com',]
        my_body = 'שם: {}\n כתובת: {}\n מייל: {}\n פאלפון: {}\n הודעה: {}\n'.format(name, address, email, phone, message)
        email = EmailMessage(subject, body=my_body,
                            from_email='MS-GLOBAL <bot@ms-global.co.il>',
                            to=recipient_list, reply_to=['m.sglobalwork@gmail.com'])
        mail_res = email.send(True)
    return home_view(request)

        