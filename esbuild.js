const esbuild = require('esbuild');
const watch = {
  onRebuild(error, result) {
    if (error)
      console.error('❌ watch build failed:', error);
    else
      console.log(`✅ [${new Date().toJSON()}] watch build succeeded:`, result);
  },
};
esbuild.build({
  entryPoints: ['index.mjs'],
  bundle: true,
  // minify: true,
  platform: 'node',
  format: 'esm',
  watch: watch,

  outfile: 'index.build.mjs',
});
