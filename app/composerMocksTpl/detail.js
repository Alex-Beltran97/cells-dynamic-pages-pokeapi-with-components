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
          "app__header",
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
          text: "Detail Page"
        }
      },
      {
        zone: "app__main",
        type: "UI",
        familyPath: "../elements/detail-page",
        tag: "detail-page",
        render: "litElement",        
        properties: {
          cellsConnections: {
            params: {
              id: "id"
            },
            out: {
              "navigate_evolutions": {
                bind: "navigate-evolutions",
                link: {
                  page: 'evolutions',
                  params: {
                    evl1: 'evl1',
                    evl2: 'evl2'
                  }
                }
              }
            }
          }
        }
      }
    ]
  };
  
  return page;
};