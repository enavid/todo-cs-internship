from django.shortcuts import render
from django.http import HttpResponse
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

# Create your views here.


def todo(request):
    return render(request, 'index.html')


class TodoAPI(APIView):

    def get(self, request):
        return Response('navids asdeghi', status=status.HTTP_200_OK)

    def post(self, request):
        pass
