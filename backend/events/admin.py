from django.contrib import admin
from .models import Event, EventRepeaterFactory


@admin.register(Event)
class EventAdmin(admin.ModelAdmin):
    list_display = ("name", "date_time", "duration")
    list_filter = ("date_time",)
    search_fields = ("name", "description")


@admin.register(EventRepeaterFactory)
class EventRepeaterFactoryAdmin(admin.ModelAdmin):
    list_display = ("base_event", "repeat_every_n_days", "lead_time")
    list_filter = ("repeat_every_n_days",)
    search_fields = ("base_event__name",)
