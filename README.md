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

# Run on windows
Head here: https://github.com/colthreepv/beatquest-renamer/releases/latest  
Download `beatquest-renamer-win.exe` in the appropriate folder, open command line and run with appropriate folder

# Run on Linux
Head here: https://github.com/colthreepv/beatquest-renamer/releases/latest  
Download `beatquest-renamer-linux` in the appropriate folder, add execution permissions, then run with appropriate folder

Example:
```shell
wget https://github.com/colthreepv/beatquest-renamer/releases/download/v1.0/beatquest-renamer-linux && chmod +x beatquest-renamer-linux
```

# How to use

The command requires 1 argument, the absolute or relative path to the `CustomLevels` directory,
be sure to make a copy before using `beatquest-renamer`

![image](https://user-images.githubusercontent.com/2657230/107893584-4a41c300-6f2c-11eb-9d8d-5d51bb28ba77.png)
