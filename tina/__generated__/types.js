export function gql(strings, ...args) {
  let str = "";
  strings.forEach((string, i) => {
    str += string + (args[i] || "");
  });
  return str;
}
export const PagePartsFragmentDoc = gql`
    fragment PageParts on Page {
  __typename
  hero {
    __typename
    breadcrumb
    title
    buttonText
    formTitle
    heroImage
  }
  about {
    __typename
    label
    title
    paragraph1
    paragraph2
    quote
    quoteAuthor
    stat1Value
    stat1Label
    stat2Value
    stat2Label
    image
  }
  help {
    __typename
    title
    description
    statValue
    statLabel
    image
    features {
      __typename
      icon
      title
      description
    }
  }
  lenders {
    __typename
    title
    description
    lenderList {
      __typename
      name
      logo
    }
  }
  calculator {
    __typename
    title
    description
  }
  contact {
    __typename
    title
    mapUrl
    location
  }
  newsletter {
    __typename
    title
  }
  header {
    __typename
    phone
    email
    logo
    facebookUrl
    twitterUrl
    linkedinUrl
    youtubeUrl
  }
  footer {
    __typename
    logo
    description
    address {
      __typename
      line1
      line2
      line3
    }
    email
    copyright
  }
}
    `;
export const PageDocument = gql`
    query page($relativePath: String!) {
  page(relativePath: $relativePath) {
    ... on Document {
      _sys {
        filename
        basename
        hasReferences
        breadcrumbs
        path
        relativePath
        extension
      }
      id
    }
    ...PageParts
  }
}
    ${PagePartsFragmentDoc}`;
export const PageConnectionDocument = gql`
    query pageConnection($before: String, $after: String, $first: Float, $last: Float, $sort: String, $filter: PageFilter) {
  pageConnection(
    before: $before
    after: $after
    first: $first
    last: $last
    sort: $sort
    filter: $filter
  ) {
    pageInfo {
      hasPreviousPage
      hasNextPage
      startCursor
      endCursor
    }
    totalCount
    edges {
      cursor
      node {
        ... on Document {
          _sys {
            filename
            basename
            hasReferences
            breadcrumbs
            path
            relativePath
            extension
          }
          id
        }
        ...PageParts
      }
    }
  }
}
    ${PagePartsFragmentDoc}`;
export function getSdk(requester) {
  return {
    page(variables, options) {
      return requester(PageDocument, variables, options);
    },
    pageConnection(variables, options) {
      return requester(PageConnectionDocument, variables, options);
    }
  };
}
import { createClient } from "tinacms/dist/client";
const generateRequester = (client) => {
  const requester = async (doc, vars, options) => {
    let url = client.apiUrl;
    if (options?.branch) {
      const index = client.apiUrl.lastIndexOf("/");
      url = client.apiUrl.substring(0, index + 1) + options.branch;
    }
    const data = await client.request({
      query: doc,
      variables: vars,
      url
    }, options);
    return { data: data?.data, errors: data?.errors, query: doc, variables: vars || {} };
  };
  return requester;
};
export const ExperimentalGetTinaClient = () => getSdk(
  generateRequester(
    createClient({
      url: "https://content.tinajs.io/1.6/content/1f3442f9-93fd-4285-a485-f1fa4b91329a/github/main",
      queries
    })
  )
);
export const queries = (client) => {
  const requester = generateRequester(client);
  return getSdk(requester);
};
