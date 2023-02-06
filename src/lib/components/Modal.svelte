<script lang="ts">
	import IconButton from '$lib/components/IconButton.svelte';
	import { fade } from 'svelte/transition';

	export let title = 'Dialog Title';
	export let isOpen = false;
	export let onClose: (() => void) | null = null;

	const open = () => (isOpen = true);
	const close = () => {
		isOpen = false;
		if (onClose != null) onClose();
	};

	function keyDown(e: KeyboardEvent) {
		if (e.key === 'Escape') close();
	}
</script>

<div on:click={open} on:keypress={() => {}}>
	<slot name="trigger" />
</div>

{#if isOpen}
	<div class="modal" on:keydown={keyDown} transition:fade={{ duration: 200 }}>
		<div class="backdrop">
			<div class="content-wrapper">
				<div class="header">
					<h2>{title}</h2>
					<IconButton icon="close" color="#DDDDDDBB" size={22} on:click={close} />
				</div>
				<div class="content">
					<slot name="content" />
				</div>
				<slot name="footer" {close}>
					<div />
				</slot>
			</div>
		</div>
	</div>
{/if}

<style>
	.modal {
		position: fixed;
		top: 0;
		left: 0;
		width: 100vw;
		height: 100vh;

		display: flex;
		justify-content: center;
		align-items: center;
	}
	.backdrop {
		position: absolute;
		width: 100%;
		height: 100%;
		background-color: rgba(0, 0, 0, 0.4);
	}
	.content-wrapper {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		z-index: 10;
		max-width: 70vw;
		border-radius: 0.3rem;
		background-color: var(--background-paper);
		overflow: visible;
		padding: 16px 24px;
	}
	.header {
		display: flex;
		justify-content: space-between;
		margin-bottom: 24px;
	}
	h2 {
		font-size: 1.2rem;
		font-weight: 500;
		margin: 14px 0;
	}
	.content {
		max-height: 50vh;
		overflow: visible;
	}
</style>
