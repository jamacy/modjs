## <a href="#compile" name="compile">compile</a>
> Compile JavaScript/CSS/HTML source

### Usage

```sh
$ mod compile <source> [options]
```

### Options

#### dest

<p> <b>&nbsp;&nbsp;&nbsp;&nbsp;Default:</b> <code>./dist</code></p>
<p> <b>&nbsp;&nbsp;&nbsp;&nbsp;Describe:</b> Output file for the compiled code</p>
<hr>

#### charset

<p> <b>&nbsp;&nbsp;&nbsp;&nbsp;Default:</b> <code>utf-8</code></p>
<p> <b>&nbsp;&nbsp;&nbsp;&nbsp;Describe:</b> File encoding type</p>
<hr>

#### target

<p> <b>&nbsp;&nbsp;&nbsp;&nbsp;Default:</b> <code>dist</code></p>
<p> <b>&nbsp;&nbsp;&nbsp;&nbsp;Describe:</b> Target build level [HTML only]</p>
<hr>

#### loader

<p> <b>&nbsp;&nbsp;&nbsp;&nbsp;Default:</b> <code>requirejs</code></p>
<p> <b>&nbsp;&nbsp;&nbsp;&nbsp;Describe:</b> Use the Modules Loader [JS only]</p>
<hr>

#### base-url


<p> <b>&nbsp;&nbsp;&nbsp;&nbsp;Describe:</b> All modules are located relative to this path [JS only]</p>
<hr>

#### exclude


<p> <b>&nbsp;&nbsp;&nbsp;&nbsp;Describe:</b> Deep excludes a module and it's dependencies from the build [JS only]</p>
<hr>

#### suffix


<p> <b>&nbsp;&nbsp;&nbsp;&nbsp;Describe:</b> The output file suffix [JS only]</p>
<hr>

#### exclude-shallow


<p> <b>&nbsp;&nbsp;&nbsp;&nbsp;Describe:</b> Shallow excludes a module from the build (it's dependencies will still be included) [JS only]</p>
<hr>

#### package-dir


<p> <b>&nbsp;&nbsp;&nbsp;&nbsp;Describe:</b> Modules directory to use [JS only]</p>
<hr>

#### ascii-only
<p> <b>&nbsp;&nbsp;&nbsp;&nbsp;Type:</b> <code>boolean</code></p>
<p> <b>&nbsp;&nbsp;&nbsp;&nbsp;Default:</b> <code>true</code></p>
<p> <b>&nbsp;&nbsp;&nbsp;&nbsp;Describe:</b> Ascii encoding only [JS only]</p>
<hr>

#### combine
<p> <b>&nbsp;&nbsp;&nbsp;&nbsp;Type:</b> <code>boolean</code></p>
<p> <b>&nbsp;&nbsp;&nbsp;&nbsp;Default:</b> <code>true</code></p>
<p> <b>&nbsp;&nbsp;&nbsp;&nbsp;Describe:</b> Combine require modules if existed [JS only]</p>
<hr>

#### main-config-file

<p> <b>&nbsp;&nbsp;&nbsp;&nbsp;Default:</b> <code><source></code></p>
<p> <b>&nbsp;&nbsp;&nbsp;&nbsp;Describe:</b> Specify the file of the configuration for optimization [JS only]</p>
<hr>

#### mini-loader


<p> <b>&nbsp;&nbsp;&nbsp;&nbsp;Describe:</b> Use the lighweight almond shim instead of RequireJS, smaller filesize but can only load bundled resources and cannot request additional modules [requirejs only]</p>
<hr>

#### include-loader
<p> <b>&nbsp;&nbsp;&nbsp;&nbsp;Type:</b> <code>boolean</code></p>
<p> <b>&nbsp;&nbsp;&nbsp;&nbsp;Default:</b> <code>false</code></p>
<p> <b>&nbsp;&nbsp;&nbsp;&nbsp;Describe:</b> If include module loader [requirejs only]</p>
<hr>

#### verbose

<p> <b>&nbsp;&nbsp;&nbsp;&nbsp;Default:</b> <code>true</code></p>
<p> <b>&nbsp;&nbsp;&nbsp;&nbsp;Describe:</b> Increase log level to report all compiled modules [requirejs only]</p>
<hr>

#### wrap

<p> <b>&nbsp;&nbsp;&nbsp;&nbsp;Default:</b> <code>false</code></p>
<p> <b>&nbsp;&nbsp;&nbsp;&nbsp;Describe:</b> Wraps the output in an anonymous function to avoid require and define functions being added to the global scope, this often makes sense when using the almond option. [requirejs only]</p>
<hr>

#### minify
<p> <b>&nbsp;&nbsp;&nbsp;&nbsp;Type:</b> <code>boolean</code></p>
<p> <b>&nbsp;&nbsp;&nbsp;&nbsp;Default:</b> <code>true</code></p>
<p> <b>&nbsp;&nbsp;&nbsp;&nbsp;Describe:</b> If minify concatenated file with UglifyJS [requirejs only]</p>
<hr>

#### license
<p> <b>&nbsp;&nbsp;&nbsp;&nbsp;Type:</b> <code>boolean</code></p>
<p> <b>&nbsp;&nbsp;&nbsp;&nbsp;Default:</b> <code>false</code></p>
<p> <b>&nbsp;&nbsp;&nbsp;&nbsp;Describe:</b> If include license comments [requirejs only]</p>
<hr>

#### stub-modules


<p> <b>&nbsp;&nbsp;&nbsp;&nbsp;Describe:</b> Specify modules to stub out in the optimized file [requirejs only]</p>
<hr>

#### idleading
<p> <b>&nbsp;&nbsp;&nbsp;&nbsp;Type:</b> <code>string</code></p>
<p> <b>&nbsp;&nbsp;&nbsp;&nbsp;Default:</b> <code></code></p>
<p> <b>&nbsp;&nbsp;&nbsp;&nbsp;Describe:</b> Prepend idleading to generate the id of the module. [seajs only]</p>
<hr>

#### alias
<p> <b>&nbsp;&nbsp;&nbsp;&nbsp;Type:</b> <code>object</code></p>
<p> <b>&nbsp;&nbsp;&nbsp;&nbsp;Default:</b> <code>[object Object]</code></p>
<p> <b>&nbsp;&nbsp;&nbsp;&nbsp;Describe:</b> Modules root path [seajs only]</p>
<hr>

#### paths
<p> <b>&nbsp;&nbsp;&nbsp;&nbsp;Type:</b> <code>array</code></p>
<p> <b>&nbsp;&nbsp;&nbsp;&nbsp;Default:</b> <code>sea-modules</code></p>
<p> <b>&nbsp;&nbsp;&nbsp;&nbsp;Describe:</b> Where are the modules in the sea. [seajs only]</p>
<hr>

#### format
<p> <b>&nbsp;&nbsp;&nbsp;&nbsp;Type:</b> <code>string</code></p>

<p> <b>&nbsp;&nbsp;&nbsp;&nbsp;Describe:</b> id format, like hello/dist/{{filename}}. [seajs only]</p>
<hr>

#### debug
<p> <b>&nbsp;&nbsp;&nbsp;&nbsp;Type:</b> <code>boolean</code></p>
<p> <b>&nbsp;&nbsp;&nbsp;&nbsp;Default:</b> <code>true</code></p>
<p> <b>&nbsp;&nbsp;&nbsp;&nbsp;Describe:</b> Create a debugfile or not. [seajs only]</p>
<hr>







