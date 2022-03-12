import {
  ActionFlags,
  Actions,
  BaseSource,
  DduItem,
  Item,
} from "https://deno.land/x/ddu_vim@v1.2.0/types.ts#^";
import { Denops } from "https://deno.land/x/ddu_vim@v1.2.0/deps.ts";
import { ActionData } from "https://deno.land/x/ddu_kind_file@v0.2.0/file.ts#^";
import { basename, dirname } from "https://deno.land/std@0.128.0/path/mod.ts#^";

type Params = Record<never, never>;

export class Source extends BaseSource<Params> {
  kind = "file";

  actions: Actions<Params> = {
    packadd: async (args: { denops: Denops; items: DduItem[] }) => {
      for (const item of args.items) {
        await args.denops.cmd("packadd " + item.word);
      }
      return Promise.resolve(ActionFlags.None);
    },
  };

  gather(args: {
    denops: Denops;
    sourceParams: Params;
  }): ReadableStream<Item<ActionData>[]> {
    return new ReadableStream({
      async start(controller) {
        const packages = (await args.denops.eval(
          "globpath(&packpath, 'pack/*/*/*', 1, 1)",
        )) as string[];

        controller.enqueue(
          await Promise.all(packages.map(async (f) => ({
            word: basename(f),
            display: f,
            action: {
              path: f,
            },
            highlights: [
              {
                name: "directory",
                hl_group: "Directory",
                col: 1,
                width: ((await args.denops.call(
                  "strwidth",
                  dirname(f),
                )) as number) + 1,
              },
            ],
          }))),
        );

        controller.close();
      },
    });
  }

  params(): Params {
    return {};
  }
}
