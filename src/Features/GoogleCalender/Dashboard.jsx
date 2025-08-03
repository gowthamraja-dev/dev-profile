import { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { BASE_URL } from "../../api/baseUrl";
import { setUser } from "../../Data/Slice/loginSlice";

const Dashboard = () => {
  const { user } = useSelector((s) => s.login);
  const [events, setEvents] = useState([]);
  const [newEvent, setNewEvent] = useState({
    summary: "",
    description: "",
    start_time: "",
    end_time: "",
    timeZone: "UTC",
    attendees: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isCreating, setIsCreating] = useState(false);

  const fetchEvents = useCallback(async () => {
    // Note: Backend needs an endpoint to fetch events from MongoDB or Google Calendar
    try {
      const response = await fetch(`${BASE_URL}/api/calendar/events`, {
        method: "GET",
        credentials: "include",
        headers: { "X-User-ID": user?.user_id },
      });
      if (response.ok) {
        const data = await response.json();
        setEvents(data.events || []);
      } else {
        setError("Failed to fetch events");
      }
    } catch (error) {
      console.error("Error fetching events:", error);
      setError("Network error while fetching events");
    }
  }, [user?.user_id]);

  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);

  const validateEventTimes = () => {
    const start = new Date(newEvent.start_time);
    const end = new Date(newEvent.end_time);
    if (start >= end) {
      setError("End time must be after start time");
      return false;
    }
    return true;
  };

  const handleCreateEvent = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setIsCreating(true);

    if (!validateEventTimes()) {
      setIsCreating(false);
      return;
    }

    const formatToRFC3339 = (date) => new Date(date).toISOString();
    const eventData = {
      summary: newEvent.summary,
      description: newEvent.description,
      start_time: formatToRFC3339(newEvent.start_time),
      end_time: formatToRFC3339(newEvent.end_time),
      timeZone: newEvent.timeZone,
      attendees: newEvent.attendees
        .split(",")
        .map((email) => email.trim())
        .filter((email) => email),
    };

    try {
      const response = await fetch(`${BASE_URL}/api/calendar/event`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-User-ID": user?.user_id,
        },
        body: JSON.stringify(eventData),
        credentials: "include",
      });
      const data = await response.json();

      if (response.ok) {
        setSuccess("Event created successfully!");
        setNewEvent({
          summary: "",
          description: "",
          start_time: "",
          end_time: "",
          timeZone: "UTC",
          attendees: "",
        });
        fetchEvents();
      } else {
        setError(data.error || "Failed to create event");
      }
    } catch (error) {
      setError("Network error while creating event");
      console.error("Error creating event:", error);
    } finally {
      setIsCreating(false);
    }
  };

  const handleLogout = async () => {
    if (window.confirm("Are you sure you want to log out?")) {
      try {
        await fetch(`${BASE_URL}/logout`, {
          method: "GET",
          credentials: "include",
          headers: { "X-User-ID": user?.user_id },
        });
        setUser(null);
      } catch (error) {
        console.error("Error logging out:", error);
        setUser(null);
      }
    }
  };

  const handleDeleteEvent = async (eventId) => {
    // Note: Backend needs a DELETE /api/calendar/event/<event_id> endpoint
    if (window.confirm("Are you sure you want to delete this event?")) {
      try {
        const response = await fetch(
          `${BASE_URL}/api/calendar/event/${eventId}`,
          {
            method: "DELETE",
            credentials: "include",
            headers: { "X-User-ID": user?.user_id },
          }
        );
        if (response.ok) {
          setSuccess("Event deleted successfully!");
          fetchEvents();
        } else {
          setError("Failed to delete event");
        }
      } catch (error) {
        console.error("Error deleting event:", error);
        setError("Network error while deleting event");
      }
    }
  };

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-gray-900">
          Welcome, {user?.user_id}
        </h1>
        <button
          onClick={handleLogout}
          aria-label="Log out"
          className="mt-4 sm:mt-0 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition duration-200"
        >
          Logout
        </button>
      </div>

      {/* Create Event Form */}
      <div className="bg-white p-6 rounded-lg shadow-lg mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">
          Create New Event
        </h2>
        {error && (
          <div className="mb-4 text-red-600 bg-red-100 p-3 rounded-md animate-fade-in">
            {error}
          </div>
        )}
        {success && (
          <div className="mb-4 text-green-600 bg-green-100 p-3 rounded-md animate-fade-in">
            {success}
          </div>
        )}
        <form onSubmit={handleCreateEvent} className="space-y-6">
          <div>
            <label
              htmlFor="summary"
              className="block text-sm font-medium text-gray-800"
            >
              Summary
            </label>
            <input
              type="text"
              value={newEvent.summary}
              onChange={(e) =>
                setNewEvent({ ...newEvent, summary: e.target.value })
              }
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2.5 px-4 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              required
              aria-label="Event summary"
            />
          </div>
          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-800"
            >
              Description
            </label>
            <textarea
              value={newEvent.description}
              onChange={(e) =>
                setNewEvent({
                  ...newEvent,
                  description: e.target.value,
                })
              }
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2.5 px-4 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              rows="4"
              aria-label="Event description"
            />
          </div>
          <div>
            <label
              htmlFor="start_time"
              className="block text-sm font-medium text-gray-800"
            >
              Start Time
            </label>
            <input
              type="datetime-local"
              value={newEvent.start_time}
              onChange={(e) =>
                setNewEvent({ ...newEvent, start_time: e.target.value })
              }
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2.5 px-4 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              required
              aria-label="Event start time"
            />
          </div>
          <div>
            <label
              htmlFor="end_time"
              className="block text-sm font-medium text-gray-800"
            >
              End Time
            </label>
            <input
              type="datetime-local"
              value={newEvent.end_time}
              onChange={(e) =>
                setNewEvent({ ...newEvent, end_time: e.target.value })
              }
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2.5 px-4 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              required
              aria-label="Event end time"
            />
          </div>
          <div>
            <label
              htmlFor="timeZone"
              className="block text-sm font-medium text-gray-800"
            >
              Time Zone
            </label>
            <select
              value={newEvent.timeZone}
              onChange={(e) =>
                setNewEvent({ ...newEvent, timeZone: e.target.value })
              }
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2.5 px-4 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              aria-label="Time zone"
            >
              <option value="UTC">UTC</option>
              <option value="America/New_York">America/New_York</option>
              <option value="Europe/London">Europe/London</option>
              <option value="Asia/Tokyo">Asia/Tokyo</option>
              <option value="Australia/Sydney">Australia/Sydney</option>
            </select>
          </div>
          <div>
            <label
              htmlFor="attendees"
              className="block text-sm font-medium text-gray-800"
            >
              Attendees (comma-separated emails)
            </label>
            <input
              type="text"
              value={newEvent.attendees}
              onChange={(e) =>
                setNewEvent({ ...newEvent, attendees: e.target.value })
              }
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2.5 px-4 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="email1@example.com, email2@example.com"
              aria-label="Attendees"
            />
          </div>
          <button
            type="submit"
            disabled={isCreating}
            aria-label="Create event"
            className={`w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-600 transition duration-200 ${
              isCreating ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {isCreating ? (
              <svg
                className="animate-spin h-5 w-5 mr-2 text-white"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                />
              </svg>
            ) : null}
            {isCreating ? "Creating..." : "Create Event"}
          </button>
        </form>
      </div>

      {/* Events List */}
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">
          Your Events
        </h2>
        {events.length === 0 ? (
          <p className="text-gray-600">No events found.</p>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {events.map((event) => (
              <div
                key={event.google_event_id}
                className="border p-4 rounded-lg shadow-sm hover:shadow-md transition duration-200"
              >
                <h3 className="font-medium text-gray-900">{event.summary}</h3>
                <p className="text-sm text-gray-600 mt-1">
                  {event.description || "No description"}
                </p>
                <p className="text-sm text-gray-600 mt-1">
                  Start: {new Date(event.start.dateTime).toLocaleString()}
                </p>
                <p className="text-sm text-gray-600 mt-1">
                  End: {new Date(event.end.dateTime).toLocaleString()}
                </p>
                <div className="mt-3 flex space-x-3">
                  {event.hangoutLink && (
                    <a
                      href={event.hangoutLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline text-sm font-medium"
                      aria-label="Join Google Meet"
                    >
                      Join Google Meet
                    </a>
                  )}
                  <button
                    onClick={() => handleDeleteEvent(event.google_event_id)}
                    className="text-red-600 hover:text-red-700 text-sm font-medium"
                    aria-label="Delete event"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
export default Dashboard;
