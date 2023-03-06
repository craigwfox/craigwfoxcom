declare module 'astro:content' {
	export { z } from 'astro/zod';
	export type CollectionEntry<C extends keyof typeof entryMap> =
		(typeof entryMap)[C][keyof (typeof entryMap)[C]] & Render;

	type BaseSchemaWithoutEffects =
		| import('astro/zod').AnyZodObject
		| import('astro/zod').ZodUnion<import('astro/zod').AnyZodObject[]>
		| import('astro/zod').ZodDiscriminatedUnion<string, import('astro/zod').AnyZodObject[]>
		| import('astro/zod').ZodIntersection<
				import('astro/zod').AnyZodObject,
				import('astro/zod').AnyZodObject
		  >;

	type BaseSchema =
		| BaseSchemaWithoutEffects
		| import('astro/zod').ZodEffects<BaseSchemaWithoutEffects>;

	type BaseCollectionConfig<S extends BaseSchema> = {
		schema?: S;
		slug?: (entry: {
			id: CollectionEntry<keyof typeof entryMap>['id'];
			defaultSlug: string;
			collection: string;
			body: string;
			data: import('astro/zod').infer<S>;
		}) => string | Promise<string>;
	};
	export function defineCollection<S extends BaseSchema>(
		input: BaseCollectionConfig<S>
	): BaseCollectionConfig<S>;

	type EntryMapKeys = keyof typeof entryMap;
	type AllValuesOf<T> = T extends any ? T[keyof T] : never;
	type ValidEntrySlug<C extends EntryMapKeys> = AllValuesOf<(typeof entryMap)[C]>['slug'];

	export function getEntryBySlug<
		C extends keyof typeof entryMap,
		E extends ValidEntrySlug<C> | (string & {})
	>(
		collection: C,
		// Note that this has to accept a regular string too, for SSR
		entrySlug: E
	): E extends ValidEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;
	export function getCollection<C extends keyof typeof entryMap, E extends CollectionEntry<C>>(
		collection: C,
		filter?: (entry: CollectionEntry<C>) => entry is E
	): Promise<E[]>;
	export function getCollection<C extends keyof typeof entryMap>(
		collection: C,
		filter?: (entry: CollectionEntry<C>) => unknown
	): Promise<CollectionEntry<C>[]>;

	type InferEntrySchema<C extends keyof typeof entryMap> = import('astro/zod').infer<
		Required<ContentConfig['collections'][C]>['schema']
	>;

	type Render = {
		render(): Promise<{
			Content: import('astro').MarkdownInstance<{}>['Content'];
			headings: import('astro').MarkdownHeading[];
			remarkPluginFrontmatter: Record<string, any>;
		}>;
	};

	const entryMap: {
		"blog": {
"2021-11-25-post-versions-of-craigwfoxcom.md": {
  id: "2021-11-25-post-versions-of-craigwfoxcom.md",
  slug: "2021-11-25-post-versions-of-craigwfoxcom",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2021-11-28-post-equal-height-cols.md": {
  id: "2021-11-28-post-equal-height-cols.md",
  slug: "2021-11-28-post-equal-height-cols",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2022-02-07-post-responsive-videos.md": {
  id: "2022-02-07-post-responsive-videos.md",
  slug: "2022-02-07-post-responsive-videos",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2022-03-07-theme-toggle-web-component.md": {
  id: "2022-03-07-theme-toggle-web-component.md",
  slug: "2022-03-07-theme-toggle-web-component",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2022-05-13-fluid-type-sizing.md": {
  id: "2022-05-13-fluid-type-sizing.md",
  slug: "2022-05-13-fluid-type-sizing",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2022-08-02-where-is-has.md": {
  id: "2022-08-02-where-is-has.md",
  slug: "2022-08-02-where-is-has",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2022-11-03-aspect-ratio.md": {
  id: "2022-11-03-aspect-ratio.md",
  slug: "2022-11-03-aspect-ratio",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2023-01-10-css-auto-grid-columns.md": {
  id: "2023-01-10-css-auto-grid-columns.md",
  slug: "2023-01-10-css-auto-grid-columns",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
},

	};

	type ContentConfig = typeof import("../src/content/config");
}
