import { useLocalStorageStore } from "./utils";

export const initialSettings = {
	reviewTimeFormula: "(2 ** (box+2) ) * 1000",
};

export let settings = (() => {
	let store = useLocalStorageStore("settings", initialSettings);

	let reviewTimeFunc: (box: number) => number;

	store.subscribe((value) => {
		reviewTimeFunc = eval(`(box)=>${value.reviewTimeFormula}`);
	});

	return {
		...store,
		get reviewTimeFunc() {
			return reviewTimeFunc;
		},
		clear() {
			settings.set(initialSettings);
		},
	};
})();
