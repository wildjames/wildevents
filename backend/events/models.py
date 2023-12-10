from django.db import models


class Event(models.Model):
    name = models.CharField(max_length=200)
    description = models.TextField()
    date_time = models.DateTimeField()
    duration = models.DurationField()
    notify_at = models.JSONField()  # List of times to send notifications
    colour = models.CharField(max_length=7)  # To store HEX color values like '#FFFFFF'
    notification_custom_message = models.TextField()

    def __str__(self):
        return self.name


class EventRepeaterFactory(models.Model):
    base_event = models.ForeignKey(Event, on_delete=models.CASCADE)
    repeat_every_n_days = models.IntegerField()
    lead_time = models.IntegerField()

    def __str__(self):
        return f"{self.base_event.name} Repeater"
