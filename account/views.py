from rest_framework import generics
from rest_framework.response import Response
from rest_framework import viewsets
from .models import Prefix
from .serializers import PrefixSerializer, PrefixesSerializer,\
    GetPrefixesSerializer
from rest_framework.permissions import AllowAny


class PrefixesList(generics.ListCreateAPIView):
    queryset = Prefix.objects.all()
    serializer_class = PrefixesSerializer

    def list(self, request):
        queryset = self.get_queryset()
        serializer = PrefixesSerializer(queryset, many=True)
        return Response(dict(data=serializer.data))


class PrefixList(generics.ListCreateAPIView):
    queryset = Prefix.objects.all()
    serializer_class = PrefixSerializer

    def list(self, request):
        queryset = self.get_queryset()
        serializer = PrefixSerializer(queryset, many=True)
        return Response(dict(data=serializer.data))


class PrefixViewSet(viewsets.ModelViewSet):
    permission_classes = [AllowAny]
    queryset = Prefix.objects.all()
    serializer_class = GetPrefixesSerializer
