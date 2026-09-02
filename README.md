# Custom Ghost theme for Notes on the Crises
Theme developed and customized by Marley Wallace. Based on Noise theme by Theme Up Studios.

# Requirements
Ghost 5.x or higher

# Getting started
This is a custom theme. By default Ghost installs 'Source' theme. You can upload this theme to change the overall look of your Ghost publication.
We've [documented](https://www.themeupstudio.com/docs/noise-docs) this theme pretty heavily so that it should be fairly easy for you to use this theme.
If you are using [Ghost Pro](https://openurl.dev/ghost) for your managed hosting, then ensure you have CREATOR plan or above to upload custom themes.

**The main files are:**
- `default.hbs` - The main template file which links and imports all scripts, fonts and stylesheets
- `index.hbs` - Used for the home page
- `post.hbs` - Used for individual posts
- `page.hbs` - Used for individual pages
- `tag.hbs` - Used for tag archives
- `tags.hbs` - Used for Tags page which will list all tags
- `author.hbs` - Used for author archives
- `authors.hbs` - Used for Authors page which will list all authors
- `articles.hbs` - Used to show all posts
- `featured.hbs` - Used to show all Featured posts
- `members.hbs` - Used to show all Members-only posts
- `error.hbs` - Used to show the error page. This single template will be used for all error codes like 4XX, 5XX, etc. Error code and Error message will be dynamically displayed on the page. A link to the homepage will also be displayed.

# Changelog
- v1.0.0 - Initial release
- v1.0.2 - Bug fixes
- v1.0.3 - Support for custom fonts in Ghost
- v1.0.4 - Support for multiple social profiles for staff
- v1.0.5 - Added Featured Section and bug fix to show author socials in post
