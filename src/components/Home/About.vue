<script setup lang="ts">
import SectionTitle from "@/components/Home/SectionTitle.vue";
</script>

<template>
  <section class="homeAbout bg-neutral-dark">
    <div class="container py-10 py-lg-11 homeAbout_inner">
      <div class="homeAbout_innerBox">
        <div class="row">
          <div class="offset-lg-2 col-lg-10">
            <div class="homeAbout_content">
              <div class="homeAbout_contentInner">
                <div class="z-1 position-relative">
                  <SectionTitle title="關於我們" type="white" />
                  <p class="text-white mb-0 fs-lg-8 fs-9">
                    享樂酒店，位於美麗島高雄的心臟地帶，是這座城市的璀璨瑰寶與傲人地標。
                    <br
                      class="d-lg-block d-none"
                    />我們的存在，不僅僅是為了提供奢華的住宿體驗，更是為了將高雄的美麗與活力，獻給每一位蒞臨的旅客。
                  </p>
                  <p class="pt-3 pt-lg-6 text-white mb-0 fs-lg-8 fs-9">
                    我們的酒店，擁有時尚典雅的裝潢，每一個細節都充滿著藝術與設計的精緻。
                    <br
                      class="d-lg-block d-none"
                    />我們的員工，都以熱情的服務與專業的態度，讓每一位客人都能感受到賓至如歸的溫暖。
                  </p>
                  <p class="pt-3 pt-lg-6 text-white mb-0 fs-lg-8 fs-9">
                    在這裡，您可以遙望窗外，欣賞高雄的城市景色，感受這座城市的繁華與活力；您也可以舒適地坐在我們的餐廳，品嚐精緻的佳餚，體驗無與倫比的味覺盛宴。
                  </p>
                  <p class="pt-3 pt-lg-6 text-white mb-0 fs-lg-8 fs-9">
                    享樂酒店，不僅是您在高雄的住宿之選，更是您感受高雄魅力的最佳舞台。我們期待著您的蒞臨，讓我們共同編織一段難忘的高雄故事。
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss">
.homeAbout {
  // overflow: hidden;
  position: relative;
  &:before {
    position: absolute;
    content: "";
    left: 0;
    right: 0;
    width: 100%;
    top: 7.5rem;
    height: 672px;
    background-image: url("https://raw.githubusercontent.com/hexschool/2022-web-layout-training/main/typescript-hotel/桌機版/about.png");
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
    @include media-breakpoint-down(lg) {
      display: none;
    }
  }
  &_inner {
    position: relative;
    &:before {
      @include media-breakpoint-down(lg) {
        position: absolute;
        content: "";
        left: 0;
        right: 0;
        width: 100%;
        background-image: url("https://raw.githubusercontent.com/hexschool/2022-web-layout-training/main/typescript-hotel/行動版/about.png");
        background-repeat: no-repeat;
        background-size: cover;
        background-position: center;
        height: 67.114%;
        top: 5rem;
      }
      @include media-breakpoint-down(md) {
        height: 71.114%;
      }
      @include media-breakpoint-down(sm) {
        width: 100%;
        height: 75.114%;
        margin-left: 0;
        margin-right: 0;
      }
    }
    &:after {
      position: absolute;
      content: "";
      background-image: url("@/assets/homeDot.svg");
      background-repeat: no-repeat;
      background-size: cover;
      background-position: center;
      height: 200px;
      width: 200px;
      top: -120px;
      left: -112px;
      @include media-breakpoint-down(lg) {
        top: -40px;
        left: 24px;
        width: 100px;
        height: 100px;
      }
    }
  }

  &_content {
    display: flex;
    justify-content: center;
    @include media-breakpoint-down(lg) {
      padding-left: calc(40px - 12px);
      padding-right: calc(20px - 12px);
    }
  }
  &_contentInner {
    position: relative;
    max-width: 65.25rem;
    margin: 5rem 0 auto;
    width: 100%;
    padding: 5rem;
    letter-spacing: 0.125em;
    line-height: 1.5;
    &::before {
      content: "";
      background: linear-gradient(
        180deg,
        rgba(20, 15, 10, 0.8) 0%,
        rgba(190, 156, 124, 0.8) 100%
      );
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      border: 1px solid $white;
      border-width: 0 0 1px 1px;
      border-radius: 80px 80px 0px 80px;
      backdrop-filter: blur(8px);
    }
    @include media-breakpoint-down(lg) {
      padding: 1.5rem;
      margin: 2.5rem 0 auto;
      &::before {
        border-radius: 40px 40px 0px 40px;
      }
    }
  }
}
</style>
