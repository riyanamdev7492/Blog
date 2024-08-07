from django.urls import path
from .views import get_articles, create_article, article_details

urlpatterns = [
    path('articles/', get_articles, name='get_articles'),
    path('articles/create', create_article, name='create_article'),
    path('articles/<int:pk>', article_details, name='article_details')
]
