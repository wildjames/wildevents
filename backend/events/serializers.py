from rest_framework import serializers
from .models import Event, EventRepeaterFactory


class EventSerializer(serializers.ModelSerializer):
    class Meta:
        model = Event
        fields = "__all__"


class EventRepeaterFactorySerializer(serializers.ModelSerializer):
    class Meta:
        model = EventRepeaterFactory
        fields = "__all__"
