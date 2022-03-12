# ddu-source-package

A ddu.vim source for Vim/Noevim's plugin packages

This source collects Vim/Noevim's plugin packages that are installed under the
`'packpath'`. Additionally, the collected items have `packadd` action.


## Required

### denops.vim

https://github.com/vim-denops/denops.vim


### ddu.vim

https://github.com/Shougo/ddu.vim


### ddu-kind-file

https://github.com/Shougo/ddu-kind-file


## Configuration

```vim
" Use the source.
call ddu#start({'sources': [{'name': 'package'}]})
```


## License

MIT

Many part of this plugin is derived from
[Shougo/ddu-source-file_old](https://github.com/Shougo/ddu-source-file_old),
which is also licensed under the MIT license.
