from django.shortcuts import render
from django.http import HttpResponse
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .serializer import TodoSerializer
from .models import Todo
# Create your views here.


def todo(request):
    return render(request, 'index.html')


class TodoAPI(APIView):

    def get(self, request):
        try:
            todos = Todo.objects.all()
            serializer = TodoSerializer(todos, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Todo.DoesNotExist:
            return Response({'response': 'Bad request'}, status=status.HTTP_404_NOT_FOUND)

    def post(self, request):
        try:
            serializer = TodoSerializer(data=request.data, many=True)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            print(e)
            return Response({'response': 'Internal server error'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
