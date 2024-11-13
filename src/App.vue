<script setup>
import { RouterLink, RouterView } from 'vue-router';
import { zipsQueries } from './services/zipsReport.js';

const reportLinks = zipsQueries.map(({ id, title }) => ({ id, title }));
</script>

<template>
	<div id="header">
		<h2>Reports</h2>
		<nav>
			<RouterLink
				v-for="link in reportLinks"
				:key="link.id"
				:to="`/query/${link.id}`"
			>
				{{ link.id }}. {{ link.title }}
			</RouterLink>
		</nav>
	</div>
	<div id="detail">
		<RouterView />
	</div>
</template>

<style scoped>
a {
  display: block;
}
</style>
