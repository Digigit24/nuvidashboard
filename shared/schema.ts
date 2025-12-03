import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer, boolean, timestamp, jsonb, real } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  role: text("role").notNull().default("Patient"),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
  role: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export const patients = pgTable("patients", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull(),
  fullName: text("full_name").notNull(),
  email: text("email").notNull(),
  phone: text("phone"),
  dateOfBirth: text("date_of_birth"),
  gender: text("gender"),
  condition: text("condition"),
});

export const insertPatientSchema = createInsertSchema(patients).omit({
  id: true,
});

export type InsertPatient = z.infer<typeof insertPatientSchema>;
export type Patient = typeof patients.$inferSelect;

export const programConfigs = pgTable("program_configs", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  patientId: varchar("patient_id").notNull(),
  templateName: text("template_name").notNull(),
  modules: text("modules").array(),
  consultationCount: integer("consultation_count").default(4),
  programDuration: integer("program_duration").default(90),
  startDate: text("start_date"),
  remainingDays: integer("remaining_days"),
  progressPercentage: integer("progress_percentage").default(0),
});

export const insertProgramConfigSchema = createInsertSchema(programConfigs).omit({
  id: true,
});

export type InsertProgramConfig = z.infer<typeof insertProgramConfigSchema>;
export type ProgramConfig = typeof programConfigs.$inferSelect;

export const vitals = pgTable("vitals", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  patientId: varchar("patient_id").notNull(),
  weight: real("weight"),
  bloodSugar: real("blood_sugar"),
  hormoneLevel: real("hormone_level"),
  energyScore: integer("energy_score"),
  sleepHours: real("sleep_hours"),
  notes: text("notes"),
  recordedAt: timestamp("recorded_at").defaultNow(),
});

export const insertVitalsSchema = createInsertSchema(vitals).omit({
  id: true,
  recordedAt: true,
});

export type InsertVitals = z.infer<typeof insertVitalsSchema>;
export type Vitals = typeof vitals.$inferSelect;

export const consultations = pgTable("consultations", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  patientId: varchar("patient_id").notNull(),
  doctorName: text("doctor_name").notNull(),
  doctorSpecialization: text("doctor_specialization"),
  scheduledDate: timestamp("scheduled_date").notNull(),
  status: text("status").notNull().default("Scheduled"),
  durationMinutes: integer("duration_minutes").default(30),
  meetingLink: text("meeting_link"),
  notes: text("notes"),
});

export const insertConsultationSchema = createInsertSchema(consultations).omit({
  id: true,
});

export type InsertConsultation = z.infer<typeof insertConsultationSchema>;
export type Consultation = typeof consultations.$inferSelect;

export const habits = pgTable("habits", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  patientId: varchar("patient_id").notNull(),
  name: text("name").notNull(),
  target: text("target"),
  completed: boolean("completed").default(false),
  date: text("date"),
});

export const insertHabitSchema = createInsertSchema(habits).omit({
  id: true,
});

export type InsertHabit = z.infer<typeof insertHabitSchema>;
export type Habit = typeof habits.$inferSelect;

export const dailyCheckIns = pgTable("daily_check_ins", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  patientId: varchar("patient_id").notNull(),
  weight: real("weight"),
  energyLevel: integer("energy_level"),
  sleepHours: real("sleep_hours"),
  notes: text("notes"),
  checkedInAt: timestamp("checked_in_at").defaultNow(),
});

export const insertDailyCheckInSchema = createInsertSchema(dailyCheckIns).omit({
  id: true,
  checkedInAt: true,
});

export type InsertDailyCheckIn = z.infer<typeof insertDailyCheckInSchema>;
export type DailyCheckIn = typeof dailyCheckIns.$inferSelect;
