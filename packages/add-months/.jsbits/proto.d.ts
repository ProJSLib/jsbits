/// <reference no-default-lib="true"/>
/// <reference lib="es2015" />

// Extends the Date interface
interface Date {
  /**
   * Add or subtract a number of months to the date value in the Date object using local time.
   *
   * @param count A numerical value that, if positive, adds that number of months to the date, and if it is negative, subtracts them.
   */
  addMonths(count: number): number;
  /**
   * Add or subtract a number of months to the date value in the Date object using Universal Coordinated Time (UTC).
   *
   * @param count A numerical value that, if positive, adds that number of months to the date, and if it is negative, subtracts them.
   */
  addUTCMonths(count: number): number;
}
