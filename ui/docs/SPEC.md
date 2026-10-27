
https://www.youtube.com/watch?v=JnM4b39WA_o BESSETT LAFFER
https://www.youtube.com/watch?v=FdkpWrlR5zg COLD WAR
https://www.youtube.com/watch?v=4l3Sa8ImGFQ MAO
https://www.youtube.com/watch?v=5DCGmIcZ_7k SNYDER

ref: https://medium.com/@cskumara2000/spec-driven-development-with-claude-code-a-practical-guide-fcd661f827fb?sk=3b75657c3e3caf87fca2086fbce87291

BOOKMARKS SEARCH UI

## INTENT
Create a UI to permit a user to query a database of documents.
Zero, one, or many documents that are relevant to the query shall be returned to the user with relevant metadata, including title, summary, URL, and type.
Data consist of original document information including the original URL, type (youtube, pdf, html), title, summary, keywords, and source text for videos.


## BACKGROUND


## REQUIREMENTS (EARS format) "The system shall...", use verbs instead of nouns
TECHNICAL ARCHITECTURE
 HTML5
 100% javascript
 standard browser APIs to implement features, for example:
  - fetch (HTTP API calls), iframe (PAGEVIEW display)

 The screen will use HTML5 responsive design. It consists of 4 areas. Specific screen elements are identified by name.
	Left side 25% of screen width:
	  top 20% of screen height: a QUERY INPUT window for user text input of a query string,
	  bottom 80% of screen height:  a RESPONSE LIST window for a single-selection list of documents meeting the query criteria
	Right side 75% of screen width:
	  top 33% of screen height:  a DOCUMENT DETAIL window for an area to display the selected document detail data
           the bottom of the document data area will contain a SHOW SOURCE user input checkbox to display the source contained in the document url.

	  bottom 67% of screen height:
	      a window with PAGEVIEW element, populated in response to the  SHOW SOURCE checkbox in the DOCUMENT DETAIL data window.


FUNCTIONALITY

A list 0 to N documents shall be returned for each user query.
The list of returned documents shall be retrieved from a plain HTTP API call,
Document data consists of: an ID number, a title, a summary of the corpus, the URL of the source document, the type of the source document, and a transcript if the source document is a video
The results shall be displayed in the RESPONSE LIST window. The result list contains the document title.
Enable the user to select only one document for review.
If a document is selected from the list, its data will be displayed in the DOCUMENT DETAIL window in the  format of the selected document (youtube, pdf, or html)
The DOCUMENT DETAIL window shall display the title, summary, url, page_type, and video_transcript (when not empty) of the selected document.
The DOCUMENT DETAIL window shall NOT display the keywords or local_filename fields.
if the user selects the SHOW SOURCE checkbox in the DOCUMENT DETAIL data window, the PAGEVIEW element will retrieve and display the page content of the document data url.
If the document url is a YouTube video page, the PAGEVIEW element shall display it using the YouTube embed url (https://www.youtube.com/embed/<video id>).
The PAGEVIEW window shall always display an "Open in new tab" link to the document url, so the user can view sites that refuse to be displayed inside a frame.

## OUT OF SCOPE

## API CONTRACT

Endpoint: POST http://localhost:8080/api/search (generic placeholder; set in one config value)
Content-Type: application/json

### Request
JSON body containing a single string, the user's query:

    { "query": "<user query text>" }

### Response
A plain JSON array of 0 to N documents. Each document contains:

| Field            | Type    |
|------------------|---------|
| id               | integer |
| title            | string  |
| summary          | string  |
| url              | string  |
| page_type        | string  |
| keywords         | string  |
| local_filename   | string  |
| video_transcript | string  |

page_type is one of: youtube, pdf, html.
Fields with no value (e.g. no transcript, no local file) are returned as an empty string "".

Example:

    [
      {
        "id": 1,
        "title": "Example title",
        "summary": "Short summary of the document.",
        "url": "https://www.youtube.com/watch?v=abc123",
        "page_type": "youtube",
        "keywords": "economics, history",
        "local_filename": "",
        "video_transcript": "Transcript text..."
      }
    ]




========================= SPEC EXAMPLE FORMATS ==================================================

## Purpose
Define the artifact graph model, dependency validation, and completion-state logic used by schema-driven workflows.

## Requirements
### Requirement: Schema Loading
The system SHALL load artifact graph definitions from YAML schema files within schema directories.

---
### Requirement: Surgical removal of config file content

The system SHALL preserve user content when removing OpenSpec markers from config files.

#### Scenario: Config file with only OpenSpec content

- **WHEN** a config file contains only OpenSpec marker block (whitespace outside is acceptable)
- **THEN** the system SHALL remove the OpenSpec marker block
- **AND** preserve the file (even if empty or whitespace-only)
- **AND** NOT delete the file (config files belong to the user's project root)

---
### Requirement: Behavior-First Specification Boundary
OpenSpec specifications SHALL capture verifiable behavior contracts and avoid internal implementation detail.

#### Scenario: Writing behavior requirements
- **WHEN** documenting a capability in `spec.md`
- **THEN** requirements focus on externally observable behavior, interfaces, error handling, and constraints
- **AND** scenarios remain testable or explicitly verifiable

#### Scenario: Avoiding implementation leakage
- **WHEN** details involve concrete library choices, class/function structure, or execution mechanics
- **THEN** those details SHALL be documented in `design.md` or `tasks.md` instead of behavioral requirements

### Requirement: Progressive Rigor
OpenSpec conventions SHALL keep specs lightweight by default and scale rigor only when risk or coordination complexity demands it.
