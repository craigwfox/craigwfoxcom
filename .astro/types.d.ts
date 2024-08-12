declare module 'astro:content' {
	interface Render {
		'.mdx': Promise<{
			Content: import('astro').MarkdownInstance<{}>['Content'];
			headings: import('astro').MarkdownHeading[];
			remarkPluginFrontmatter: Record<string, any>;
		}>;
	}
}

declare module 'astro:content' {
	interface Render {
		'.md': Promise<{
			Content: import('astro').MarkdownInstance<{}>['Content'];
			headings: import('astro').MarkdownHeading[];
			remarkPluginFrontmatter: Record<string, any>;
		}>;
	}
}

declare module 'astro:content' {
	type Flatten<T> = T extends { [K: string]: infer U } ? U : never;

	export type CollectionKey = keyof AnyEntryMap;
	export type CollectionEntry<C extends CollectionKey> = Flatten<AnyEntryMap[C]>;

	export type ContentCollectionKey = keyof ContentEntryMap;
	export type DataCollectionKey = keyof DataEntryMap;

	type AllValuesOf<T> = T extends any ? T[keyof T] : never;
	type ValidContentEntrySlug<C extends keyof ContentEntryMap> = AllValuesOf<
		ContentEntryMap[C]
	>['slug'];

	export function getEntryBySlug<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {}),
	>(
		collection: C,
		// Note that this has to accept a regular string too, for SSR
		entrySlug: E
	): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;

	export function getDataEntryById<C extends keyof DataEntryMap, E extends keyof DataEntryMap[C]>(
		collection: C,
		entryId: E
	): Promise<CollectionEntry<C>>;

	export function getCollection<C extends keyof AnyEntryMap, E extends CollectionEntry<C>>(
		collection: C,
		filter?: (entry: CollectionEntry<C>) => entry is E
	): Promise<E[]>;
	export function getCollection<C extends keyof AnyEntryMap>(
		collection: C,
		filter?: (entry: CollectionEntry<C>) => unknown
	): Promise<CollectionEntry<C>[]>;

	export function getEntry<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {}),
	>(entry: {
		collection: C;
		slug: E;
	}): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof DataEntryMap,
		E extends keyof DataEntryMap[C] | (string & {}),
	>(entry: {
		collection: C;
		id: E;
	}): E extends keyof DataEntryMap[C]
		? Promise<DataEntryMap[C][E]>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {}),
	>(
		collection: C,
		slug: E
	): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof DataEntryMap,
		E extends keyof DataEntryMap[C] | (string & {}),
	>(
		collection: C,
		id: E
	): E extends keyof DataEntryMap[C]
		? Promise<DataEntryMap[C][E]>
		: Promise<CollectionEntry<C> | undefined>;

	/** Resolve an array of entry references from the same collection */
	export function getEntries<C extends keyof ContentEntryMap>(
		entries: {
			collection: C;
			slug: ValidContentEntrySlug<C>;
		}[]
	): Promise<CollectionEntry<C>[]>;
	export function getEntries<C extends keyof DataEntryMap>(
		entries: {
			collection: C;
			id: keyof DataEntryMap[C];
		}[]
	): Promise<CollectionEntry<C>[]>;

	export function reference<C extends keyof AnyEntryMap>(
		collection: C
	): import('astro/zod').ZodEffects<
		import('astro/zod').ZodString,
		C extends keyof ContentEntryMap
			? {
					collection: C;
					slug: ValidContentEntrySlug<C>;
				}
			: {
					collection: C;
					id: keyof DataEntryMap[C];
				}
	>;
	// Allow generic `string` to avoid excessive type errors in the config
	// if `dev` is not running to update as you edit.
	// Invalid collection names will be caught at build time.
	export function reference<C extends string>(
		collection: C
	): import('astro/zod').ZodEffects<import('astro/zod').ZodString, never>;

	type ReturnTypeOrOriginal<T> = T extends (...args: any[]) => infer R ? R : T;
	type InferEntrySchema<C extends keyof AnyEntryMap> = import('astro/zod').infer<
		ReturnTypeOrOriginal<Required<ContentConfig['collections'][C]>['schema']>
	>;

	type ContentEntryMap = {
		"blog": {
"2021-11/methods-for-equal-height-columns.md": {
	id: "2021-11/methods-for-equal-height-columns.md";
  slug: "2021-11/methods-for-equal-height-columns";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"2021-11/versions-of-craigwfox-com.mdx": {
	id: "2021-11/versions-of-craigwfox-com.mdx";
  slug: "2021-11/versions-of-craigwfox-com";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"2022-02/responsive-video-embeds.md": {
	id: "2022-02/responsive-video-embeds.md";
  slug: "2022-02/responsive-video-embeds";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"2022-03/theme-toggle-web-component.md": {
	id: "2022-03/theme-toggle-web-component.md";
  slug: "2022-03/theme-toggle-web-component";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"2022-05/fluid-type-and-sizing.mdx": {
	id: "2022-05/fluid-type-and-sizing.mdx";
  slug: "2022-05/fluid-type-and-sizing";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"2022-08/where-is-and-has.mdx": {
	id: "2022-08/where-is-and-has.mdx";
  slug: "2022-08/where-is-and-has";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"2022-11/using-aspect-ratio.mdx": {
	id: "2022-11/using-aspect-ratio.mdx";
  slug: "2022-11/using-aspect-ratio";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"2023-01/css-auto-grid-columns.md": {
	id: "2023-01/css-auto-grid-columns.md";
  slug: "2023-01/css-auto-grid-columns";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"2023-12/css-cascade-layers-and-important.md": {
	id: "2023-12/css-cascade-layers-and-important.md";
  slug: "2023-12/css-cascade-layers-and-important";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"2024-02/blogging-about-my-hobbies.mdx": {
	id: "2024-02/blogging-about-my-hobbies.mdx";
  slug: "2024-02/blogging-about-my-hobbies";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
};
"hiking": {
"2024-03-29/nebo-rim-trail.mdx": {
	id: "2024-03-29/nebo-rim-trail.mdx";
  slug: "2024-03-29/nebo-rim-trail";
  body: string;
  collection: "hiking";
  data: InferEntrySchema<"hiking">
} & { render(): Render[".mdx"] };
"2024-04-13/petit-jean-seven-hollows.mdx": {
	id: "2024-04-13/petit-jean-seven-hollows.mdx";
  slug: "2024-04-13/petit-jean-seven-hollows";
  body: string;
  collection: "hiking";
  data: InferEntrySchema<"hiking">
} & { render(): Render[".mdx"] };
"2024-04-21/nebo-bench-road-trail.mdx": {
	id: "2024-04-21/nebo-bench-road-trail.mdx";
  slug: "2024-04-21/nebo-bench-road-trail";
  body: string;
  collection: "hiking";
  data: InferEntrySchema<"hiking">
} & { render(): Render[".mdx"] };
"2024-05-10/petit-jean-seven-hollows.mdx": {
	id: "2024-05-10/petit-jean-seven-hollows.mdx";
  slug: "2024-05-10/petit-jean-seven-hollows";
  body: string;
  collection: "hiking";
  data: InferEntrySchema<"hiking">
} & { render(): Render[".mdx"] };
"2024-08-10/nebo-rim-trail.mdx": {
	id: "2024-08-10/nebo-rim-trail.mdx";
  slug: "2024-08-10/nebo-rim-trail";
  body: string;
  collection: "hiking";
  data: InferEntrySchema<"hiking">
} & { render(): Render[".mdx"] };
};

	};

	type DataEntryMap = {
		
	};

	type AnyEntryMap = ContentEntryMap & DataEntryMap;

	export type ContentConfig = typeof import("../src/content/config.js");
}
