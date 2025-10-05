export interface HotSearchItem {
  rank: number;
  keyword: string;
  url?: string;
  hotValue?: number;
  tag?: string;
}

export interface HotSearchResponse {
  success: boolean;
  data: HotSearchItem[];
  timestamp: number;
  message?: string;
}