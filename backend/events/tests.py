import datetime

from django.contrib.auth.models import User
from django.urls import reverse
from django.utils import timezone

from rest_framework import status
from rest_framework.authtoken.models import Token
from rest_framework.test import APITestCase

from .models import Event, EventRepeaterFactory


class EventAPITestCase(APITestCase):
    def setUp(self):
        # Create an admin user and token for authentication
        self.admin_user = User.objects.create_superuser(
            username="admin", email="admin@example.com", password="admin123"
        )
        self.token = Token.objects.create(user=self.admin_user)
        self.client.credentials(HTTP_AUTHORIZATION="Token " + self.token.key)

        # Create a non-admin user
        self.regular_user = User.objects.create_user(
            username="regular", email="regular@example.com", password="regular123"
        )
        self.regular_token = Token.objects.create(user=self.regular_user)

        # Create a sample event
        self.event = Event.objects.create(
            name="Sample Event",
            description="This is a sample event.",
            date_time=timezone.now(),
            duration=datetime.timedelta(hours=2),
            notify_at=[24, 48],
            colour="#FF5733",
            notification_custom_message="Reminder for Sample Event",
        )

    # def test_access_without_login(self):
    #     self.client.credentials()  # Reset any credentials

    #     url = reverse("event-list")
    #     response = self.client.get(url)
    #     self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    # def test_access_as_non_admin(self):
    #     self.client.credentials(HTTP_AUTHORIZATION="Token " + self.regular_token.key)

    #     url = reverse("event-list")
    #     response = self.client.get(url)
    #     self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_create_event(self):
        url = reverse("event-list")
        data = {
            "name": "New Event",
            "description": "New event description.",
            "date_time": timezone.now(),
            "duration": datetime.timedelta(hours=3),
            "notify_at": [12, 24],
            "colour": "#123456",
            "notification_custom_message": "New event reminder",
        }
        response = self.client.post(url, data, format="json")
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Event.objects.count(), 2)
        self.assertEqual(Event.objects.get(id=2).name, "New Event")

    def test_read_event_list(self):
        url = reverse("event-list")
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_read_event_detail(self):
        url = reverse("event-detail", kwargs={"pk": self.event.pk})
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data["name"], "Sample Event")

    def test_update_event(self):
        url = reverse("event-detail", kwargs={"pk": self.event.pk})
        data = {"name": "Updated Event Name"}
        response = self.client.patch(url, data, format="json")
        self.assertEqual(response.status_code, status.HTTP_200_OK, response.data)
        self.event.refresh_from_db()
        self.assertEqual(self.event.name, "Updated Event Name")

    def test_delete_event(self):
        url = reverse("event-detail", kwargs={"pk": self.event.pk})
        response = self.client.delete(url)
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertEqual(Event.objects.count(), 0)


class EventRepeaterFactoryAPITestCase(APITestCase):
    def setUp(self):
        # Create an admin user and token for authentication
        self.admin_user = User.objects.create_superuser(
            username="admin", email="admin@example.com", password="admin123"
        )
        self.token = Token.objects.create(user=self.admin_user)
        self.client.credentials(HTTP_AUTHORIZATION="Token " + self.token.key)

        # Create a non-admin user
        self.regular_user = User.objects.create_user(
            username="regular", email="regular@example.com", password="regular123"
        )
        self.regular_token = Token.objects.create(user=self.regular_user)

        # Create a sample event and event repeater factory
        self.event = Event.objects.create(
            name="Sample Event",
            description="This is a sample event.",
            date_time=timezone.now(),
            duration=datetime.timedelta(hours=2),
            notify_at=[24, 48],
            colour="#FF5733",
            notification_custom_message="Reminder for Sample Event",
        )
        self.event_repeater = EventRepeaterFactory.objects.create(
            base_event=self.event, repeat_every_n_days=7, lead_time=3
        )

    # def test_access_without_login(self):
    #     self.client.credentials()  # Reset any credentials

    #     url = reverse("eventrepeaterfactory-list")
    #     response = self.client.get(url)
    #     self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    # def test_access_as_non_admin(self):
    #     self.client.credentials(HTTP_AUTHORIZATION="Token " + self.regular_token.key)

    #     url = reverse("eventrepeaterfactory-list")
    #     response = self.client.get(url)
    #     self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_create_event_repeater(self):
        url = reverse("eventrepeaterfactory-list")
        data = {"base_event": self.event.id, "repeat_every_n_days": 14, "lead_time": 2}
        response = self.client.post(url, data, format="json")
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(EventRepeaterFactory.objects.count(), 2)
        self.assertEqual(EventRepeaterFactory.objects.get(id=2).repeat_every_n_days, 14)

    def test_read_event_repeater_list(self):
        url = reverse("eventrepeaterfactory-list")
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_read_event_repeater_detail(self):
        url = reverse(
            "eventrepeaterfactory-detail", kwargs={"pk": self.event_repeater.pk}
        )
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data["repeat_every_n_days"], 7)

    def test_update_event_repeater(self):
        url = reverse(
            "eventrepeaterfactory-detail", kwargs={"pk": self.event_repeater.pk}
        )
        data = {"repeat_every_n_days": 10}
        response = self.client.patch(url, data, format="json")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.event_repeater.refresh_from_db()
        self.assertEqual(self.event_repeater.repeat_every_n_days, 10)

    def test_delete_event_repeater(self):
        url = reverse(
            "eventrepeaterfactory-detail", kwargs={"pk": self.event_repeater.pk}
        )
        response = self.client.delete(url)
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertEqual(EventRepeaterFactory.objects.count(), 0)
