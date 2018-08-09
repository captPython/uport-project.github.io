
uPort Developer Portal
============

## Deployed Markdown

|Name|Source|
| --|--|
|[Simple ID](https://github.com/uport-project/muport-core-js)|[feature/add-source-url-to-frontmatter ](https://github.com/uport-project/muport-core-js)|
|[Ethr DID Resolver](https://github.com/uport-project/ethr-did-resolver)|[develop e46f4b0978edeb1bb81a92e2e70bdbde8a8e242d](https://github.com/uport-project/ethr-did-resolver/tree/e46f4b0978edeb1bb81a92e2e70bdbde8a8e242d)|
|[Ethereum DID Registry](https://github.com/uport-project/ethr-did-registry)|[develop d5a4ea072cd21d0fbb7eef162fc10199587fa4a7](https://github.com/uport-project/ethr-did-registry/tree/d5a4ea072cd21d0fbb7eef162fc10199587fa4a7)|
|[Ethr DID Library](https://github.com/uport-project/ethr-did)|[develop 27ced502b76827961558a89175f8044ef69d2ab7](https://github.com/uport-project/ethr-did/tree/27ced502b76827961558a89175f8044ef69d2ab7)|
|[uPort Connect](https://github.com/uport-project/uport-connect)|[feature/update-docs-for-did-major ](https://github.com/uport-project/uport-connect)|
|[uPort Credentials](https://github.com/uport-project/uport-js)|[feature/did-doc-updates ](https://github.com/uport-project/uport-js)|
|[JWT](https://github.com/uport-project/did-jwt)|[develop 34732fa0f26696f65df099a2c18cc63e77c4e7f8](https://github.com/uport-project/did-jwt/tree/34732fa0f26696f65df099a2c18cc63e77c4e7f8)|
|[uPort Specs](https://github.com/uport-project/specs)|[develop eab1657d2d933a68e2082377356536011f7c2a48](https://github.com/uport-project/specs/tree/eab1657d2d933a68e2082377356536011f7c2a48)|
|[uPort Docs](https://github.com/uport-project/docs)|[feature/did-major-release ](https://github.com/uport-project/docs)|

## Get started

Check out the repository and from the root of the project:

1. `npm install`
1. Edit `repos.json` to list markdown sources
1. Edit `gulp/copy.js` to copy the desired folders from your remote repo to the `/content/public` folder
1. `npm run setup`
1. `npm run dev`

## Requirements

1. Node v10.1.0
1. NPM v6.0.1

### For deployment

1. Ngrok (for deployment steps)
1. AWS credentials to push to the appropriate buckets and invalidate CloudFront cache.
1. Permissions to push to the *master* branch.

There is a known issue with Node 10 and gulp https://github.com/gulpjs/gulp/issues/2162

Resolution:
```sh
rm -rf node_modules/
rm -rf package-lock.json
sudo npm install --unsafe-perm=true
```

### Commands

#### `npm run setup`

Run this command if you need to reset your workspace or have just cloned the repository for the first time.

Running this command will do the following:

1. Installs custom plugins contained in the `/plugins` folder.
1. Cleans the `/repos` folder.
1. Fetches markdown from remotes configured in `repos.json`.
1. Cleans the `/public` folder.
1. Copies cloned content from `/repos` to `/content/public`

#### `npm run copy:markdown`

Periodically it will be necessary to apply updates to the documentation markdown contained within the `/repos` folder.  When a local development instance of the site is running, this changes can be applied by running this command to copy the files from `/repos` to `/content/public`.

#### `npm run watch:repos`

This command watches the `/repos` folder for updates.  Any time an update happens it will run `copy:markdown`.  This enables live updates of markdown in development mode when combined with `npm run dev`.

#### `npm run update:remote:docs`

To pull in documentation updates from the remote repositories, run this command.  It does the following:

1. Fetches markdown from remotes configured in `repos.json`.
1. Copies cloned content from `/repos` to `/content/public`

#### `npm run dev`

Run this command to build and run a local instance of the developer docs at `http://localhost:8000`.  GraphQL queries can be inspected at `http://localhost:8000/___graphql`.  `npm run update:docs:local` and `update:docs:remote` can both be run while the site is running locally to apply apply updates from local or remote markdown sources.

#### `npm run serve`

This will serve the contents of the public folder using NGROK, so the site can be reviewed without deployment.  The site must be built using `npm run build` prior to attempting to run the serve command.

#### `npm run deploy:production`

This will build and deploy the website using Github pages for the production build.

#### `npm run deploy:development`

This will build the site and deploy it to developer.uport.space for review

#### `npm run deploy:legacy`

This will build the site and deploy it to our legacy S3 bucket to maintain a version snapshot of the developer site.

#### `npm run generate-readme`

Should be run any time the `readme-template.md` is updated.  This gets run automatically any time the site is built.

### Configuration

  - The git configuration for the project should use SSH vs. HTTPS to avoid having to type passwords when checking out the individual markdown repositories.

  Project configuration(s):

  1. Site `/data/SiteConfig.js`
  1. Styling `/src/layouts/theme.js`
  1. Content `/repos.json`
  1. GatsbyJS configuration `gatsby-config.js`


#### 1. Site configuration

The `SiteConfig.js` file contains properties that are used by the site generator at compile time.  It contains configuration options like setting a path-prefix, the site name, logo images, etc.

At a minimum the `siteUrl` and `pathPrefix` should be set.

Example SiteConfig and each properties explanation:

```js
module.exports = {
  siteTitle: "Simple and secure login for your Ethereum app",           // Site title.
  siteTitleAlt: "Uport ID makes blockchain easy on desktop and mobile", // Alternative site title for SEO.
  siteLogo: "/logos/uport-logo-purple@3x.png",                          // Logo used for SEO and manifest.
  siteUrl: "https://rekt.uport.space",                                  // Domain of your website without pathPrefix.
  pathPrefix: "/",                                                      // Prefixes all links. For cases when deployed to example.github.io/gatsby-advanced-starter/.
  siteDescription: "Uport ID makes blockchain easy on desktop and mobile", // Website description used for RSS feeds/meta description tag.
  siteRss: "/rss.xml",                                                  // Path to the RSS file.
  googleAnalyticsID: "UA-8xxxxx",                                       // GA tracking ID.
  userName: "uPort",                                                    // Username to display in the author segment.
  userTwitter: "uport_me",                                              // Optionally renders "Follow Me" in the UserInfo segment.
  userLocation: "Universe",                                             // User location to display in the author segment.
  userAvatar: "https://pbs.twimg.com/profile_images/932688008314109952/3_QkvZeQ_400x400.jpg", // User avatar to display in the author segment.
  userDescription: "Your ID.  For you.",                                // User description to display in the author segment.
  segmentProdKey: "",                                                   //Segment key for prod
  segmentDevKey: "",                                                    //Segment key for dev
  copyright: "Copyright © 2018",                                        // Copyright string for the footer of the website and RSS feed.
  themeColor: "#5c50ca",                                                // Used for setting manifest and progress theme colors.
  backgroundColor: "#e0e0e0",                                           // Used for setting manifest background color.
};

```


#### 2. Styling configuration

The `theme.js` file contains a couple attributes that are used to toggle CSS properties.  For convenience the theme styles are included, but others can be added as needed.


```js
const theme = {
  // named colors:
  brand: '#5c50ca',
  accent: '#ADD2EB',
  accentDark: "#35495E",
  lightGrey: '#F6F6F6',
  darkGrey: '#91a2a3',
  ink: 'black',
  errorRed: '#FF6666',
  codeEditBlue: '#2973b7',
  codeEditGreen: '#42b983',
  themedWhite: '#f5f2f0',
  // content width:
  contentWidthLaptop: '850px',
  sitePadding: "25px",

}

export default theme;
```

**Note:**
1. Code highlighting is done with PrismJS.  [Prism Themes](https://github.com/PrismJS/prism-themes) have been installed, and is utilized in `/src/layouts/index.jsx`
1. Our CSS is imported from weblow.
1. The only CSS file that should be modified directly is `src/layours/css/index.css`.  Use this to make changes to the defaults that are imported.


#### 3. Content configuration

Our content is stored in remote repositories which are configured in a file called `repos.json`.   In this file any repository that is configured will be cloned into the `/repos` folder.  For convenience this folder has been added to `.gitingore`.

Each repository listed can optionally pull from a specific branch.  Use this property to test out the documentation changes before they are  merged to develop/master.

Example repos.json:

```json
{
  "docs" : {
    "githubURL": "https://github.com/uport-project/docs.git",
    "branch": "move-docs-to-reference"
  },
  "specs" : {
    "githubURL": "https://github.com/uport-project/specs.git",
    "projectTitle": "uPort Specs",
    "branch": "update-specs-for-docs-site"
  }
}
```


#### 4. GatsbyJS Configuration

The `gatsby-config.js` file bootstraps all the plugins that are utilized by GatsbyJS to build the site.  Most of the options here are configured through `SiteConfig.js` and utilized within `gatsby-config.js`` at runtime.


#### Plugins

  There is a `/plugins` folder that contains custom code.  At this time the following custom plugins are:
  1. `gatsby-remark-copy-linked-files`
  1. `gatsby-remark-catch-relative-markdown-links`

##### `gatsby-remark-copy-linked-files`

This is a plugin provided by GatsbyJS.  It's purpose is to iterate over all markdown documents and copy any files/images that are linked to the `/public` folder.  It then re-writes the links within the markdown to point to the new file location. We have extended it to ignore relative links to markdown files otherwise the relative links would be broken.

It is configured within `gatsby-config.js` and now accepts a new option `ignoreRelativeMarkdownLinks`

```json
{
            resolve: "gatsby-remark-copy-linked-files",
            options: {
              ignoreRelativeMarkdownLinks: true
            }
},
```

##### `gatsby-remark-catch-relative-markdown-links`

This is a custom plugin that is used to re-write the relative links to markdown documents.  It detects if a link is a relative link and is a markdown document then updates the link to point to the new location within the `/public` folder.


#### Notes

There are a few things to take note of, or would be good to know while working with this repository.

##### `gatsby-node.js`

This is the brain of the site. It contains two functions, `createPages` and `onCreateNode`.

The former uses the output of `onCreateNode` to physically create the pages.

The later is used to apply updates to the page frontmatter that are used by GraphQL queries to build the site.  In this instance it sets the **slug** for each page.  Slugs are eventually used to create the static content at the location that the slug specifies during `createPages`.

##### `gatsby-config.js`

This contains configuration for several plugins used by gatsby.  Without this configuration `gatsby-node.js` will be unable to find the files and operate on them.


## Deployment

We deploy the github pages from the ``master`` branch.  That means we work off the `develop` branch and tag releases.

**ngrok is required**

### The deployment steps for uPort are:

**Always run `deploy:production` from a release tag.  Never from the develop branch**

1. Check out the latest release tag.
1. Run `npm run build`.  This will build a production-ready version of the site.
1. Run `npm run serve` to serve the site on a public DNS (ngrok) to test with.
1. Run `npm run deploy:development` to deploy the site to **developer.uport.space**.
1. Once ready, run `npm run deploy:production` to deploy the site to **developer.uport.me**.
1. Go to https://github.com/uport-project/docs-site/settings and update the custom domain to reflect our documentation home (developer.uport.me).

Manual deployment can be done.  Simply build the site and copy the output to its destination.

1. To build the site execute  `npm run build`.
1. Copy or push the contents of the `/public` folder to its intended destination or gh-pages branch

Depending on the deployment destination (S3, Netflify, **), this command can be modified.
