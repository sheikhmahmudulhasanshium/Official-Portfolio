// Helper array for abbreviated month names
const monthAbbreviations: string[] = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
];

/**
 * Formats a date input (ISO string, Date object) into D-Mon-YYYY format.
 * Returns null if the input is invalid or falsy.
 * @param dateInput - The date string, Date object, null, or undefined.
 * @returns Formatted date string or null on error/invalid input.
 */
export function formatIsoDate(dateInput: string | Date | null | undefined): string | null {
  // Handle null, undefined, or empty string inputs directly
  // Note: new Date('') is often treated as invalid, which is handled by isNaN
  if (!dateInput) {
    return null;
  }

  try {
    // Create Date object. Constructor handles ISO strings and Date objects.
    const date = new Date(dateInput);

    // Check if the resulting date is valid
    if (isNaN(date.getTime())) {
      return null; // Invalid date input
    }

    const day = date.getDate();
    const monthIndex = date.getMonth(); // 0-11
    const year = date.getFullYear();

    // Basic check for month index validity
    if (monthIndex < 0 || monthIndex > 11) {
        return null;
    }

    const monthAbbr = monthAbbreviations[monthIndex];
    return `${day}-${monthAbbr}-${year}`;
  } catch {
    // Catch potential errors during new Date() construction
    return null;
  }
}

// --- Example Usage ---

/*
// In your component or utility file:

import { formatIsoDate } from './formatIsoDate'; // Adjust path

const timelineData = {
  start_date: "2025-04-29T21:18:33.420Z",
  end_date: "2025-07-02T21:18:33.420Z"
};

const timelinePresent = {
  start_date: "2024-11-15T10:00:00.000Z",
  end_date: "present" // formatIsoDate will return null for this
};

const timelineInvalid = {
  start_date: null,
  end_date: "not-a-valid-date"
};

// Format START date:
const formattedStart = formatIsoDate(timelineData.start_date);
console.log(formattedStart); // Output: 29-Apr-2025

// Format END date:
const formattedEnd = formatIsoDate(timelineData.end_date);
console.log(formattedEnd); // Output: 2-Jul-2025

// Format start date from 'present' example:
const formattedStartPresent = formatIsoDate(timelinePresent.start_date);
console.log(formattedStartPresent); // Output: 15-Nov-2024

// Format end date 'present':
const formattedEndPresent = formatIsoDate(timelinePresent.end_date);
console.log(formattedEndPresent); // Output: null

// Format null start date:
const formattedStartNull = formatIsoDate(timelineInvalid.start_date);
console.log(formattedStartNull); // Output: null

// Format invalid end date:
const formattedEndInvalid = formatIsoDate(timelineInvalid.end_date);
console.log(formattedEndInvalid); // Output: null

*/