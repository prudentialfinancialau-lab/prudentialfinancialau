// tina/config.js
import { defineConfig } from "tinacms";
var branch = process.env.GITHUB_BRANCH || process.env.VERCEL_GIT_COMMIT_REF || process.env.HEAD || "main";
var headerFields = [
  { type: "string", name: "phone", label: "Phone Number" },
  { type: "string", name: "email", label: "Email" },
  { type: "image", name: "logo", label: "Logo Image" },
  { type: "string", name: "facebookUrl", label: "Facebook URL" },
  { type: "string", name: "twitterUrl", label: "Twitter URL" },
  { type: "string", name: "linkedinUrl", label: "LinkedIn URL" },
  { type: "string", name: "youtubeUrl", label: "YouTube URL" }
];
var footerFields = [
  { type: "image", name: "logo", label: "Logo Image" },
  { type: "string", name: "description", label: "Description", ui: { component: "textarea" } },
  {
    type: "object",
    name: "address",
    label: "Address",
    fields: [
      { type: "string", name: "line1", label: "Address Line 1" },
      { type: "string", name: "line2", label: "Address Line 2" },
      { type: "string", name: "line3", label: "Address Line 3" }
    ]
  },
  { type: "string", name: "email", label: "Email" },
  { type: "string", name: "copyright", label: "Copyright Text" }
];
var aboutSectionFields = [
  { type: "string", name: "label", label: "Section Label" },
  { type: "string", name: "title", label: "Title" },
  { type: "string", name: "paragraph1", label: "First Paragraph", ui: { component: "textarea" } },
  { type: "string", name: "paragraph2", label: "Second Paragraph", ui: { component: "textarea" } },
  { type: "string", name: "quote", label: "Quote Text", ui: { component: "textarea" } },
  { type: "string", name: "quoteAuthor", label: "Quote Author" },
  { type: "string", name: "stat1Value", label: "Stat 1 Value" },
  { type: "string", name: "stat1Label", label: "Stat 1 Label" },
  { type: "string", name: "stat2Value", label: "Stat 2 Value" },
  { type: "string", name: "stat2Label", label: "Stat 2 Label" },
  { type: "image", name: "image", label: "Section Image" }
];
var helpSectionFields = [
  { type: "string", name: "title", label: "Title" },
  { type: "string", name: "description", label: "Description", ui: { component: "textarea" } },
  { type: "string", name: "statValue", label: "Stat Value" },
  { type: "string", name: "statLabel", label: "Stat Label" },
  { type: "image", name: "image", label: "Section Image" },
  {
    type: "object",
    name: "features",
    label: "Features",
    list: true,
    fields: [
      { type: "string", name: "icon", label: "Icon (Font Awesome class)" },
      { type: "string", name: "title", label: "Title" },
      { type: "string", name: "description", label: "Description", ui: { component: "textarea" } }
    ]
  }
];
var config_default = defineConfig({
  branch,
  clientId: "4283e962-a6ee-457f-b47a-23cc4a5ae779",
  token: "160bbe26b1293605cd34528135c8dabdc91e31c2",
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
      // HOME PAGE COLLECTION
      {
        name: "homePage",
        label: "Home Page",
        path: "content/pages",
        format: "json",
        ui: {
          allowedActions: {
            create: false,
            delete: false
          },
          router: () => "/"
        },
        match: {
          include: "home"
        },
        fields: [
          {
            type: "object",
            name: "hero",
            label: "Hero Section",
            fields: [
              { type: "string", name: "breadcrumb", label: "Breadcrumb Text" },
              { type: "string", name: "title", label: "Main Title" },
              { type: "string", name: "buttonText", label: "Button Text" },
              { type: "string", name: "formTitle", label: "Form Title" },
              { type: "image", name: "heroImage", label: "Hero Image" }
            ]
          },
          {
            type: "object",
            name: "about",
            label: "About Section",
            fields: aboutSectionFields
          },
          {
            type: "object",
            name: "help",
            label: "Services Section",
            fields: helpSectionFields
          },
          {
            type: "object",
            name: "calculator",
            label: "Mortgage Calculator",
            fields: [
              { type: "string", name: "title", label: "Title" },
              { type: "string", name: "description", label: "Description", ui: { component: "textarea" } }
            ]
          },
          {
            type: "object",
            name: "lenders",
            label: "Lenders Section",
            fields: [
              { type: "string", name: "title", label: "Title" },
              { type: "string", name: "description", label: "Description" },
              {
                type: "object",
                name: "lenderList",
                label: "Lender List",
                list: true,
                fields: [
                  { type: "string", name: "name", label: "Lender Name" },
                  { type: "image", name: "logo", label: "Lender Logo (optional)" }
                ]
              }
            ]
          },
          {
            type: "object",
            name: "contact",
            label: "Contact Section",
            fields: [
              { type: "string", name: "title", label: "Title" },
              { type: "string", name: "mapUrl", label: "Google Maps Embed URL", ui: { component: "textarea" } },
              { type: "string", name: "location", label: "Location Name" }
            ]
          },
          {
            type: "object",
            name: "newsletter",
            label: "Newsletter Section",
            fields: [
              { type: "string", name: "title", label: "Title" }
            ]
          },
          {
            type: "object",
            name: "header",
            label: "Header",
            fields: headerFields
          },
          {
            type: "object",
            name: "footer",
            label: "Footer",
            fields: footerFields
          }
        ]
      },
      // ABOUT PAGE COLLECTION
      {
        name: "aboutPage",
        label: "About Page",
        path: "content/pages",
        format: "json",
        ui: {
          allowedActions: {
            create: false,
            delete: false
          },
          router: () => "/about"
        },
        match: {
          include: "about"
        },
        fields: [
          {
            type: "object",
            name: "about",
            label: "About Section",
            fields: aboutSectionFields
          },
          {
            type: "object",
            name: "help",
            label: "Services Section",
            fields: helpSectionFields
          },
          {
            type: "object",
            name: "header",
            label: "Header",
            fields: headerFields
          },
          {
            type: "object",
            name: "footer",
            label: "Footer",
            fields: footerFields
          }
        ]
      },
      // LENDERS PAGE COLLECTION
      {
        name: "lendersPage",
        label: "Lenders Page",
        path: "content/pages",
        format: "json",
        ui: {
          allowedActions: {
            create: false,
            delete: false
          },
          router: () => "/lenders"
        },
        match: {
          include: "lenders"
        },
        fields: [
          {
            type: "object",
            name: "lenders",
            label: "Lenders Section",
            fields: [
              { type: "string", name: "title", label: "Title" },
              { type: "string", name: "description", label: "Description" },
              {
                type: "object",
                name: "lenderList",
                label: "Lender List",
                list: true,
                fields: [
                  { type: "string", name: "name", label: "Lender Name" },
                  { type: "image", name: "logo", label: "Lender Logo (optional)" }
                ]
              }
            ]
          },
          {
            type: "object",
            name: "calculator",
            label: "Mortgage Calculator",
            fields: [
              { type: "string", name: "title", label: "Title" },
              { type: "string", name: "description", label: "Description", ui: { component: "textarea" } }
            ]
          },
          {
            type: "object",
            name: "header",
            label: "Header",
            fields: headerFields
          },
          {
            type: "object",
            name: "footer",
            label: "Footer",
            fields: footerFields
          }
        ]
      },
      // CONTACT PAGE COLLECTION
      {
        name: "contactPage",
        label: "Contact Page",
        path: "content/pages",
        format: "json",
        ui: {
          allowedActions: {
            create: false,
            delete: false
          },
          router: () => "/contact"
        },
        match: {
          include: "contact"
        },
        fields: [
          {
            type: "object",
            name: "contact",
            label: "Contact Section",
            fields: [
              { type: "string", name: "title", label: "Title" },
              { type: "string", name: "mapUrl", label: "Google Maps Embed URL", ui: { component: "textarea" } },
              { type: "string", name: "location", label: "Location Name" }
            ]
          },
          {
            type: "object",
            name: "header",
            label: "Header",
            fields: headerFields
          },
          {
            type: "object",
            name: "footer",
            label: "Footer",
            fields: footerFields
          }
        ]
      }
    ]
  }
});
export {
  config_default as default
};
