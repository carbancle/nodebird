import { ref, watch } from "vue";

export default function useMultiSelect(initialCategories, optionsMap) {
  const selectedCategory = ref(null);
  const selectedItem = ref(null);
  const selectedDepth = ref(null);
  const categories = ref(initialCategories);
  const items = ref([]);
  const depths = ref([]);

  // depth1 카테고리 변화 감지
  // 변화가 감지되면 watch가 실행되어 변화한 Category를 newCategory에 담고 updateOptions 함수 실행
  watch(selectedCategory, (newCategory) => {
    updateOptions(newCategory);
  });
  const updateOptions = (newCategory) => {
    items.value = optionsMap.test1[newCategory.value] || [];
    selectedItem.value = null; // 카테고리가 바뀔 때 선택된 항목 초기화
    selectedDepth.value = null;
  };

  watch(selectedItem, (newItem) => {
    if (selectedItem.value === null) {
      return;
    }
    updateDepths(newItem);
  });
  const updateDepths = (newItem) => {
    console.log(selectedCategory.value.value === "fruits");
    if (selectedCategory.value.value === "animals") {
      depths.value = optionsMap.test3.list || [];
    }
    if (selectedCategory.value.value === "fruits") {
      depths.value = optionsMap.test2.color || [];
    }
    selectedDepth.value = null;
  };

  return {
    selectedCategory,
    selectedItem,
    selectedDepth,
    categories,
    items,
    depths,
  };
}
