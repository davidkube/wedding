# Experimental animation research — 11 September 2026

This research follows the request to look in animation-focused YouTube and creative-coding circles before further design work. It is a shortlist for the next implementation pass, not a claim that the existing PR implements these effects.

## Sources and possible adaptations

| Creator / source | Specific reference | What makes it interesting | Wedding-site adaptation |
| --- | --- | --- | --- |
| Hyperplexed, YouTube | [Award Winning Animation With Only 20 Lines Of CSS?](https://www.youtube.com/watch?v=PkADl0HubMY), also [featured by Codrops](https://tympanus.net/codrops/collective/collective-742/) | A sliding image track recreated from Camille Mormal's site. | A film contact sheet guests can scrub through, with image movement inside the frames. Keep previous/next buttons and native vertical scrolling. |
| Kevin Powell, YouTube | [Incredible scroll-based animations with CSS-only](https://www.youtube.com/watch?v=UmzFk68Bwdk) | Scroll timelines and animation ranges turn scrolling into an animation playhead. | A staged invitation reveal whose type, borders and photograph share one progress timeline. Feature-detect CSS support and keep a static alternative. |
| Manoela Ilic, Codrops | [Stack to Content Layout Transition](https://tympanus.net/codrops/2022/05/11/stack-to-content-layout-transition/) | A compact image stack moves and enlarges into a content/gallery layout. The animation changes the composition. | A closed album that opens into a readable photograph and caption, then returns to the stack. This is substantially beyond the current deck's rotation and index change. |
| Yuri Artiukh, Codrops / creative WebGL community | [How to Unroll Images with Three.js](https://tympanus.net/codrops/2020/01/22/how-to-unroll-images-with-three-js/) | Vertex deformation interpolates between rolled geometry and a flat image; the article retains DOM images as progressive enhancement. | A single photographic print unrolling like paper. Reserve this for one signature moment; assess GPU cost and provide a regular image fallback. |
| Theo Plawinski, Codrops | [Sticky Grid Scroll demo](https://tympanus.net/Tutorials/StickyGridScroll/) | Progressively staged movement inside a sticky grid layout. | Turn a loose collection of prints into an ordered contact sheet, then release the page back into the story. |
| Codrops creative-coding community | [Creative Hub](https://tympanus.net/codrops/hub/) | A discovery index of source-linked experiments: layout transitions, shaders, image trails, typography and scroll scenes. | Use for focused experiments rather than layering unrelated effects across every section. |

## Recommendation

Prioritise a stack-to-open-album layout transition and a scrubbable contact sheet. They connect directly to the existing nostalgic photography and invite guests to interact. Prototype a paper-unroll effect separately before deciding whether its visual payoff warrants WebGL. Use coordinated typography as a supporting detail.

The current PR is only an initial foundation: the fan scene changes position and perspective, while the deck changes selection. It does not yet have a true layout morph, paper deformation, or a drag-driven filmstrip. The next pass should implement one of those mechanisms instead of adding more entrance animations.

## Verification gates for the next pass

- Touch: horizontal interaction must leave vertical scrolling available; every photograph remains reachable without dragging.
- Keyboard: visible controls, focus retention, Escape to close an expanded view, and announced active photo.
- Reduced motion: direct state changes and a readable static composition, without extended sticky dwell.
- Layout: 320px, 390px, tablet, desktop and short landscape screens; no clipped essential copy.
- Performance: measure real-device frame behaviour and image loading before choosing a shader effect.

## Evidence limits

Reviewed accessible creator pages, Codrops articles and indexed YouTube metadata. Direct fetches of the two YouTube watch pages failed; the videos have not been watched end-to-end in this research pass. Hyperplexed's specific video is independently linked and described by Codrops. No third-party tutorial code or imagery was copied. Adaptations and prioritisation above are design judgments, not claims made by the source authors.

## Implemented follow-up

The recommended stack-to-contact-sheet layout transformation and scrubbable
filmstrip are now implemented using the existing Motion dependency. The
filmstrip replaces the initial sticky fan. No WebGL unroll was added.
