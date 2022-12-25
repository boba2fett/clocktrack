import App from './App.svelte';
import type { Predefined, UrlRule } from './global';

const app = new App({
	target: document.body,
	props: {}
});

export default app;

export const predefineds: Predefined[] = [
	{
		name: "jira",
		regex: ".*/browse/([^/\?]+).*"
	},
	{
		name: "salesforce",
		regex: ".*/Case/([^/\?]+).*"
	},
	{
		name: "stackoverflow",
		regex: ".*/questions/([^/\?]+).*"
	},
];

export const defaultUrlRule: UrlRule[] = [
	{
		type: "DL21-05299",
		baseUri: "https://jira.d-velop.de",
		regex: ".*/browse/([^/\?]+).*"
	},
	{
		type: "DL21-05301",
		baseUri: "https://dvelop.lightning.force.com/",
		regex: ".*/Case/([^/\?]+).*"
	}
];