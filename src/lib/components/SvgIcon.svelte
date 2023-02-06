<script lang="ts">
	import { paths } from './iconPaths';

	export let size = 40;
	export let color: string = '#EEE';
	export let icon: keyof typeof paths;
</script>

<svg viewBox="0 0 25 25" width={size} height={size} fill={color} on:click on:keypress>
	<path d={paths[icon]} />
</svg>
