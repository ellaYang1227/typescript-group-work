<script setup lang="ts">
import { Ref, ref, computed, watch } from "vue";
import ZipCodeMap from "@/utilities/zipcodes.ts";

interface CityInfo {
  zipcode: number;
  city: string;
}

const props = defineProps<{
  modelValue: number;
}>();
const emit = defineEmits<{
  "update:modelValue": [value: number];
}>();

const county: Ref<string> = ref("高雄市");
const cityZipcode: Ref<number> = ref(800);

const counties: string[] = [...new Set(ZipCodeMap.map((item) => item.county))];
const cities = computed<CityInfo[]>(() => {
  return ZipCodeMap.filter((r) => r.county === county.value).map(
    ({ zipcode, city }) => ({ zipcode, city })
  );
});

// 縣市變更，預選第一個區域
const setInitCityZipcode = (): void => {
  cityZipcode.value = cities.value[0].zipcode;
  emit("update:modelValue", cityZipcode.value);
};

// 建立初始值
const setInitValue = (): void => {
  const { modelValue } = props;
  if (modelValue) {
    const match = ZipCodeMap.find((zipCode) => zipCode.zipcode === modelValue);
    county.value = match?.county || "高雄市";
    cityZipcode.value = match?.zipcode || 800;
  }
};
setInitValue();

// 監聽父元件更新的 modelValue 值
watch<any, any>(
  () => props.modelValue,
  (newVal: number) => {
    // 更新 modelValue
    if (newVal) {
      setInitValue();
    }
  },
  { immediate: true }
);
</script>

<template>
  <section class="d-flex gap-2">
    <select
      class="form-select p-3"
      v-model="county"
      @change="setInitCityZipcode"
    >
      <option v-for="county in counties" :key="county">{{ county }}</option>
    </select>
    <select
      class="form-select p-3"
      v-model="cityZipcode"
      @change="$emit('update:modelValue', cityZipcode)"
    >
      <option v-for="city in cities" :key="city.zipcode" :value="city.zipcode">
        {{ city.city }}
      </option>
    </select>
  </section>
</template>
