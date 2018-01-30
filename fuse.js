const {
    FuseBox,
    SassPlugin,
    CSSPlugin,
    WebIndexPlugin,
    HTMLPlugin,
    JSONPlugin,
    RawPlugin,
    Sparky,
    UglifyJSPlugin,
    QuantumPlugin,
    EnvPlugin
} = require("fuse-box");

const express = require("express");
const path = require("path");
const {spawn} = require("child_process");
const { Ng2TemplatePlugin } = require('ng2-fused');

let producer;
let production = false;

Sparky.task("build:renderer", () => {
    const fuse = FuseBox.init({
        homeDir: "src/renderer",
        output: "dist/renderer/$name.js",
        tsConfig: "src/renderer/tsconfig.renderer.json",
        hash: production,
        target: "browser",
        warnings: true,
        experimentalFeatures: true,
        cache: !production,
        plugins: [
            EnvPlugin({ NODE_ENV: production ? "production" : "development" }),
            Ng2TemplatePlugin(),
            ['*.component.html', RawPlugin()],
            ['*.component.scss', RawPlugin()],
            [SassPlugin(), CSSPlugin()],
            WebIndexPlugin({
                title: "FuseBox electron demo",
                template: "src/renderer/index.html",
                path: production ? "." : "/renderer/"
            }),
            production && QuantumPlugin({
                bakeApiIntoBundle : 'renderer',
                target : 'electron',
                treeshake: true,
                removeExportsInterop: false,
                uglify: true
            })
        ]
    });

    if (!production) {
        // Configure development server
        fuse.dev({ root: false }, server => {
            const dist = path.join(__dirname, "dist");
            const app = server.httpServer.app;
            app.use("/renderer/", express.static(path.join(dist, 'renderer')));
            app.get("*", function(req, res) {
                res.sendFile(path.join(dist, "renderer/index.html"));
            });
        })
    }

    const vendor = fuse.bundle('vendor').instructions('~ main.ts');
    if (!production) {
      vendor.watch().hmr();
    }
    const app = fuse.bundle("renderer")

    if (!production) {
        app.watch().hmr();
    }
    app.instructions('>[main.ts]');
    return fuse.run();
});

Sparky.task("build:main", () => {
    const fuse = FuseBox.init({
        homeDir: "src/main",
        output: "dist/main/$name.js",
        tsConfig: "src/main/tsconfig.main.json",
        target: "server",
        experimentalFeatures: true,
        cache: !production,
        plugins: [
            EnvPlugin({ NODE_ENV: production ? "production" : "development" }),
            production && QuantumPlugin({
                bakeApiIntoBundle : 'main',
                target : 'server',
                treeshake: true,
                removeExportsInterop: false,
                uglify: true
            })
        ]
    });

    const app = fuse.bundle("main")
        .instructions('> [main.ts]')

    if (!production) {
        app.watch()

        return fuse.run().then(() => {
            // launch electron the app
            const child = spawn('npm', [ 'run', 'start:electron:watch' ], { shell:true, stdio: 'inherit' });
        });
    }

    return fuse.run()
});

Sparky.task("build:server", () => {
  const fuse = FuseBox.init({
      homeDir: "src/server",
      output: "dist/server/$name.js",
      tsConfig: "src/server/tsconfig.server.json",
      target: "server",
      experimentalFeatures: true,
      cache: !production,
      plugins: [
          EnvPlugin({ NODE_ENV: production ? "production" : "development" }),
          production && QuantumPlugin({
              bakeApiIntoBundle : 'server',
              target : 'server',
              treeshake: true,
              removeExportsInterop: false,
              uglify: true
          })
      ]
  });

  const app = fuse.bundle("server")
      .instructions('> [server.ts]')

  if (!production) {
      app.watch()

      return fuse.run().then(() => {
          // launch express the app
          const child = spawn('npm', [ 'run', 'start:server:watch' ], { shell:true, stdio: 'inherit' });
      });
    return fuse.run();
  }

});


// main task
Sparky.task("default", ["clean:dist", "clean:cache","build:server", "build:renderer", "build:main"], () => {});

// wipe it all
Sparky.task("clean:dist", () => Sparky.src("dist/*").clean("dist/"));
// wipe it all from .fusebox - cache dir
Sparky.task("clean:cache", () => Sparky.src(".fusebox/*").clean(".fusebox/"));

// prod build
Sparky.task("set-production-env", () => production = true);
Sparky.task("dist", ["clean:dist", "clean:cache", "set-production-env", "build:main", "build:renderer"], () => {})
