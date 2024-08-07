from django.urls import path
from .views import get_articles, create_article

urlpatterns = [
    path('articles/', get_articles, name='articles'),
    path('articles/create', create_article, name='create_article')
]
