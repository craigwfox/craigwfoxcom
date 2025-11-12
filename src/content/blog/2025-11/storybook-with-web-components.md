---
tags:
  - post
  - inprogress
categories:
  - web components
  - lit
  - storybook
postSlug: storybook-with-web-components
pubDate: 2025-11-30
added: Nov 08 2025
title: Getting started with Storybook and Web Components
description: ""
image: images/twitter/
ogImage: images/twitter/
ogImageAlt: ""
---

At my day job we are in the early stages of creating a design token and component system. May primary part of this is setting up the initial token css/custom props and implementing [Storybook](https://storybook.js.org/) using [Web components](https://developer.mozilla.org/en-US/docs/Web/API/Web_components) with [Lit](https://lit.dev/). This is has mostly gone pretty smoothly up and is decently documented. The part that I want to talk a bit more about is getting the components out of storybook and published to an NPM package.

## Outline

1. [[storybook-with-web-components#Setting up Storybook| Setting up Storybook]]
2. [[storybook-with-web-components#Building the NPM package | Building the NPM package]]
3. [[storybook-with-web-components#What we should end up with | What we should end up with]]
4. [[storybook-with-web-components#Publishing to NPM | Publishing to NPM]]

## Getting started

Before we get started you will need to do a few things:

1. Install [node/npm](https://nodejs.org/en/download) and [pnpm](https://pnpm.io/installation) (using pnpm to handle the monorepo)
2. Setup an account with NPM to publish <sup>1</sup>

### Now let's setup some base files.

1. Initialize the top level package `pnpm init` (make sure to set the type to module, if it doesn't default to it).
2. Next we need to create work space file `touch` pnpm-workspace.yaml<sup>2</sup>.
3. Inside the workspace file you need to add / exclude the package and storybook directories

```json
packages:
	- "packages/*"
	- "storybook/**"
```

4. You should end up with a directory structure similar to below.
<ul>
	<li>
		<details>
			<summary>packages</summary>
		</details>
	</li>
	<li>
		<details>
			<summary>storybook</summary>
		</details>
	</li>
	<li>package.json</li>
	<li>pnpm-workspace.yaml</li>
</ul>

---

## Setting up Storybook

Now that we have the base structure setup let's install [storybook](https://storybook.js.org/docs/get-started/install).

1. `cd storybook`
2. `pnpm create storybook@latest`
3. I like to do some clean up and modifications to the sources directory
   1. Create a components directory
   2. Move the button.ts / button.css to the components in a button directory
   3. Remove everything else from the stories other than the Button.stories.ts

You should end up with something like below:

<ul>
	<li>...</li>
	<li>
		<details open>
			<summary>Storybook</summary>
			<ul>
				<li>
					<details>
						<summary>.storybook</src>
						...
					</details>
				</li>
				<li>index.html</li>
				<li>
					<details>
						<summary>node_modules</src>
						...
					</details>
				</li>
				<li>package.json</li>
				<li>
					<details open>
						<summary>src</src>
						<ul>
							<li>
								<details open>
									<summary>components</src>
									<ul>
										<li>
											<details open>
												<summary>button</src>
												<ul>
													<li>button.css</li>
													<li>Button.ts</li>
												</ul>
											</details>
										</li>
									</ul>
								</details>
							</li>
							<li>
								<details open>
									<summary>stories</src>
									<ul>
										<li>Button.stories.ts</li>
									</ul>
								</details>
							</li>
						</ul>
					</details>
				</li>
				<li>tsconfig.json</li>
			</ul>
		</details>
	</li>
	<li>...</li>
</ul>

## Building the NPM package

To get started let's we will need to setup the package.json and the files to build out / export the web components for use by other projects.

1. `cd package`
2. `pnpm init`
3. Install the dependencies
	1. `pnpm i lit --save` (we want this to be dependency for other projects)
	2. `pnpm i vite typescript -save-dev` (these are just for use building the dist files)
4. 


## What we should end up with

After all of this we should end up with an overall structure similar to this.

<ul>
	<li>node_modules</li>
	<li>
		<details>
			<summary>package</summary>
			<ul>
				<li>dist</li>
				<li>index.ts</li>
				<li>package.json</li>
				<li>vite.config.ts</li>
			</ul>
		</details>
	</li>
	<li>
		<details open>
			<summary>Storybook</summary>
			<ul>
				<li>
					<details>
						<summary>.storybook</src>
						...
					</details>
				</li>
				<li>index.html</li>
				<li>
					<details>
						<summary>node_modules</src>
						...
					</details>
				</li>
				<li>package.json</li>
				<li>
					<details open>
						<summary>src</src>
						<ul>
							<li>
								<details open>
									<summary>components</src>
									<ul>
										<li>
											<details open>
												<summary>button</src>
												<ul>
													<li>button.css</li>
													<li>Button.ts</li>
												</ul>
											</details>
										</li>
									</ul>
								</details>
							</li>
							<li>
								<details open>
									<summary>stories</src>
									<ul>
										<li>Button.stories.ts</li>
									</ul>
								</details>
							</li>
						</ul>
					</details>
				</li>
				<li>tsconfig.json</li>
			</ul>
		</details>
	</li>
	<li>.gitignore</li>
	<li>package.json</li>
	<li>pnpm-lock.yaml</li>
	<li>pnpm-workspace.yaml</li>
</ul>

## Publishing to NPM

## Footnotes

1. You can also use Github and other services. For our work system we deploy it privately on Github only within our organization.
2. This could differ a bit if you either don't want to use a monorepo or want to use something other than pnpm.
