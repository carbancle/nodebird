<template>
  <q-page class="flex flex-center">
    <img
      alt="Quasar logo"
      src="~assets/quasar-logo-vertical.svg"
      style="width: 200px; height: 200px"
    />
    <div class="col">
      <q-select
        filled
        v-model="selectedCategory"
        :options="categories"
        label="카테고리 선택"
      />
      <q-select
        filled
        v-model="selectedItem"
        :options="items"
        label="항목 선택"
      />
      <q-select
        filled
        v-model="selectedDepth"
        :options="depths"
        :label="selectLabel"
      />
    </div>
  </q-page>
</template>

<script setup>
import { ref, computed } from "vue";
import useMultiSelect from "../js/useMultiSelect";

defineOptions({
  name: "IndexPage",
});

const optionsMap = {
  test1: {
    fruits: [
      { label: "바나나", value: "banana" },
      { label: "사과", value: "apple" },
    ],
    animals: [
      { label: "개", value: "dog" },
      { label: "고양이", value: "cat" },
    ],
  },
  test2: {
    color: [
      { label: "노랑", value: "yellow" },
      { label: "빨강", value: "red" },
    ],
  },
  test3: {
    list: [
      { label: "개과", value: "개과" },
      { label: "고양이과", value: "고양이과" },
    ],
  },
};

const {
  selectedCategory,
  selectedItem,
  selectedDepth,
  categories,
  items,
  depths,
} = useMultiSelect(
  [
    { label: "과일", value: "fruits" },
    { label: "동물", value: "animals" },
  ],
  optionsMap
);

const selectLabel = computed(() => {
  if (selectedCategory.value && selectedCategory.value.value === "fruits") {
    return "색깔 선택";
  } else if (
    selectedCategory.value &&
    selectedCategory.value.value === "animals"
  ) {
    return "품종 선택";
  } else {
    return "항목을 선택해주세요";
  }
});
</script>
