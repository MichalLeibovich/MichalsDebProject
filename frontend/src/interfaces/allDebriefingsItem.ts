export type status = "מוכן" | "בתהליך";

export interface AllDebriefingsItem {
  id: number,
  title: string,
  system: string,
  status: status,
  created_at: string,
  updated_at: string,
}