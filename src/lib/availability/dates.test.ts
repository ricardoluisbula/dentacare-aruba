import { describe, expect, it } from "vitest";
import {
  formatDateRange,
  formatTimeRange,
  parseDocument,
  todayInAruba,
  upcomingEntries,
  validateEntry,
  PAP_MONTHS,
  PAP_WEEKDAYS,
  type AvailabilityEntry,
} from "./dates";

const entry = (id: string, startDate: string, endDate = startDate, startTime: string | null = null, endTime: string | null = null): AvailabilityEntry => ({
  id,
  startDate,
  endDate,
  startTime,
  endTime,
});

const input = (startDate: string, endDate = "", startTime = "", endTime = "") => ({ startDate, endDate, startTime, endTime });
const TODAY = "2026-09-28";

describe("todayInAruba", () => {
  it("uses Aruba's date (UTC-4), not the server's or the visitor's", () => {
    // 02:30 UTC on the 29th is still 22:30 on the 28th in Aruba.
    expect(todayInAruba(new Date("2026-09-29T02:30:00Z"))).toBe("2026-09-28");
    expect(todayInAruba(new Date("2026-09-29T04:00:00Z"))).toBe("2026-09-29");
  });
});

describe("upcomingEntries", () => {
  it("keeps entries that end today or later, soonest first", () => {
    const list = [entry("c", "2026-10-20"), entry("past", "2026-09-01", "2026-09-27"), entry("ongoing", "2026-09-26", "2026-09-30"), entry("a", "2026-10-01")];
    expect(upcomingEntries(list, TODAY).map((e) => e.id)).toEqual(["ongoing", "a", "c"]);
  });
});

describe("validateEntry", () => {
  it("accepts a single day without hours, and stores no invented hours", () => {
    expect(validateEntry(input("2026-10-12"), [], TODAY)).toEqual({
      ok: true,
      value: { startDate: "2026-10-12", endDate: "2026-10-12", startTime: null, endTime: null },
    });
  });

  it("accepts a range with daily hours", () => {
    const r = validateEntry(input("2026-10-12", "2026-10-16", "09:00", "17:00"), [], TODAY);
    expect(r.ok && r.value).toEqual({ startDate: "2026-10-12", endDate: "2026-10-16", startTime: "09:00", endTime: "17:00" });
  });

  it.each([
    [input("2026-02-30"), /valid first date/],
    [input("2026-10-12", "2026-10-10"), /on or after/],
    [input("2026-09-01", "2026-09-10"), /already in the past/],
    [input("2029-01-01"), /two years/],
    [input("2026-10-01", "2027-02-01"), /at most/],
    [input("2026-10-12", "", "09:00", ""), /both a start and an end time/],
    [input("2026-10-12", "", "17:00", "09:00"), /after the start time/],
    [input("2026-10-12", "", "9am", "5pm"), /HH:MM/],
  ])("rejects %j", (value, message) => {
    const r = validateEntry(value, [], TODAY);
    expect(r.ok).toBe(false);
    expect(!r.ok && r.error).toMatch(message);
  });

  it("rejects dates that overlap an existing entry", () => {
    const r = validateEntry(input("2026-10-14", "2026-10-20"), [entry("x", "2026-10-12", "2026-10-16")], TODAY);
    expect(!r.ok && r.error).toMatch(/overlap/);
  });
});

describe("parseDocument", () => {
  it("drops malformed entries instead of showing them", () => {
    const doc = parseDocument({
      updatedAt: "2026-09-28T12:00:00.000Z",
      entries: [
        entry("ok", "2026-10-12"),
        { id: "bad-date", startDate: "2026-13-01", endDate: "2026-13-01", startTime: null, endTime: null },
        { id: "half-hours", startDate: "2026-10-13", endDate: "2026-10-13", startTime: "09:00", endTime: null },
        "nonsense",
      ],
    });
    expect(doc.entries.map((e) => e.id)).toEqual(["ok"]);
  });

  it("treats anything unreadable as an empty calendar", () => {
    expect(parseDocument(null)).toEqual({ entries: [], updatedAt: null });
  });
});

describe("display", () => {
  it("formats single days and ranges", () => {
    expect(formatDateRange("2026-10-12", "2026-10-12")).toBe("Mon 12 Oct 2026");
    expect(formatDateRange("2026-10-12", "2026-10-16")).toBe("Mon 12 – Fri 16 Oct 2026");
    expect(formatDateRange("2026-12-28", "2027-01-01")).toBe("Mon 28 Dec 2026 – Fri 1 Jan 2027");
    expect(formatDateRange("2026-09-28", "2026-10-02")).toMatch(/^Mon 28 Sept? – Fri 2 Oct 2026$/);
  });

  it("shows hours only when both were entered", () => {
    expect(formatTimeRange(entry("a", "2026-10-12", "2026-10-12", "09:00", "17:00"))).toBe("09:00 – 17:00");
    expect(formatTimeRange(entry("b", "2026-10-12"))).toBeNull();
  });
});

describe("display in other languages", () => {
  it("names days and months in the page's language, keeping the Aruba date", () => {
    expect(formatDateRange("2026-10-12", "2026-10-16", "nl")).toBe("ma 12 – vr 16 okt 2026");
    expect(formatDateRange("2026-10-12", "2026-10-16", "es")).toBe("lun 12 – vie 16 oct 2026");
    // Papiamento names come from the tables in dates.ts, so a reviewer's
    // spelling or accent correction there never breaks this test.
    const [mon, fri] = [PAP_WEEKDAYS[1], PAP_WEEKDAYS[5]];
    expect(formatDateRange("2026-10-12", "2026-10-16", "pap")).toBe(`${mon} 12 – ${fri} 16 ${PAP_MONTHS[9]} 2026`);
    expect(formatDateRange("2026-12-28", "2027-01-01", "pap")).toBe(`${mon} 28 ${PAP_MONTHS[11]} 2026 – ${fri} 1 ${PAP_MONTHS[0]} 2027`);
    expect(formatDateRange("2026-10-18", "2026-10-18", "nl")).toBe("zo 18 okt 2026");
  });
});
