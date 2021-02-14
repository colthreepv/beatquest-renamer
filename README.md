beatquest-renamer
==================

This simple command-line app converts your PC [BeatSaber](beatsaber) `CustomLevels`
folder names to a [BMBF](BMBF)-compatible folder names **WITHOUT REDOWNLOADING THEM**.

Example:
`10800 (Nyan Cat (Piano) - COCOAGALAXY)` becomes `custom_level_ec005abf6cffd5fe9f7c086361521475232442f5`

[beatsaber]: https://www.beatsaber.com/
[BMBF]: https://bmbf.dev/stable

# Expected result:

```
$ npm run compile && node dist/index.js /awesome/folder/

> beatquest-renamer@1.0.0 compile
> tsc src/*.ts --outDir dist

Found 1 songs
==================================
Succesfully converted 1 songs
```
