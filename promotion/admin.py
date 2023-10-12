from django.contrib import admin
from .models import Message

class MessageAdmin(admin.ModelAdmin):
    list_display = ('name', 'email', 'content', 'created_at')
    search_fields = ['name', 'email', 'content']

admin.site.register(Message, MessageAdmin)
