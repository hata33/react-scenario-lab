"use client";

import { useCallback, useEffect, useState } from "react";

// Activity options interface
interface ActivityOptions<T = any> {
	serializer?: (value: T) => string;
	deserializer?: (value: string) => T;
	debounce?: number;
	maxSize?: number;
	compression?: boolean;
}

// Fictional hook for React 19 Activity API demonstration
export function useActivity<T>(key: string, initialValue: T, options?: ActivityOptions<T>) {
	const [state, setState] = useState<T>(() => {
		try {
			const item = window.localStorage.getItem(`activity-${key}`);
			if (!item) return initialValue;

			const { data } = JSON.parse(item);
			return options?.deserializer ? options.deserializer(data) : data;
		} catch (error) {
			console.error(`Error loading activity state for key: ${key}`, error);
			return initialValue;
		}
	});

	const [isSyncing, setIsSyncing] = useState(false);
	const [lastSync, setLastSync] = useState<Date | null>(null);

	const updateState = useCallback(
		(newValue: T | ((prev: T) => T)) => {
			setState((prev) => {
				const finalValue = typeof newValue === "function" ? (newValue as (prev: T) => T)(prev) : newValue;

				// Handle debounce
				if (options?.debounce) {
					setTimeout(() => {
						saveState(finalValue);
					}, options.debounce);
				} else {
					saveState(finalValue);
				}

				return finalValue;
			});
		},
		[key, options],
	);

	const saveState = useCallback(
		(value: T) => {
			setIsSyncing(true);
			try {
				const serializedValue = options?.serializer ? options.serializer(value) : JSON.stringify(value);
				const storageValue = JSON.stringify({
					data: serializedValue,
					timestamp: new Date().toISOString(),
				});

				// Check size limit
				if (options?.maxSize && storageValue.length > options.maxSize) {
					throw new Error(`Storage size limit exceeded for key: ${key}`);
				}

				window.localStorage.setItem(`activity-${key}`, storageValue);
				setLastSync(new Date());
			} catch (error) {
				console.error(`Error saving activity state for key: ${key}`, error);
			} finally {
				setIsSyncing(false);
			}
		},
		[key, options],
	);

	const clearState = useCallback(() => {
		setState(initialValue);
		try {
			window.localStorage.removeItem(`activity-${key}`);
			setLastSync(null);
		} catch (error) {
			console.error(`Error clearing activity state for key: ${key}`, error);
		}
	}, [key, initialValue]);

	// Cross-tab synchronization
	useEffect(() => {
		const handleStorageChange = (e: StorageEvent) => {
			if (e.key === `activity-${key}` && e.newValue) {
				try {
					const { data } = JSON.parse(e.newValue);
					setState(options?.deserializer ? options.deserializer(data) : data);
					setLastSync(new Date());
				} catch (error) {
					console.error(`Error syncing activity state for key: ${key}`, error);
				}
			}
		};

		window.addEventListener("storage", handleStorageChange);
		return () => window.removeEventListener("storage", handleStorageChange);
	}, [key, options]);

	return {
		state,
		setState: updateState,
		saveState,
		clearState,
		isSyncing,
		lastSync,
	} as const;
}
