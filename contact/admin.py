from django.contrib import admin


from .models import Contact

@admin.register(Contact)
class ContactAdmin(admin.ModelAdmin):

    list_display = ['email', 'name', 'inquiry_type', 'datetime']

    search_fields = ['email', 'id']

    list_filter = ['inquiry_type', 'datetime']

    # readonly_fields = ['name', 'email', 'phone', 'datetime',  'description']