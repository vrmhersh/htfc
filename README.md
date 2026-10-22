# History for the Curious: how to update the website

Everything you will want to change is in the folder `src/content`. Open the file on GitHub, click the pencil icon, edit, then **Commit changes**. The site updates in about a minute.

| To change | Open this file |
|---|---|
| Add, edit, remove or reorder TOURS | `src/content/tours.js` |
| Testimonials | `src/content/testimonials.js` |
| Articles and musings | `src/content/writings.js` (upload the file to `public/docs` first) |
| Podcast links, lectures | `src/content/podcast.js` |
| Phone, email, WhatsApp, About text, slideshow | `src/content/site.js` |

## Adding a new tour
Open `src/content/tours.js`, copy one whole block from `{` to `},` and paste it underneath. Change the title, `start` and `end` dates (year-month-day), and `status`. That's it:
- Tours sort themselves by date, so there is no manual ordering.
- Once the end date passes, a tour moves to "Past tours" automatically.
- `status` can be "open", "soldout", "private" or "waitlist".
- Add `details: ["paragraph one", "paragraph two"]` to give the tour its own page.
- To hide a tour, add `hidden: true,`

Be careful to keep the commas and quote marks. If a mistake breaks the build, Vercel keeps the old site live and shows the error under Deployments.

## Before moving the domain
Photos currently load from the old website. Download them first, otherwise they disappear when the old site goes. Documents in `public/docs` must be downloaded too (they keep the same web addresses).
