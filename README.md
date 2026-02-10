# EchoStats

## [Visit the website here!](https//echostats.mooo.com)

A sophisticated analytics engine that bridges the gap between instant music discovery and deep-data forensics. EchoStats provides a dual-entry point for users to visualize their Spotify identity through real-time API integration and comprehensive historical file analysis.

## Core Methodology

### Instant Analytics
Leverages the Spotify Web API to provide an immediate snapshot of user preferences. This mode focuses on affinity and current trends.
* **Temporal Sorting:** Toggle between short-term, medium-term, and long-term listening windows.
* **Acoustic Profiling:** Visualizing energy, valence, and danceability metrics for top tracks.
* **Active State:** Real-time display of current playback and recent history.

### Deep Forensics
Unlocks the full potential of user-requested Spotify data exports. This mode bypasses API limitations to provide 100% accuracy.
* **Duration Metrics:** Precise calculation of total listening time in hours and days.
* **Behavioral Analysis:** Identification of skip rates and "ghost tracks" (songs played but rarely finished).
* **Longitudinal Trends:** Multi-year habit tracking that surpasses the limits of standard annual summaries.
* **Session Mapping:** Detecting patterns in listening streaks and time-of-day peak activity.

## Technical Architecture

* **Framework:** Next.js (React)
* **Visuals:** Chart.js / Tailwind CSS
* **Data Processing:** Client-side JSON stream parsing
* **Authentication:** OAuth 2.0 (Authorization Code Flow)

## Privacy Architecture

EchoStats is designed with a zero-storage philosophy. 
1. **Local Processing:** Data uploaded via the Deep Forensics mode is parsed entirely within the client's browser memory. 
2. **Ephemeral Access:** API tokens are stored securely in the session and are never persisted to a permanent database.
3. **Transparency:** No personal listening data ever leaves the user's local environment.
