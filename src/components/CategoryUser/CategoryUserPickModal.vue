<template>
	<q-dialog v-model="dialog" persistent class="category-user-pick-modal">
		<q-card class="card-dialog">
			<q-card-section>
				<CategoryUserPick v-model="categoryId" :kind="props.kind" show-all-categories />
			</q-card-section>
			<q-card-section class="flex justify-end">
				<q-btn
					label="Cancel"
					flat
					color="primary"
					@click="dialog = false"
				/>
			</q-card-section>
		</q-card>
	</q-dialog>
</template>


<script setup lang="ts">
import CategoryUserPick from 'components/CategoryUser/CategoryUserPick.vue';

const dialog = defineModel<boolean>('dialog')
const categoryId = defineModel('categoryId')
const props = defineProps(['kind'])

</script>

<style lang="scss" scoped>
.category-user-pick-modal {
	&__btn {
		width: 100%;
	}
}
</style>