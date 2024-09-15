from django.shortcuts import render

def home_view(request):
    # Any context data you want to pass to the template
    context = {
        'page_title': 'Home',
        'welcome_message': 'Welcome to My Django App!'
    }
    
    return render(request, 'home.html', context)