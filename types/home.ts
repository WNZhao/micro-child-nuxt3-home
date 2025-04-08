// 分类数据接口
export interface Category {
  name: string;
  children?: SubCategory[];
}

export interface SubCategory {
  name: string;
  items: string[];
}

// Banner 接口
export interface Banner {
  id: number;
  appType: number;
  bannerUrl: string;
  bannerUrlWeb: string;
  linkUrl: string;
  statusNo: number;
  sortNo: number;
  remark: string;
}

// 名企接口
export interface Enterprise {
  id: number;
  logo: string;
  name: string;
  industry: string;
  scale: number;
  financing: string;
}

// 职位接口
export interface Job {
  jobId: number;
  jobTitle: string;
  salaryMin: number;
  salaryMax: number;
  salaryRange: string;
  salaryUnit: number;
  recruitJobCount: number;
  workProvince: string | null;
  workCity: string;
  workAddress: string;
  jobDescription: string;
  ifApply: boolean | null;
  welfareTag: string;
}

// API响应数据接口
export interface ApiResponse<T> {
  success: boolean;
  code: string;
  message: string;
  timestamp: number;
  data: T;
}

// 首页数据接口
export interface HomePageData {
  indexBannerList: Banner[];
  hotKeyList: string[];
  famousEnterpriseList: Enterprise[];
  jobList: Job[];
}
