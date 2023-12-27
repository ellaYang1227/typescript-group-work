<script setup lang="ts">
import BaseButton from '@/components/BaseButton.vue';
// const myModal = new bootstrap.Modal(document.getElementById('myModal'), Option)
</script>

<template>
    <footer class="bg-neutral text-white footer">
        <div class="container-xxl footer_inner">
            <div class="fotter_top d-md-flex justify-content-between">
                <div class="footer_leftSide">
                    <img src="@/assets/logoWhite.svg" alt="" />
                    <div class="mt-7">
                        <BaseButton
                            href="https://line.me/tw/"
                            class="isStyleTextIcon footer_icon"
                        >
                            <font-awesome-icon icon="fa-brands fa-line" />
                        </BaseButton>
                        <BaseButton
                            href="https://www.instagram.com/"
                            class="isStyleTextIcon footer_icon"
                        >
                            <font-awesome-icon icon="fa-brands fa-instagram" />
                        </BaseButton>
                    </div>
                </div>
                <div class="footer_rightSide">
                    <div class="d-md-flex">
                        <div class="leftItem">
                            <h4 class="h6">TEL</h4>
                            <span class="text-neutral-40">+886-7-1234567</span>
                        </div>
                        <div class="mt-md-0 mt-3">
                            <h4 class="h6">MAIL</h4>
                            <span class="text-neutral-40"
                                >elh@hexschool.com</span
                            >
                        </div>
                    </div>
                    <div class="d-md-flex">
                        <div class="leftItem mt-md-7 mt-3">
                            <h4 class="h6">FAX</h4>
                            <span class="text-neutral-40">+886-7-1234567</span>
                        </div>
                        <div class="mt-md-7 mt-3">
                            <h4 class="h6">WEB</h4>
                            <span class="text-neutral-40"
                                >www.elhhexschool.com.tw</span
                            >
                        </div>
                    </div>
                </div>
            </div>
            <div class="footer_copy d-md-flex justify-content-between">
                <p class="mb-md-0 mb-3">806023 台灣高雄市新興區六角路123號</p>
                <p class="mb-0">© 享樂酒店 2023 All Rights Reserved.</p>
            </div>
        </div>
    </footer>
</template>

<style lang="scss">
.footer {
    padding-top: 88px;
    padding-bottom: 120px;
    &_icon {
        width: auto;
        padding: 8px;
        border-color: $white !important;
        border-radius: 100%;
        letter-spacing: 0;
        margin-right: 1rem;
        svg {
            font-size: 24px;
        }
        &:hover {
            border-color: $primary !important;
        }
    }
    &_rightSide {
        margin-top: 2px;
        .leftItem {
            margin-right: 80px;
        }
        @include media-breakpoint-down(md) {
            margin-top: 40px;
            .leftItem {
                margin-right: 0;
            }
        }
    }
    &_copy {
        margin-top: 80px;
    }
}
</style>
