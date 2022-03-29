<script lang="ts">
	export let label: string;
	export let checked: boolean;
</script>

<label class="container">
	{label}
	<input type="checkbox" bind:checked on:click />
	<span class="checkmark" />
</label>

<style>
	.container {
		width: 100px;
		position: relative;
		padding-top: 5px;
		padding-left: 38px;
		margin-bottom: 12px;
		margin-top: 8px;
		cursor: pointer;
		user-select: none;
		color: #ccc;
	}
	/* Hide the browser's default checkbox */
	input {
		position: absolute;
		opacity: 0;
		cursor: pointer;
		height: 0;
		width: 0;
	}
	/* The custom checkbox */
	.checkmark {
		position: absolute;
		top: 0;
		left: 0;
		height: 25px;
		width: 25px;
		border: 1.5px solid var(--text-secondary);
		border-radius: 8px;
	}
	.container:hover .checkmark {
		height: 23px;
		width: 23px;
		border: 3px solid var(--text-secondary);
	}
	.container input:checked ~ .checkmark {
		border-color: var(--primary-main);
	}
	.container input:checked ~ .checkmark:after {
		left: 8px;
		top: 3px;
	}
	.checkmark:after {
		content: '';
		position: absolute;
		display: none;
	}
	.container input:checked ~ .checkmark:after {
		display: block;
	}
	.container .checkmark:after {
		left: 9px;
		top: 3px;
		width: 5px;
		height: 10px;
		border: solid var(--primary-main);
		border-width: 0 3px 3px 0;
		transform: rotate(45deg);
	}
</style>
