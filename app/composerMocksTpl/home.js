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
          "app__transactional",
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
          text: "Home Page"
        }
      },
      {
        zone: "app__main",
        type: "UI",
        familyPath: "../elements/home-page",
        tag: "home-page",
        render: "litElement",        
        properties: {
          cellsConnections: {
            in: {
              "navigate_to_detail": {
                bind: "_handleNavigation"
              },
              "send_pokemons": {
                bind: "pokemons"
              },
              "send_count": {
                bind: "count"
              },
              "send_next": {
                bind: "next"
              },
              "send_previous": {
                bind: "previous"
              },
            },
            out: {
              "load_data": {
                bind: "load-data"
              },
              "handle_next_page": {
                bind: "handle-next-page"
              },
              "handle_previous_page": {
                bind: "handle-previous-page"
              },
              "handle_index_page": {
                bind: "handle-index-page"
              },
              "handle_first_page": {
                bind: "handle-first-page"
              },
              "handle_last_page": {
                bind: "handle-last-page"
              },
              "navigate_detail": {
                bind: "navigate-detail",
                link: {
                  page: 'detail',
                  params: {
                    id: "id"
                  }
                }
              },
            }
          }
        }
      },
      {
        zone: "app__transactional",
        type: "DM",
        familyPath: "../elements/dm-pokemon-evolutions",
        tag: "dm-pokemon-evolutions",
        render: "litElement",
        properties: {
          cellsConnections: {
            in: {
              "load_data": {
                bind: "_sendData"
              },
              "handle_next_page": {
                bind: "_handleNextPage"
              },
              "handle_previous_page": {
                bind: "_handlePrevPage"
              },
              "handle_index_page": {
                bind: "_handleIndexPage"
              },
              "handle_first_page": {
                bind: "_handleFirstPage"
              },
              "handle_last_page": {
                bind: "_handleLastPage"
              },
            },
            out: {
              "send_pokemons": {
                bind: "send-pokemons"
              },
              "send_count": {
                bind: "send-count"
              },
              "send_next": {
                bind: "send-next"
              },
              "send_previous": {
                bind: "send-previous"
              },
            },
          }
        }  
      }
    ]
  };
  
  return page;
};