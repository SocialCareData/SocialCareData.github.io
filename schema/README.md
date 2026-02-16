# Social Care Data Standard Schema

This directory contains the JSON Schema used to validate and describe the data standards developed by the Open Data Institute and Social Finance.

## Using the Schema (`standard-schema.json`)

All new data standards should be defined as JSON files that conform to `standard-schema.json`.

### Structure
The schema requires two main sections:
1.  **`metadata`**: Describes the standard itself (title, version, status, etc.).
2.  **`entities`**: A list of data objects (e.g., "Person", "Referral").

### Fields Documentation

Each entity contains a list of `fields`. A field object supports the following properties:

*   **`name`** (Required): The technical name of the field (e.g., `givenNames`).
*   **`type`** (Required): The data type (e.g., `String`, `Integer`, `Date`, `Code`).
*   **`cardinality`** (Required): Frequency (e.g., `1..1`, `0..*`).
*   **`description`**: Human-readable definition.
*   **`vocabulary`**: Use this when `type` is `Code`. It links to the controlled vocabulary.
    *   `name`: Name of the vocabulary (e.g., `PersonGenderCode`).
    *   `url`: Link to the definition (e.g., `https://...`).
*   **`reference`**: Use this when the field links to another entity.
    *   Value should be a URL or relative path to the referenced entity definition.
*   **`alignment`**: Object mapping to other standards (e.g., `fhir`, `pds`).

### Example Field
```json
{
  "name": "Gender",
  "type": "Code",
  "cardinality": "1..1",
  "description": "The person’s stated gender.",
  "vocabulary": {
    "name": "PersonGenderCode",
    "url": "https://fhir.hl7.org.uk/ValueSet/UKCore-PersonStatedGender"
  }
}
```
