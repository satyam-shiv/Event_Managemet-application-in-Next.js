import mongoose, { Schema, type HydratedDocument, type Model } from "mongoose";

/**
 * Strongly-typed Event shape.
 */
export type Event = {
  title: string;
  slug: string;
  description: string;
  overview: string;
  image: string;
  venue: string;
  location: string;
  date: string; // stored as YYYY-MM-DD
  time: string; // stored as HH:mm (24-hour)
  mode: string;
  audience: string;
  agenda: string[];
  organizer: string;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
};

type EventDocument = HydratedDocument<Event>;
type EventModel = Model<Event>;

const nonEmptyString = (v: unknown): boolean =>
  typeof v === "string" && v.trim().length > 0;

const nonEmptyStringArray = (v: unknown): boolean =>
  Array.isArray(v) && v.length > 0 && v.every((it) => typeof it === "string" && it.trim().length > 0);

/** Create a URL-friendly slug from title. */
function createSlug(title: string): string {
  return title
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

/** Normalize date input to YYYY-MM-DD ISO date (no time). Throws on invalid date. */
function normalizeDate(date: string): string {
  const parsed = new Date(date);
  if (Number.isNaN(parsed.getTime())) throw new Error("Event date must be a valid date.");
  return parsed.toISOString().split("T")[0];
}

/** Normalize time to HH:mm (24-hour). Accepts "HH:mm" or "h:mm AM/PM". */
function normalizeTime(time: string): string {
  const t = String(time).trim().toUpperCase();

  // Accept 12-hour format with AM/PM
  const twelve = t.match(/^(\d{1,2}):(\d{2})\s?(AM|PM)$/);
  if (twelve) {
    let hour = Number(twelve[1]);
    const minute = Number(twelve[2]);
    const period = twelve[3] as "AM" | "PM";
    if (hour < 1 || hour > 12 || minute < 0 || minute > 59) throw new Error("Event time must be valid.");
    if (period === "PM" && hour !== 12) hour += 12;
    if (period === "AM" && hour === 12) hour = 0;
    return `${hour.toString().padStart(2, "0")}:${minute.toString().padStart(2, "0")}`;
  }

  // Accept 24-hour format
  const twentyFour = t.match(/^(\d{1,2}):(\d{2})$/);
  if (twentyFour) {
    const hour = Number(twentyFour[1]);
    const minute = Number(twentyFour[2]);
    if (hour < 0 || hour > 23 || minute < 0 || minute > 59) throw new Error("Event time must be valid.");
    return `${hour.toString().padStart(2, "0")}:${minute.toString().padStart(2, "0")}`;
  }

  throw new Error("Event time must use HH:mm or h:mm AM/PM format.");
}

const eventSchema = new Schema<Event, EventModel>(
  {
    title: { type: String, required: true, trim: true, validate: nonEmptyString },
    slug: { type: String, required: true, unique: true, trim: true },
    description: { type: String, required: true, trim: true, validate: nonEmptyString },
    overview: { type: String, required: true, trim: true, validate: nonEmptyString },
    image: { type: String, required: true, trim: true, validate: nonEmptyString },
    venue: { type: String, required: true, trim: true, validate: nonEmptyString },
    location: { type: String, required: true, trim: true, validate: nonEmptyString },
    date: { type: String, required: true, trim: true, validate: nonEmptyString },
    time: { type: String, required: true, trim: true, validate: nonEmptyString },
    mode: { type: String, required: true, trim: true, validate: nonEmptyString },
    audience: { type: String, required: true, trim: true, validate: nonEmptyString },
    agenda: { type: [String], required: true, validate: nonEmptyStringArray },
    organizer: { type: String, required: true, trim: true, validate: nonEmptyString },
    tags: { type: [String], required: true, validate: nonEmptyStringArray },
  },
  {
    timestamps: true, // auto-generate createdAt and updatedAt
    strict: true,
  }
);

// Unique index on slug for fast lookups and uniqueness guarantee.
eventSchema.index({ slug: 1 }, { unique: true });

/**
 * Pre-save hook:
 * - Regenerates slug only when `title` changed.
 * - Normalizes `date` to YYYY-MM-DD and `time` to HH:mm.
 * - Throws when normalization/validation fails.
 */
eventSchema.pre("save", function validateAndNormalize(this: EventDocument) {
  if (this.isModified("title")) {
    this.slug = createSlug(this.title);
  }

  // Normalize date and time into predictable formats for querying/display.
  this.date = normalizeDate(this.date);
  this.time = normalizeTime(this.time);
});

export const Event =
  (mongoose.models.Event as EventModel | undefined) ??
  mongoose.model<Event, EventModel>("Event", eventSchema);