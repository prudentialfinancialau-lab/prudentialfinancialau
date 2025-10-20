// tina/config.js
import { defineConfig } from "tinacms";
var branch = process.env.GITHUB_BRANCH || process.env.VERCEL_GIT_COMMIT_REF || process.env.HEAD || "main";
var config_default = defineConfig({
  branch,
  clientId: "1f3442f9-93fd-4285-a485-f1fa4b91329a",
  token: process.env.TINA_TOKEN,
  build: {
    outputFolder: "admin",
    publicFolder: "public"
  },
  media: {
    tina: {
      mediaRoot: "",
      publicFolder: "public"
    }
  },
  schema: {
    collections: [
      {
        name: "page",
        label: "Pages",
        path: "content/pages",
        format: "json",
        ui: {
          allowedActions: {
            create: false,
            delete: false
          },
          router: () => {
            return "/";
          }
        },
        fields: [
          // Hero Section
          {
            type: "object",
            name: "hero",
            label: "Hero Section",
            fields: [
              {
                type: "string",
                name: "breadcrumb",
                label: "Breadcrumb Text"
              },
              {
                type: "string",
                name: "title",
                label: "Main Title"
              },
              {
                type: "string",
                name: "buttonText",
                label: "Button Text"
              },
              {
                type: "string",
                name: "formTitle",
                label: "Form Title"
              },
              {
                type: "image",
                name: "heroImage",
                label: "Hero Image"
              }
            ]
          },
          // About Section
          {
            type: "object",
            name: "about",
            label: "About Section",
            fields: [
              {
                type: "string",
                name: "label",
                label: "Section Label"
              },
              {
                type: "string",
                name: "title",
                label: "Title"
              },
              {
                type: "string",
                name: "paragraph1",
                label: "First Paragraph",
                ui: {
                  component: "textarea"
                }
              },
              {
                type: "string",
                name: "paragraph2",
                label: "Second Paragraph",
                ui: {
                  component: "textarea"
                }
              },
              {
                type: "string",
                name: "quote",
                label: "Quote Text",
                ui: {
                  component: "textarea"
                }
              },
              {
                type: "string",
                name: "quoteAuthor",
                label: "Quote Author"
              },
              {
                type: "string",
                name: "stat1Value",
                label: "Stat 1 Value"
              },
              {
                type: "string",
                name: "stat1Label",
                label: "Stat 1 Label"
              },
              {
                type: "string",
                name: "stat2Value",
                label: "Stat 2 Value"
              },
              {
                type: "string",
                name: "stat2Label",
                label: "Stat 2 Label"
              },
              {
                type: "image",
                name: "image",
                label: "Section Image"
              }
            ]
          },
          // Help Section
          {
            type: "object",
            name: "help",
            label: "Help Section",
            fields: [
              {
                type: "string",
                name: "title",
                label: "Title"
              },
              {
                type: "string",
                name: "description",
                label: "Description",
                ui: {
                  component: "textarea"
                }
              },
              {
                type: "string",
                name: "statValue",
                label: "Stat Value"
              },
              {
                type: "string",
                name: "statLabel",
                label: "Stat Label"
              },
              {
                type: "image",
                name: "image",
                label: "Section Image"
              },
              {
                type: "object",
                name: "features",
                label: "Features",
                list: true,
                fields: [
                  {
                    type: "string",
                    name: "icon",
                    label: "Icon (Emoji)"
                  },
                  {
                    type: "string",
                    name: "title",
                    label: "Title"
                  },
                  {
                    type: "string",
                    name: "description",
                    label: "Description",
                    ui: {
                      component: "textarea"
                    }
                  }
                ]
              }
            ]
          },
          // Lenders Section
          {
            type: "object",
            name: "lenders",
            label: "Lenders Section",
            fields: [
              {
                type: "string",
                name: "title",
                label: "Title"
              },
              {
                type: "string",
                name: "description",
                label: "Description"
              },
              {
                type: "object",
                name: "lenderList",
                label: "Lender List",
                list: true,
                fields: [
                  {
                    type: "string",
                    name: "name",
                    label: "Lender Name"
                  },
                  {
                    type: "image",
                    name: "logo",
                    label: "Lender Logo (optional)"
                  }
                ]
              }
            ]
          },
          // Contact Section
          {
            type: "object",
            name: "contact",
            label: "Contact Section",
            fields: [
              {
                type: "string",
                name: "title",
                label: "Title"
              },
              {
                type: "string",
                name: "mapUrl",
                label: "Google Maps Embed URL",
                ui: {
                  component: "textarea"
                }
              },
              {
                type: "string",
                name: "location",
                label: "Location Name"
              }
            ]
          },
          // Newsletter Section
          {
            type: "object",
            name: "newsletter",
            label: "Newsletter Section",
            fields: [
              {
                type: "string",
                name: "title",
                label: "Title"
              }
            ]
          },
          // Header
          {
            type: "object",
            name: "header",
            label: "Header",
            fields: [
              {
                type: "string",
                name: "phone",
                label: "Phone Number"
              },
              {
                type: "string",
                name: "email",
                label: "Email"
              },
              {
                type: "string",
                name: "logo",
                label: "Logo Text"
              },
              {
                type: "string",
                name: "logoIcon",
                label: "Logo Icon (Emoji or Icon)"
              }
            ]
          },
          // Footer
          {
            type: "object",
            name: "footer",
            label: "Footer",
            fields: [
              {
                type: "string",
                name: "description",
                label: "Description",
                ui: {
                  component: "textarea"
                }
              },
              {
                type: "object",
                name: "address",
                label: "Address",
                fields: [
                  {
                    type: "string",
                    name: "line1",
                    label: "Address Line 1"
                  },
                  {
                    type: "string",
                    name: "line2",
                    label: "Address Line 2"
                  },
                  {
                    type: "string",
                    name: "line3",
                    label: "Address Line 3"
                  }
                ]
              },
              {
                type: "string",
                name: "email",
                label: "Email"
              },
              {
                type: "string",
                name: "copyright",
                label: "Copyright Text"
              }
            ]
          }
        ]
      }
    ]
  }
});
export {
  config_default as default
};
