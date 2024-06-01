<template>
	<div class="category-user-pick">
		<div class="category-user-pick__title">
			Category
		</div>
	</div>
	<div class="row category-user-pick__list q-col-gutter-xs">
		<div v-for="category in filteringCategoryUser" :key="category.id" class="col-6 col-sm-4">
			<div
				class="category-user-pick__item"
				:class="{'category-user-pick__item_select': category.id === modelValue}"
				@click="modelValue = category.id"
			>
				<q-icon
					:name="category?.icon"
					:style="{ color: category?.color }"
					size="16px"
				/>
				<p class="category-user-pick__item-title">
					{{ category.name }}
				</p>
			</div>
		</div>
		<div v-if="!showAllCategories && hiddenBtnShowAllCategories" @click="toggleAllCategoriesModal" class="col-6 col-sm-4">
			<div class="category-user-pick__item category-user-pick__item-btn">
				<q-icon
					name="more_horiz"
					size="32px"
				/>
			</div>
		</div>
	</div>
	<CategoryUserPickModal
		v-model:category-id="modelValue"
		v-model:dialog="openAllCategoriesModal"
		:kind="props.kind"
	/>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useOperationStore } from 'src/stores/operation';
const operationStore = useOperationStore();
import { useQuasar } from 'quasar'
import CategoryUserPickModal from 'components/CategoryUser/CategoryUserPickModal.vue';

const modelValue = defineModel()
const props = withDefaults(defineProps<{
	kind: number,
	showAllCategories?: boolean
}>(), {
	showAllCategories: false
})

const openAllCategoriesModal = ref(false)

const toggleAllCategoriesModal = () => {
	openAllCategoriesModal.value = !openAllCategoriesModal.value
}

const $q = useQuasar()

const filteringCategoryUser = computed(() => {
	const filteredCategories = operationStore.categoryUser?.filter(c => c.kind === Number(props.kind)) || [];

	return props.showAllCategories ? filteredCategories : filteredCategories.slice(0, $q.screen.lt.sm ? 7 : 8);
})

const hiddenBtnShowAllCategories = computed(() => {
	const filteredCategories = operationStore.categoryUser?.filter(c => c.kind === Number(props.kind)) || [];

	return filteredCategories.length > ($q.screen.lt.sm ? 7 : 8)
})


</script>


<style lang="scss" scoped>
body.body--dark {
	.category-user-pick {
		max-height: 60vh;
		overflow-y: auto;
		&__title {
			margin-bottom: 10px;
		}
		&__list {
			margin-bottom: 20px;
		}
		&__item {
			background: $dark-field-bg;
			border-radius: 10px;
			text-align: center;
			padding: 10px;
			overflow: hidden;
			&:hover {
				cursor: pointer;
				background: $dark-accent;
			}
			&_select {
				background-color: $gray;
				&:hover {
					cursor: pointer;
					background: $gray;
				}
			}
			&-title {
				font-size: 14px;
				white-space: nowrap;
				text-overflow: ellipsis;
				overflow: hidden;
			}
			&-btn {
				width: 100%;
				height: 100%;
				display: flex;
				align-items: center;
				justify-content: center;
			}
		}
	}
}
</style>