<script setup>
import { ref, onMounted, watch } from 'vue';
import { getDocs } from 'firebase/firestore';
import { useRoute } from 'vue-router';
import { zipsQueries } from '../services/zipsReport.js';
import Documents from '../components/Documents.vue';

const zips = ref([]);
const title = ref('');
const shouldDisplayCount = ref(false);
const shouldDisplaySum = ref(false);
const route = useRoute();

async function fetchQuery(qryId) {
	const queryConfig = zipsQueries.find((q) => q.id === Number(qryId));

	if (!queryConfig) {
		console.error(`No query found for ID: ${qryId}`);
		title.value = 'Query not found';
		zips.value = [];
		return;
	}

	title.value = queryConfig.title;
	shouldDisplayCount.value = queryConfig.aggregate === 'count';
	shouldDisplaySum.value = queryConfig.aggregate?.startsWith('sum');

	const queryToRun = queryConfig.query;
	const querySnap = await getDocs(queryToRun);
	const results = [];

	querySnap.forEach((doc) => {
		const data = doc.data();
		data.id = doc.id;
		results.push(data);
	});

	zips.value = results;
}

watch(
	() => route.params.id,
	(newId) => {
		if (newId) fetchQuery(newId);
	}
);

onMounted(() => {
	fetchQuery(route.params.id);
});
</script>

<template>
	<div>
		<Documents
			:title="title"
			:data="zips"
		/>
		<div v-if="shouldDisplayCount">
			<p>Count: {{ zips.length }}</p>
		</div>
		<div v-if="shouldDisplaySum">
			<p>Total Population: {{ zips.reduce((sum, zip) => sum + zip.pop, 0) }}</p>
		</div>
	</div>
</template>
