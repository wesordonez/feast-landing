from django.http import JsonResponse
from django.shortcuts import render, redirect
from django.views.decorators.http import require_http_methods

from django.core.mail import send_mail
from django.conf import settings
from django.contrib import messages
from django.utils.html import escape

from django_ratelimit.decorators import ratelimit

from .models import Inquiry
from .forms import InquiryForm


@require_http_methods(['GET', 'POST'])
def inquiry_view(request):  

    if request.method == 'GET':

        return render(request, 'inquiry/inquiry-create.html')
    
    elif request.method == 'POST':

        form = InquiryForm(request.POST)

        if form.is_valid():
            form.save()
            name = escape(form.cleaned_data['name'])
            email = escape(form.cleaned_data['email'])
            message = escape(form.cleaned_data['description'])
            phone = escape(form.cleaned_data['phone'])
            
            email_content = f"""
            <p><strong>New Contact Request</strong></p>
            <p><strong>From:</strong> {name}</p>
            <p><strong>Phone:</strong> {phone}</p>
            <p><strong>Email:</strong> {email}</p>
            <p><strong>Message:</strong></p>
            <p>{message}</p>
            """
            try:
                send_mail(
                    'New Contact Request for FEAST',
                    '',
                    settings.DEFAULT_FROM_EMAIL,  # From email
                    settings.CONTACT_EMAIL_RECIPIENTS,  # To email
                    fail_silently=False,
                    html_message=email_content
                )
                messages.success(request, 'Your inquiry has been submitted successfully.')
                return redirect("contact-success")
            except Exception as e:
                messages.error(request, 'An error occurred while submitting your inquiry. Please try again later.')
                return render(request, 'inquiry/inquiry-create.html', {
                    'errors': form.errors,
                    'data': request.POST,
                })

        return render(request, 'inquiry/inquiry-create.html', {
                'errors': form.errors,
                'data': request.POST,
        })
    

@require_http_methods(['POST'])
@ratelimit(key='ip', rate='10/min', method=ratelimit.ALL, block=True)
def inquiry_api_view(request):
    

    form = InquiryForm(request.POST)

    if form.is_valid():
        form.save(commit=False)
        
        return JsonResponse({'success': 'inquiry submitted'}, status=200)

    else:
        # print("errors: ", form.errors, form.non_field_errors)
        return JsonResponse({'error': 'invalid data error'}, status=400)


@require_http_methods(['GET'])
def inquiry_success(request):

    return render(request, "components/pages/success.html", {
        'title': 'Success!', 
        'description': 'Thank you for taking time to reach out. A member of our team will reach out shortly.'
    })