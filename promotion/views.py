from django.shortcuts import render

# Create your views here.
from django.http import HttpResponse


def index(request):
    context = {}
    return render(request, "promotion/index.html", context)


from django.http import JsonResponse
from django.views.decorators.http import require_POST
from django.views.decorators.csrf import csrf_exempt
from .models import Message


@csrf_exempt
@require_POST
def save_message(request):
    try:
        name = request.POST.get('name')
        email = request.POST.get('email')
        message_content = request.POST.get('message')

        message = Message(name=name, email=email, content=message_content)
        message.save()

        return JsonResponse({'status': 'success'}, status=201)
    except Exception as e:
        return JsonResponse({'status': 'error', 'error': str(e)}, status=400)
