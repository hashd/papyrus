## Papyrus
This project tries to replicate Bret Victor's dynamic visualization tool using TypeScript, Angular 2, RxJS. JSPM is used for bundling the app and sources are written in ts, html, sass.

### Premise
The tool tries to incorporate the core features presented by Bret Victor in his [talk](https://vimeo.com/66085662). While we have more ideas around it, the focus is currently to get the tool up and running for people to experiment with and use feedback to transform the tool as necessary.

### Demo
Check it out [here](https://hashd.github.io/papyrus/public).

The project is under active development at [Imaginea Labs](http://www.imaginea.com/labs) and the demo will be updated with features as and when they are ready.

### Features available and showcased in Demo
- Draw basic shapes like Line, Rect, Circle with Static values
- Draw pictures inside other pictures. Its even possible to draw one inside itself, recursively
- Live preview in pictures panel

### Features under development
Features have been divided into two categories: Core and Advanced.

#### Core
These features are marked mandatory for the MVP of Papyrus

- Draw more advanced shapes like Path
- Bind properties to variables and expressions and react to changes
- Flow commands which provide programming constructs to loop and conditionally express logical flow
- Ability to export magnets from picture
- Ability to snap shapes/pictures to Magnets
- Ability to select and manipulate shapes/pictures using move, scale, rotate operations
- Ability to group shapes/pictures into groups and work on them as a single entity
- Ability to export picture as a reusable JavaScript function, which can be used to create the same picture in web pages

#### Advanced
These features will be targeted after the MVP is ready

- Ability to debug steps by moving through them 1 at a time and other things to aide users while creating pictures
- Ability to save pictures for a user
- Ability to share pictures and use pictures created by others

### Want to contribute
Check our [developer guide](docs/development.md) to get started. PRs are very much welcome and appreciated.

If you would like to contribute, you can get in touch with me at kiran.d@imaginea.com

### Other related work
- [Apparatus](http://aprt.us)
- [Lyra](http://idl.cs.washington.edu/projects/lyra)
