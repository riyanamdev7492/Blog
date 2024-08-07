from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import Article
from .serializer import ArticleSerializer


@api_view(['GET'])
def get_articles(request):
  articles = Article.objects.all()
  serializedData = ArticleSerializer(articles, many=True).data
  return Response(serializedData)

@api_view(['POST'])
def create_article(request):
  data = request.data
  serializer = ArticleSerializer(data=data)
  if serializer.is_valid():
    serializer.save()
    return Response(serializer.data, status=status.HTTP_201_CREATED)
  return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)