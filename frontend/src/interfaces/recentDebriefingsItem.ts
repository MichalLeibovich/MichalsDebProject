export type status = "הושלם" | "בתהליך";

export interface RecentDebriefingsItem {
  title: string,
  system: string,
  status: status,
  last_update_time: string,
  creation_time: string,
}