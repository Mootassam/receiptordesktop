import moment from "moment";

class Dates {
  static formatTemplate1(date: string | undefined): string {
    if (!date) return "2023-03-16 20:23:01";
    const d = moment(date);
    if (!d.isValid()) return "2023-03-16 20:23:01";
    return d.format("YYYY-MM-DD HH:mm:ss");
  }

  static formatTemplate2(date: string | undefined): string {
    if (!date) return "2024-04-03 17:20:48";
    const d = moment(date);
    if (!d.isValid()) return "2024-04-03 17:20:48";
    return d.format("YYYY-MM-DD HH:mm:ss");
  }

  static formatTemplate3(date: string | undefined): string {
    if (!date) return "2025-11-15 13:19:34";
    const d = moment(date);
    if (!d.isValid()) return "2025-11-15 13:19:34";
    return d.format("YYYY-MM-DD HH:mm:ss");
  }

  static formatTemplate5(date: string | undefined): string {
    if (!date) return "Aug 24, 2024 at 8:45:10 PM";
    const d = moment(date);
    if (!d.isValid()) return "Aug 24, 2024 at 8:45:10 PM";
    return d.format("MMM DD, YYYY [at] h:mm:ss A");
  }

 static formatTemplate6(date: string | undefined): string {

  const fallback = "Jul 9,2024 at 12:17:32 PM";

  if (!date) return fallback;

  const d = moment(date);
  if (!d.isValid()) return fallback;

  return d.format("MMM D,YYYY [at] h:mm:ss A");
}


  static formatTemplate7(date: string | undefined): string {
    if (!date) return "2026-03-24 10:27:53";
    const d = moment(date);
    if (!d.isValid()) return "2026-03-24 10:27:53";
    return d.format("YYYY-MM-DD HH:mm:ss");
  }

  static formatTemplate8(date: string | undefined): string {
    if (!date) return "2026-01-28 02:12:57";
    const d = moment(date);
    if (!d.isValid()) return "2026-01-28 02:12:57";
    return d.format("YYYY-MM-DD HH:mm:ss");
  }

  static formatTemplate9(date: string | undefined): string {
    if (!date) return "Oct 19, 2025 9:35 PM";
    const d = moment(date);
    if (!d.isValid()) return "Oct 19, 2025 9:35 PM";
    return d.format("MMM DD, YYYY h:mm A");
  }

  static formatTemplate10(date: string | undefined): string {
    if (!date) return "2024-04-02 20:59:54";
    const d = moment(date);
    if (!d.isValid()) return "2024-04-02 20:59:54";
    return d.format("YYYY-MM-DD HH:mm:ss");
  }

  static formatTemplate11(date: string | undefined): string {
    if (!date) return "Jan 18, 2026, 9:29 PM";
    const d = moment(date);
    if (!d.isValid()) return "Jan 18, 2026, 9:29 PM";
    return d.format("MMM DD, YYYY, h:mm A");
  }

  static formatTemplate12(date: string | undefined): string {
    if (!date) return "Nov 9, 2025, 8:15 PM";
    const d = moment(date);
    if (!d.isValid()) return "Nov 9, 2025, 8:15 PM";
    return d.format("MMM DD, YYYY, h:mm A");
  }

  static formatTemplate13(date: string | undefined): string {
    if (!date) return "Jul19, 2024 23:11 +0400";
    const d = moment(date);
    if (!d.isValid()) return "Jul19, 2024 23:11 +0400";
    return d.format("MMMDD, YYYY HH:mm ZZ");
  }

  static formatTemplate14(date: string | undefined): string {
    if (!date) return "13 Jul, 01:40";
    const d = moment(date);
    if (!d.isValid()) return "13 Jul, 01:40";
    return d.format("DD MMM, HH:mm");
  }

  static formatTemplate15(date: string | undefined): string {
    if (!date) return "Today at 6:11 AM";
    const d = moment(date);
    if (!d.isValid()) return "Today at 6:11 AM";
    const now = moment();
    if (d.isSame(now, "day")) {
      return d.format("[Today at] h:mm A");
    }
    return d.format("MMM DD, YYYY at h:mm A");
  }

  static formatTemplate16(date: string | undefined): string {
    if (!date) return "Mar 23, 10:31 PM";
    const d = moment(date);
    if (!d.isValid()) return "Mar 23, 10:31 PM";
    return d.format("MMM DD, h:mm A");
  }

  static formatTemplate17(date: string | undefined): string {
    if (!date) return "Mar 7, 4:09 AM";
    const d = moment(date);
    if (!d.isValid()) return "Mar 7, 4:09 AM";
    return d.format("MMM D, h:mm A");
  }

  static formatTemplate19(date: string | undefined): string {
    if (!date) return "Today at 3:40 PM";
    const d = moment(date);
    if (!d.isValid()) return "Today at 3:40 PM";
    const now = moment();
    if (d.isSame(now, "day")) {
      return d.format("[Today at] h:mm A");
    }
    return d.format("MMM DD, YYYY [at] h:mm A");
  }

  static formatTemplate20(date: string | undefined): string {
    if (!date) return "Nov 21,2025,1:24 PM";
    const d = moment(date);
    if (!d.isValid()) return "Nov 21,2025,1:24 PM";
    return d.format("MMM DD,YYYY,h:mm A");
  }

  static formatTemplate21(date: string | undefined): string {
    if (!date) return "4:19 PM - Jan22, 2026";
    const d = moment(date);
    if (!d.isValid()) return "4:19 PM - Jan22, 2026";
    return d.format("h:mm A - MMMDD, YYYY");
  }
}

export default Dates;