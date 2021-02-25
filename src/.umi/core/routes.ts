// @ts-nocheck
import React from "react";
import { ApplyPluginsType } from "/Users/dongjia001/work/myblog/node_modules/@umijs/runtime";
import * as umiExports from "./umiExports";
import { plugin } from "./plugin";

export function getRoutes() {
  const routes = [
    {
      path: "/~demos/:uuid",
      layout: false,
      wrappers: [
        require("/Users/dongjia001/work/myblog/node_modules/@umijs/preset-dumi/lib/theme/layout")
          .default
      ],
      component: props => {
        const React = require("react");
        const renderArgs = require("../../../node_modules/@umijs/preset-dumi/lib/plugins/features/demo/getDemoRenderArgs").default(
          props
        );

        switch (renderArgs.length) {
          case 1:
            // render demo directly
            return renderArgs[0];

          case 2:
            // render demo with previewer
            return React.createElement(
              require("dumi-theme-default/src/builtins/Previewer.tsx").default,
              renderArgs[0],
              renderArgs[1]
            );

          default:
            return `Demo ${uuid} not found :(`;
        }
      }
    },
    {
      path: "/_demos/:uuid",
      redirect: "/~demos/:uuid"
    },
    {
      __dumiRoot: true,
      layout: false,
      path: "/",
      wrappers: [
        require("/Users/dongjia001/work/myblog/node_modules/@umijs/preset-dumi/lib/theme/layout")
          .default,
        require("/Users/dongjia001/work/myblog/node_modules/dumi-theme-default/src/layout.tsx")
          .default
      ],
      routes: [
        {
          path: "/",
          component: require("/Users/dongjia001/work/myblog/docs/index.md")
            .default,
          exact: true,
          meta: {
            filePath: "docs/index.md",
            updatedTime: 1614252012000,
            slugs: [
              {
                depth: 2,
                value: "Hello myblog!",
                heading: "hello-myblog"
              }
            ],
            title: "Hello myblog!"
          },
          title: "Hello myblog!"
        }
      ],
      title: "myblog",
      component: props => props.children
    }
  ];

  // allow user to extend routes
  plugin.applyPlugins({
    key: "patchRoutes",
    type: ApplyPluginsType.event,
    args: { routes }
  });

  return routes;
}
