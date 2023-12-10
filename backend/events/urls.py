from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import EventViewSet, EventRepeaterFactoryViewSet

router = DefaultRouter()
router.register(r"events", EventViewSet)
router.register(r"event-repeaters", EventRepeaterFactoryViewSet)

urlpatterns = [
    path("", include(router.urls)),
]
