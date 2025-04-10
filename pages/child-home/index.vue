<!-- eslint-disable vue/html-self-closing -->
<template>
  <div class="home-page">
    <!-- 搜索区域 -->
    <div class="search-section">
      <div class="search-container">
        <el-input
          size="large"
          class="input-with-select"
          placeholder="请输入要搜索的关键字，如：会计、仓管、设计师等"
        >
          <template #prepend>
            <el-select
              v-model="searchType"
              placeholder="职位"
              class="search-type"
              style="width: 100px"
            >
              <el-option label="职位" value="job" />
              <el-option label="公司" value="company" />
            </el-select>
          </template>
          <template #append>
            <el-button type="primary" style="color: #fff">搜索</el-button>
          </template>
        </el-input>
      </div>
      <div class="hot-keywords">
        <span class="label">热搜职位：</span>
        <a
          v-for="keyword in homeData?.hotKeyList"
          :key="keyword"
          href="#"
          class="keyword"
          >{{ keyword }}</a
        >
      </div>
    </div>

    <!-- 主要内容区域 -->
    <div class="main-content">
      <!-- 左侧分类导航 -->
      <div class="category-nav">
        <div
          v-for="category in categories"
          :key="category.name"
          class="category-item"
        >
          {{ category.name }}
          <div v-if="category.children" class="sub-categories">
            <div
              v-for="subCategory in category.children"
              :key="subCategory.name"
              class="sub-category-group"
            >
              <div class="group-title">{{ subCategory.name }}</div>
              <div class="group-items">
                <a
                  v-for="item in subCategory.items"
                  :key="item"
                  href="#"
                  class="item"
                  @click.prevent="handleItemClick(item)"
                  >{{ item }}</a
                >
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 右侧轮播图 -->
      <div class="banner-section">
        <el-carousel height="510px">
          <el-carousel-item
            v-for="banner in homeData?.indexBannerList"
            :key="banner.id"
          >
            <a :href="banner.linkUrl" target="_blank" class="banner-item-link">
              <img
                :src="banner.bannerUrlWeb"
                :alt="banner.remark"
                class="banner-item-img"
              />
            </a>
          </el-carousel-item>
        </el-carousel>
      </div>
    </div>

    <!-- 最新职位 -->
    <div class="section">
      <div class="section-header">
        <h2>最新职位</h2>
        <a href="#" class="view-more">查看更多</a>
      </div>
      <div class="job-list">
        <div v-for="job in homeData?.jobList" :key="job.jobId" class="job-card">
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
      </div>
    </div>

    <!-- 名企招聘 -->
    <div class="section">
      <div class="section-header">
        <h2>名企招聘</h2>
        <a href="#" class="view-more">查看更多</a>
      </div>
      <div class="company-list">
        <div
          v-for="company in homeData?.famousEnterpriseList"
          :key="company.id"
          class="company-card"
        >
          <img :src="company.logo" :alt="company.name" class="company-logo" />
          <h3 class="company-name">{{ company.name }}</h3>
          <div class="company-info">
            <span>{{ company.industry }}</span>
            <span>{{ company.scale }}人</span>
            <span>{{ company.financing }}轮</span>
          </div>
          <div class="hot-tag">1个热招职位</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import type { HomePageData, Category } from '~/types/home';
import { getIndexData } from '~/api/homeApi';

// 搜索类型
const searchType = ref('job');

// 分类数据
const categories: Category[] = [
  {
    name: '生活｜服务业',
    children: [
      {
        name: '餐饮',
        items: [
          '服务员',
          '送餐员',
          '厨师',
          '后厨',
          '传菜员',
          '配菜打荷',
          '洗碗工',
          '面点师',
        ],
      },
      {
        name: '家政保洁/安保',
        items: [
          '保洁',
          '保姆',
          '月嫂',
          '育婴师',
          '洗衣工',
          '钟点工',
          '保安',
          '护工',
        ],
      },
      {
        name: '美容/美发',
        items: [
          '发型师',
          '美发助理',
          '洗头工',
          '美容师',
          '美甲师',
          '化妆师',
          '美容顾问',
        ],
      },
    ],
  },
  {
    name: '人力｜行政｜管理',
    children: [
      {
        name: '人力资源',
        items: [
          '人事专员',
          '招聘专员',
          '培训专员',
          'HRBP',
          '人力资源主管',
          '薪酬福利专员',
        ],
      },
      {
        name: '行政',
        items: [
          '行政专员',
          '前台接待',
          '行政主管',
          '经理助理',
          '文员',
          '资料管理',
        ],
      },
      {
        name: '管理',
        items: ['总经理', '副总经理', '总监', '项目经理', '部门经理', '主管'],
      },
    ],
  },
  {
    name: '销售｜客服｜采购｜淘宝',
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
        ],
      },
      {
        name: '客服',
        items: [
          '客服专员',
          '客服主管',
          '电话客服',
          '在线客服',
          '客服经理',
          '售后服务',
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
    name: '市场｜媒介｜广告｜设计',
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
          '文案策划',
          '广告制作',
          '媒介投放',
          '广告客户',
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
          '插画师',
        ],
      },
    ],
  },
  {
    name: '生产｜物流｜质控｜汽车',
    children: [
      {
        name: '生产/质控',
        items: [
          '生产员工',
          '质检员',
          '车间主管',
          '生产经理',
          '质量主管',
          '工艺工程师',
        ],
      },
      {
        name: '物流/仓储',
        items: [
          '仓库管理员',
          '物流专员',
          '快递员',
          '理货员',
          '物流经理',
          '货运司机',
        ],
      },
      {
        name: '汽车',
        items: [
          '汽车维修',
          '汽车美容',
          '汽车销售',
          '4S店管理',
          '汽车检验',
          '二手车评估',
        ],
      },
    ],
  },
  {
    name: '网络｜通信｜电子',
    children: [
      {
        name: '开发/程序',
        items: [
          'Java工程师',
          'Web前端',
          '后端开发',
          'iOS开发',
          '安卓开发',
          '算法工程师',
        ],
      },
      {
        name: '通信/电子',
        items: [
          '通信工程师',
          '电子工程师',
          '硬件工程师',
          '测试工程师',
          '运维工程师',
        ],
      },
      {
        name: '产品/运营',
        items: [
          '产品经理',
          '产品助理',
          '运营专员',
          '数据分析',
          '游戏策划',
          '网站编辑',
        ],
      },
    ],
  },
  {
    name: '法律｜教育｜翻译｜出版',
    children: [
      {
        name: '法律',
        items: ['律师', '法务', '律师助理', '合规顾问', '法律顾问', '知识产权'],
      },
      {
        name: '教育/培训',
        items: ['教师', '幼师', '培训讲师', '课程顾问', '教务管理', '家教'],
      },
      {
        name: '翻译/出版',
        items: ['英语翻译', '日语翻译', '韩语翻译', '编辑', '作家', '出版发行'],
      },
    ],
  },
  {
    name: '财会｜金融｜保险',
    children: [
      {
        name: '财会/审计',
        items: ['会计', '出纳', '财务主管', '审计', '税务', '财务分析'],
      },
      {
        name: '金融/证券',
        items: [
          '投资经理',
          '理财顾问',
          '证券分析',
          '基金经理',
          '信贷专员',
          '风控',
        ],
      },
      {
        name: '保险',
        items: [
          '保险顾问',
          '保险经理',
          '理赔专员',
          '保险培训',
          '保险内勤',
          '契约管理',
        ],
      },
    ],
  },
  {
    name: '医疗｜制药｜环保',
    children: [
      {
        name: '医疗/护理',
        items: ['医生', '护士', '药剂师', '医学影像', '康复治疗', '营养师'],
      },
      {
        name: '制药/生物',
        items: [
          '药品研发',
          '生物工程',
          '临床研究',
          '医药代表',
          '化学分析',
          '药品生产',
        ],
      },
      {
        name: '环保',
        items: [
          '环保工程师',
          '环评工程师',
          '环境监测',
          '水处理',
          '固废处理',
          '环保检测',
        ],
      },
    ],
  },
  {
    name: '建筑｜物业｜农林牧渔｜其他',
    children: [
      {
        name: '建筑/装修',
        items: [
          '建筑工程师',
          '工程监理',
          '建筑设计师',
          '装修设计',
          '施工员',
          '预算员',
        ],
      },
      {
        name: '物业/维修',
        items: ['物业经理', '物业管理', '电工', '维修工', '园艺师', '绿化工'],
      },
      {
        name: '农林牧渔',
        items: [
          '农艺师',
          '畜牧师',
          '养殖技术',
          '园林技术',
          '林业技术',
          '饲养员',
        ],
      },
    ],
  },
];

// 首页数据
const homeData = ref<HomePageData | null>(null);

// 获取首页数据
const fetchHomeData = async () => {
  try {
    const response = await getIndexData();
    if (response.success && response.code === '000000') {
      homeData.value = response.data;
    }
  } catch (error) {
    console.error('获取首页数据失败:', error);
  }
};

// 处理子项点击
const handleItemClick = (item: string) => {
  console.log('点击了:', item);
  // 这里可以添加跳转逻辑
};

onMounted(() => {
  fetchHomeData();
});
</script>

<style lang="scss" scoped>
// 搜索类型选择器样式
:deep(
    .el-input-group--prepend
      .el-input-group__prepend
      .el-select
      .el-select__wrapper
  ) {
  box-shadow: none !important;
  text-align: center !important;
}

// 搜索按钮样式
:deep(.el-input-group__append) {
  background-color: #1677ff !important;
  border-color: #1677ff !important;

  .el-button {
    background-color: transparent;
    border: none;
    color: #fff !important;
    padding: 8px 20px;
    font-size: 14px;
    transition: all 0.3s ease;

    &:hover {
      color: #fff !important;
      background-color: #4096ff;
    }

    &:active {
      background-color: #0958d9;
    }
  }

  &:hover {
    background-color: #4096ff !important;
    border-color: #4096ff !important;
  }
}

// 覆盖 Element Plus 的下拉框样式
:deep(.el-input-group--prepend) {
  .el-input-group__prepend {
    .el-select {
      .el-input {
        .el-input__wrapper {
          box-shadow: none !important;
          border: none !important;
          background: transparent !important;
        }
      }
    }
  }
}
.el-carousel__item {
  display: flex;
  justify-content: stretch;
  align-items: stretch;
}
.banner-item-link {
  // align-self: stretch;
  // justify-self: stretch;
  width: 100%;
  height: 100%;
  .banner-item-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}
</style>
