from django.http import JsonResponse
from django.shortcuts import render, redirect
from django.views.decorators.http import require_http_methods

from django_ratelimit.decorators import ratelimit

from .models import Contact
from .forms import ContactForm


@require_http_methods(['GET', 'POST'])
def contact_view(request):  

    if request.method == 'GET':

        return render(request, 'contact/contact-create.html')
    
    elif request.method == 'POST':

        form = ContactForm(request.POST)

        if form.is_valid():
            form.save()
            return redirect("contact-success")

        return render(request, 'contact/contact-create.html', {
                'errors': form.errors,
                'data': request.POST,
        })
    

@require_http_methods(['POST'])
@ratelimit(key='ip', rate='10/min', method=ratelimit.ALL, block=True)
def contact_api_view(request):
    

    form = ContactForm(request.POST)

    if form.is_valid():
        form.save(commit=False)
        
        return JsonResponse({'success': 'contact submitted'}, status=200)

    else:
        # print("errors: ", form.errors, form.non_field_errors)
        return JsonResponse({'error': 'invalid data error'}, status=400)


@require_http_methods(['GET'])
def contact_success(request):

    return render(request, "components/pages/success.html", {
        'title': 'Contact Submitted', 
        'description': 'Thank you for taking time to submit an Contact, our team will be in touch shortly.'
    })