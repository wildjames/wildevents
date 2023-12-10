from rest_framework import viewsets
from rest_framework.permissions import IsAdminUser

from .models import Event, EventRepeaterFactory
from .serializers import EventSerializer, EventRepeaterFactorySerializer


class EventViewSet(viewsets.ModelViewSet):
    queryset = Event.objects.all()
    serializer_class = EventSerializer
    permission_classes = [IsAdminUser]


class EventRepeaterFactoryViewSet(viewsets.ModelViewSet):
    queryset = EventRepeaterFactory.objects.all()
    serializer_class = EventRepeaterFactorySerializer
    permission_classes = [IsAdminUser]
