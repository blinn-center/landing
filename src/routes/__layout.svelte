<script lang="ts">
	import {
		Content,
		Header,
		HeaderGlobalAction,
		HeaderUtilities,
		SideNav,
		SideNavItems,
		SideNavLink,
		SkipToContent,
		Theme
	} from 'carbon-components-svelte';
	import { MostlyCloudyNight } from 'carbon-icons-svelte';
	import 'carbon-components-svelte/css/all.css';
	import type { CarbonTheme } from 'carbon-components-svelte/types/Theme/Theme.svelte';

	let isSideNavOpen = false;
	let theme: CarbonTheme = 'g10';
	$: darkMode = theme === 'g100';

	function toggleDarkMode() {
		if (darkMode) {
			theme = 'g10';
		} else {
			theme = 'g100';
		}
	}
</script>

<svelte:head><title>Blinn Center</title></svelte:head>

<Theme bind:theme persist persistKey="__carbon-theme" />

<Header company="Blinn Center" platformName="Landing" persistentHamburgerMenu bind:isSideNavOpen>
	<svelte:fragment slot="skip-to-content">
		<SkipToContent />
	</svelte:fragment>
	<HeaderUtilities>
		<HeaderGlobalAction
			aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
			icon={MostlyCloudyNight}
			on:click={toggleDarkMode}
		/>
	</HeaderUtilities>
</Header>

<SideNav bind:isOpen={isSideNavOpen}>
	<SideNavItems>
		<SideNavLink href="/" text="Home" />
		<SideNavLink href="/about" text="About Blinn Center" />
		<SideNavLink href="/classfinder" text="Rapid Class Finder" />
	</SideNavItems>
</SideNav>

<Content>
	<slot />
</Content>
