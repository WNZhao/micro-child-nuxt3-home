<!-- eslint-disable vue/html-self-closing -->
<!--
 * @Author: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @Date: 2025-04-07 17:30:35
 * @LastEditors: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @LastEditTime: 2025-04-07 23:27:51
 * @FilePath: /micro-child-nuxt3-home/pages/child-home/index.vue
 * @Description: 子页面
-->
<template>
  <div class="home-page">
    <!-- 搜索区域 -->
    <div class="search-section">
      <div class="search-container">
        <el-select v-model="searchType" class="search-type">
          <el-option label="职位" value="job" />
          <el-option label="企业" value="company" />
        </el-select>
        <el-input
          v-model="searchKeyword"
          placeholder="请输入要搜索的关键字，如：会计、仓管、设计师等"
          class="search-input"
        >
          <template #append>
            <el-button type="primary" @click="handleSearch">搜索</el-button>
          </template>
        </el-input>
      </div>
      <div v-if="data?.data?.hotKeyList" class="hot-keywords">
        <span class="label">热门职位：</span>
        <a
          v-for="keyword in data.data.hotKeyList"
          :key="keyword"
          href="#"
          class="keyword"
          @click.prevent="handleKeywordClick(keyword)"
          >{{ keyword }}</a
        >
      </div>
    </div>

    <!-- Banner和分类导航区域 -->
    <div class="main-content">
      <!-- 左侧分类导航 -->
      <div class="category-nav">
        <div
          v-for="(category, index) in jobCategories"
          :key="index"
          class="category-item"
          @mouseenter="handleCategoryHover(index)"
          @mouseleave="handleCategoryLeave"
        >
          {{ category.name }}
          <div v-if="hoveredCategory === index" class="sub-categories">
            <div
              v-for="(subCat, subIndex) in category.children"
              :key="subIndex"
              class="sub-category-group"
            >
              <h4>{{ subCat.name }}</h4>
              <div class="sub-category-items">
                <a
                  v-for="item in subCat.items"
                  :key="item"
                  href="#"
                  @click.prevent="handleSubCategoryClick(item)"
                  >{{ item }}</a
                >
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Banner轮播图 -->
      <div v-if="data?.data?.indexBannerList" class="banner-section">
        <el-carousel height="360px">
          <el-carousel-item
            v-for="banner in data.data.indexBannerList"
            :key="banner.id"
          >
            <img :src="banner.bannerUrlWeb" :alt="banner.remark" />
          </el-carousel-item>
        </el-carousel>
      </div>
    </div>

    <!-- 最新职位区域 -->
    <div class="latest-jobs section">
      <div class="section-header">
        <h2>最新职位</h2>
        <a href="#" class="view-more" @click.prevent="handleViewMoreJobs"
          >查看更多</a
        >
      </div>
      <div v-if="data?.data?.jobList" class="job-list">
        <el-row :gutter="20">
          <el-col
            v-for="job in data.data.jobList.slice(0, 8)"
            :key="job.jobId"
            :span="6"
          >
            <div class="job-card">
              <h3 class="job-title">{{ job.jobTitle }}</h3>
              <div class="job-salary">{{ job.salaryRange }}</div>
              <div class="job-info">
                <span>{{ job.workCity }}</span>
                <span>{{ job.recruitJobCount }}人</span>
                <span>{{ job.workAddress }}</span>
              </div>
              <div class="job-tags">
                <el-tag size="small" type="info">{{ job.welfareTag }}</el-tag>
              </div>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>

    <!-- 名企招聘区域 -->
    <div class="famous-companies section">
      <div class="section-header">
        <h2>名企招聘</h2>
        <a href="#" class="view-more" @click.prevent="handleViewMoreCompanies"
          >查看更多</a
        >
      </div>
      <div v-if="data?.data?.famousEnterpriseList" class="company-list">
        <el-row :gutter="20">
          <el-col
            v-for="company in data.data.famousEnterpriseList.slice(0, 6)"
            :key="company.id"
            :span="4"
          >
            <div class="company-card">
              <img
                :src="company.logo"
                :alt="company.name"
                class="company-logo"
              />
              <h3 class="company-name">{{ company.name }}</h3>
              <div class="company-info">
                <span>{{ company.industry }}</span>
                <span>{{ company.scale }}人</span>
                <span>{{ company.financing }}轮</span>
              </div>
              <div class="hot-tag">1个热招职位</div>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { getIndexData } from '~/api/homeApi';
import type { ApiResponse, HomePageData } from '~/types/home';

// 搜索相关
const searchType = ref('job');
const searchKeyword = ref('');
const hoveredCategory = ref(-1);

// 职位分类数据
const jobCategories = ref([
  {
    name: '生活 | 服务业',
    children: [
      {
        name: '餐饮',
        items: [
          '服务员',
          '送餐员',
          '厨师/厨师长',
          '后厨',
          '传菜员',
          '配菜/打荷',
          '洗碗工',
          '面点师',
          '茶艺师',
          '迎宾/接待',
          '大堂经理/领班',
          '餐饮管理',
          '学徒',
          '杂工',
          '日式厨师',
          '西点师',
          '餐饮其他',
        ],
      },
      {
        name: '家政保洁/安保',
        items: [
          '保洁',
          '保姆',
          '月嫂',
          '育婴师/保育员',
          '洗衣工',
          '钟点工',
          '保安',
          '护工',
          '送水工',
          '保安队长',
          '家政保洁其他',
        ],
      },
      {
        name: '美容/美发',
        items: [
          '发型师',
          '美发助理/学徒',
          '洗头工',
          '美容导师',
          '美容师',
          '美容助理/学徒',
          '化妆师',
          '美甲师',
          '宠物美容/护理',
          '美容店长',
          '美容/瘦身顾问',
          '彩妆培训师',
          '美体师',
          '形象设计师',
          '整容整形师',
          '美容美发其他',
        ],
      },
    ],
  },
  {
    name: '人力 | 行政 | 管理',
    children: [
      {
        name: '人力资源',
        items: [
          '人事专员',
          '招聘专员',
          '培训专员',
          '人力资源主管',
          'HRBP',
          '绩效专员',
          '薪酬福利专员',
          '人力资源总监',
          '员工关系',
        ],
      },
      {
        name: '行政',
        items: [
          '行政专员',
          '前台接待',
          '行政主管',
          '经理助理',
          '后勤',
          '司机',
          '文员',
          '资料管理',
        ],
      },
      {
        name: '管理',
        items: [
          '总经理',
          '副总经理',
          '总裁助理',
          '项目总监',
          '运营总监',
          '商务总监',
          '管理培训生',
        ],
      },
    ],
  },
  {
    name: '销售 | 客服 | 采购 | 淘宝',
    children: [
      {
        name: '销售',
        items: [
          '销售代表',
          '销售经理',
          '客户经理',
          '销售总监',
          '渠道销售',
          '电话销售',
          '销售助理',
          '商务拓展',
        ],
      },
      {
        name: '客服',
        items: [
          '客服专员',
          '客服主管',
          '客服经理',
          '售前客服',
          '售后客服',
          '电话客服',
          '在线客服',
        ],
      },
      {
        name: '采购/淘宝',
        items: [
          '采购专员',
          '采购经理',
          '买手',
          '淘宝客服',
          '淘宝美工',
          '淘宝运营',
          '电商运营',
        ],
      },
    ],
  },
  {
    name: '市场 | 媒介 | 广告 | 设计',
    children: [
      {
        name: '市场/媒介',
        items: [
          '市场专员',
          '市场经理',
          '市场总监',
          '媒介经理',
          '品牌经理',
          '活动策划',
          '市场调研',
        ],
      },
      {
        name: '广告',
        items: [
          '广告创意',
          '广告设计',
          '广告文案',
          '广告制作',
          '广告投放',
          '广告销售',
        ],
      },
      {
        name: '设计',
        items: [
          '平面设计',
          'UI设计',
          '网页设计',
          '室内设计',
          '产品设计',
          '工业设计',
          '服装设计',
        ],
      },
    ],
  },
  {
    name: '生产 | 物流 | 质控 | 汽车',
    children: [
      {
        name: '生产/制造',
        items: [
          '生产员工',
          '生产主管',
          '生产经理',
          '车间主任',
          '厂长',
          '生产总监',
          '生产计划',
        ],
      },
      {
        name: '物流/仓储',
        items: [
          '仓库管理员',
          '物流专员',
          '快递员',
          '货运司机',
          '物流经理',
          '供应链经理',
        ],
      },
      {
        name: '质量管理',
        items: ['质检员', '质量管理', 'QA', 'QC', '体系工程师', '认证工程师'],
      },
    ],
  },
  {
    name: '网络 | 通信 | 电子',
    children: [
      {
        name: 'IT/互联网',
        items: [
          '软件工程师',
          '前端开发',
          '后端开发',
          '测试工程师',
          '运维工程师',
          '产品经理',
          '项目经理',
        ],
      },
      {
        name: '通信',
        items: ['通信工程师', '电信工程师', '通信技术员', '通信项目经理'],
      },
      {
        name: '电子/半导体',
        items: [
          '电子工程师',
          'IC设计师',
          'PCB设计',
          '嵌入式工程师',
          '电气工程师',
        ],
      },
    ],
  },
  {
    name: '法律 | 教育 | 翻译 | 出版',
    children: [
      {
        name: '法律',
        items: ['律师', '法务', '合规经理', '知识产权', '法律顾问'],
      },
      {
        name: '教育/培训',
        items: ['教师', '培训师', '课程顾问', '教务管理', '教育研究'],
      },
      {
        name: '翻译/出版',
        items: ['英语翻译', '日语翻译', '韩语翻译', '编辑', '作家', '出版发行'],
      },
    ],
  },
  {
    name: '财会 | 金融 | 保险',
    children: [
      {
        name: '财会',
        items: ['会计', '出纳', '财务经理', '审计', '税务', '财务总监'],
      },
      {
        name: '金融',
        items: ['投资经理', '理财顾问', '基金经理', '证券分析师', '风控'],
      },
      {
        name: '保险',
        items: ['保险顾问', '保险经理', '理赔专员', '保险产品开发'],
      },
    ],
  },
  {
    name: '医疗 | 制药 | 环保',
    children: [
      {
        name: '医疗/护理',
        items: ['医生', '护士', '药剂师', '医学检验', '康复治疗师'],
      },
      {
        name: '制药/生物',
        items: ['药品研发', '临床研究', '生物工程师', '化学分析'],
      },
      {
        name: '环保',
        items: ['环保工程师', '环境评估', '环保检测', '水处理工程师'],
      },
    ],
  },
  {
    name: '建筑 | 物业 | 农林牧渔 | 其他',
    children: [
      {
        name: '建筑/装修',
        items: ['建筑工程师', '工程监理', '施工员', '装修设计', '造价师'],
      },
      {
        name: '物业管理',
        items: ['物业经理', '物业维修', '物业客服', '保安主管'],
      },
      {
        name: '农林牧渔',
        items: ['农艺师', '畜牧师', '园艺师', '养殖技术员'],
      },
    ],
  },
]);

// 使用 useAsyncData 在服务端获取数据
const { data, pending, error } = await useAsyncData<ApiResponse<HomePageData>>(
  'home-data',
  () => getIndexData(),
  {
    server: true,
    lazy: false,
  }
);

// 处理搜索
const handleSearch = () => {
  console.log('搜索类型:', searchType.value);
  console.log('搜索关键词:', searchKeyword.value);
  // 跳转到找工作子应用
  navigateTo('/job-search');
};

// 处理热门关键词点击
const handleKeywordClick = (keyword: string) => {
  searchKeyword.value = keyword;
  handleSearch();
};

// 处理分类悬停
const handleCategoryHover = (index: number) => {
  hoveredCategory.value = index;
};

// 处理分类离开
const handleCategoryLeave = () => {
  hoveredCategory.value = -1;
};

// 处理子分类点击
const handleSubCategoryClick = (item: string) => {
  searchKeyword.value = item;
  handleSearch();
};

// 查看更多职位
const handleViewMoreJobs = () => {
  navigateTo('/job-search');
};

// 查看更多企业
const handleViewMoreCompanies = () => {
  navigateTo('/company-search');
};

// 监听数据变化
watch(data, (newData) => {
  console.log('数据更新:', newData);
});

// 监听错误
watch(error, (newError) => {
  if (newError) {
    console.error('监听到错误:', newError);
  }
});

// 页面挂载时
onMounted(() => {
  console.log('页面挂载完成，当前数据:', {
    data: data.value,
    pending: pending.value,
    error: error.value,
  });
});
</script>

<style lang="scss" scoped>
// 样式已移至 assets/sass/main.scss
</style>
