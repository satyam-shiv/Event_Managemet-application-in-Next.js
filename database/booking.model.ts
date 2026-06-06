import mongoose, { Schema, type HydratedDocument, type Model } from "mongoose";
import { Event } from "./event.model";

/**
 * Booking record referencing an Event.
 */
export type Booking = {
  eventId: mongoose.Types.ObjectId;
  email: string;
  createdAt: Date;
  updatedAt: Date;
};

type BookingDocument = HydratedDocument<Booking>;
type BookingModel = Model<Booking>;

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const bookingSchema = new Schema<Booking, BookingModel>(
  {
    eventId: { type: Schema.Types.ObjectId, ref: "Event", required: true },
    email: { type: String, required: true, trim: true, validate: (v: unknown) => typeof v === "string" && emailRegex.test(v) },
  },
  {
    timestamps: true,
    strict: true,
  }
);

// Add index on eventId for faster queries by event.
bookingSchema.index({ eventId: 1 });

/**
 * Pre-save hook:
 * - Ensures referenced Event exists; throws if not.
 * - Validates email format via regex.
 */
bookingSchema.pre("save", async function validateReference(this: BookingDocument) {
  // Ensure email validation fires on save
  if (!emailRegex.test(this.email)) throw new Error("Booking email is not a valid email address.");

  // Verify the event exists
  const exists = await Event.exists({ _id: this.eventId });
  if (!exists) throw new Error("Referenced event does not exist.");
});

export const Booking =
  (mongoose.models.Booking as BookingModel | undefined) ??
  mongoose.model<Booking, BookingModel>("Booking", bookingSchema);