import { defineConfig } from "tinacms";

// Your hosting provider likely exposes this as an environment variable
const branch =
  process.env.GITHUB_BRANCH ||
  process.env.VERCEL_GIT_COMMIT_REF ||
  process.env.HEAD ||
  "main";

export default defineConfig({
  branch,

  clientId: "1f3442f9-93fd-4285-a485-f1fa4b91329a",
  token: process.env.TINA_TOKEN,

  build: {
    outputFolder: "admin",
    publicFolder: "public",
  },
  media: {
    tina: {
      mediaRoot: "",
      publicFolder: "public",
    },
  },
  schema: {
    collections: [
      {
        name: "page",
        label: "Pages",
        path: "content/pages",
        format: "mdx",
        fields: [
          {
            type: "string",
            name: "title",
            label: "Page Title",
            required: true,
          },
          {
            type: "string",
            name: "description",
            label: "Description",
          },
          {
            type: "image",
            name: "heroImage",
            label: "Hero Image",
          },
          {
            type: "rich-text",
            name: "content",
            label: "Content",
            isBody: true,
          },
        ],
      },
      {
        name: "section",
        label: "Landing Sections",
        path: "content/sections",
        format: "json",
        fields: [
          {
            type: "string",
            name: "heading",
            label: "Section Heading",
            required: true,
          },
          {
            type: "string",
            name: "subheading",
            label: "Subheading",
          },
          {
            type: "image",
            name: "image",
            label: "Section Image",
          },
          {
            type: "string",
            name: "imageAlt",
            label: "Image Alt Text",
          },
          {
            type: "rich-text",
            name: "description",
            label: "Description",
          },
          {
            type: "string",
            name: "buttonText",
            label: "Button Text",
          },
          {
            type: "string",
            name: "buttonLink",
            label: "Button Link",
          },
        ],
      },
    ],
  },
});
