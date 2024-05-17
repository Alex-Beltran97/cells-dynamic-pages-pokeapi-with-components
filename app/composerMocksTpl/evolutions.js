'use-strict'

module.exports = CONFIG => {
  const page = {
    template: {
      tag: "cells-template-paper-drawer-panel",
      familyPath:  "@cells-components/cells-template-paper-drawer-panel",
      render: "litElement",      
      properties: {
        mode: "seamed",
        zones: [
          "app__main",
        ]
      }
    },
    components: [
      {
        zone: "app__header",
        type: "UI",
        familyPath: "@bbva-web-components/bbva-header-main",
        tag: "bbva-header-main",
        render: "litElement",        
        properties: {
          text: "Evolutions Page"
        }
      },
      {
        zone: "app__main",
        type: "UI",
        familyPath: "../elements/evolutions-page",
        tag: "evolutions-page",
        render: "litElement",
        properties: {
          cellsConnections: {
            params: {
              evl1: "evl1",
              evl2: "evl2",
            },       
          }
        }  
      }
    ]
  };
  
  return page;
};