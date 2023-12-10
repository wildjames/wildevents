# Event Management API backend

## Overview

This API provides a set of endpoints for managing events and their associated repeater factories. The API allows for creating, reading, updating, and deleting (CRUD) Event and Event Repeater Factory records.

An event is just that - the information associated with a single event. Factories are used to generate repeating events - for example a weekly event is created once, then a factory creates a copy of it every week, 5 weeks in advance.

## Base URL

The base URL for the API is `/api/`. All API endpoints described below are relative to this.

## Authentication

[Describe here how authentication is handled, if applicable.]

## Endpoints

### Event Endpoints

1. **List All Events**

   - **Method**: `GET`
   - **Endpoint**: `/events/`
   - **Description**: Retrieve a list of all events.

2. **Retrieve a Specific Event**

   - **Method**: `GET`
   - **Endpoint**: `/events/<id>/`
   - **Description**: Retrieve details of a specific event by its ID.

3. **Create a New Event**

   - **Method**: `POST`
   - **Endpoint**: `/events/`
   - **Body**:
     ```json
     {
       "name": "Event Name",
       "description": "Description",
       "date_time": "YYYY-MM-DDTHH:MM:SSZ",
       "duration": "HH:MM:SS",
       "notify_at": [hours_before],
       "colour": "#HEXVALUE",
       "notification_custom_message": "Custom Message"
     }
     ```
   - **Description**: Create a new event record.

4. **Update an Existing Event**

   - **Method**: `PUT`
   - **Endpoint**: `/events/<id>/`
   - **Body**: [Similar to Create a New Event]
   - **Description**: Update details of an existing event.

5. **Delete an Event**
   - **Method**: `DELETE`
   - **Endpoint**: `/events/<id>/`
   - **Description**: Delete an existing event.

### Event Repeater Factory Endpoints

1. **List All Event Repeaters**

   - **Method**: `GET`
   - **Endpoint**: `/event-repeaters/`
   - **Description**: Retrieve a list of all event repeaters.

2. **Retrieve a Specific Event Repeater**

   - **Method**: `GET`
   - **Endpoint**: `/event-repeaters/<id>/`
   - **Description**: Retrieve details of a specific event repeater by its ID.

3. **Create a New Event Repeater**

   - **Method**: `POST`
   - **Endpoint**: `/event-repeaters/`
   - **Body**:
     ```json
     {
       "base_event": event_id,
       "repeat_every_n_days": number,
       "lead_time": number
     }
     ```
   - **Description**: Create a new event repeater record.

4. **Update an Existing Event Repeater**

   - **Method**: `PUT`
   - **Endpoint**: `/event-repeaters/<id>/`
   - **Body**: [Similar to Create a New Event Repeater]
   - **Description**: Update details of an existing event repeater.

5. **Delete an Event Repeater**
   - **Method**: `DELETE`
   - **Endpoint**: `/event-repeaters/<id>/`
   - **Description**: Delete an existing event repeater.

## Error Handling

[Explain how errors are handled and returned to the user.]

## Rate Limits

[If applicable, describe any rate limits that apply to the API.]
