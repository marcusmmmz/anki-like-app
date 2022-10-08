import { browser } from "$app/environment";
import { liveQuery, type PromiseExtended } from "dexie";
import {
	derived,
	get,
	readable,
	writable,
	type Readable,
	type Updater,
} from "svelte/store";

export function useLiveQuery<T>(query: () => PromiseExtended<T>) {
	if (!browser) return readable<T | undefined>();

	const _liveQuery = liveQuery(() => query());

	// readable<T[]>([], (set)=>_liveQuery.subscribe(set).unsubscribe)

	return {
		subscribe(callback: (value: T | undefined) => any) {
			const { unsubscribe } = _liveQuery.subscribe(callback);

			return unsubscribe;
		},
	};
}

export function useDefaultStoreValue<T>(
	store: Readable<T>,
	_default: NonNullable<T>
) {
	return derived(store, (value, set) => set(value ?? _default), _default);
}

export function withGet<T extends any, Store extends Readable<T>>(
	store: Store
) {
	// TODO: make this better idk man just kill me already
	let value: Parameters<Parameters<Store["subscribe"]>[0]>[0] = get(store);
	return {
		...store,
		get() {
			return value;
		},
		get value() {
			return this.get();
		},
	};
}

export function useLocalStorageStore<Deserialized>(
	key: string,
	initialValue: Deserialized,
	serialize: (value: Deserialized) => string = JSON.stringify,
	deserialize: (value: string) => Deserialized = JSON.parse
) {
	if (!browser) return writable(initialValue);

	let serializedValue = localStorage.getItem(key);

	let store = writable(
		serializedValue == null ? initialValue : deserialize(serializedValue)
	);

	function save(value: Deserialized) {
		localStorage.setItem(key, serialize(value));
	}

	return {
		subscribe: store.subscribe,
		set(value: Deserialized) {
			store.set(value);
			save(value);
		},
		update(updater: Updater<Deserialized>) {
			store.update((value) => {
				save(value);
				return updater(value);
			});
		},
	};
}
