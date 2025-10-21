export function gql(strings, ...args) {
  let str = "";
  strings.forEach((string, i) => {
    str += string + (args[i] || "");
  });
  return str;
}
export const HomePartsFragmentDoc = gql`
    fragment HomeParts on Home {
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
  calculator {
    __typename
    title
    description
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
export const AboutPartsFragmentDoc = gql`
    fragment AboutParts on About {
  __typename
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
export const LendersPartsFragmentDoc = gql`
    fragment LendersParts on Lenders {
  __typename
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
export const ContactPartsFragmentDoc = gql`
    fragment ContactParts on Contact {
  __typename
  contact {
    __typename
    title
    mapUrl
    location
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
export const HomeDocument = gql`
    query home($relativePath: String!) {
  home(relativePath: $relativePath) {
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
    ...HomeParts
  }
}
    ${HomePartsFragmentDoc}`;
export const HomeConnectionDocument = gql`
    query homeConnection($before: String, $after: String, $first: Float, $last: Float, $sort: String, $filter: HomeFilter) {
  homeConnection(
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
        ...HomeParts
      }
    }
  }
}
    ${HomePartsFragmentDoc}`;
export const AboutDocument = gql`
    query about($relativePath: String!) {
  about(relativePath: $relativePath) {
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
    ...AboutParts
  }
}
    ${AboutPartsFragmentDoc}`;
export const AboutConnectionDocument = gql`
    query aboutConnection($before: String, $after: String, $first: Float, $last: Float, $sort: String, $filter: AboutFilter) {
  aboutConnection(
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
        ...AboutParts
      }
    }
  }
}
    ${AboutPartsFragmentDoc}`;
export const LendersDocument = gql`
    query lenders($relativePath: String!) {
  lenders(relativePath: $relativePath) {
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
    ...LendersParts
  }
}
    ${LendersPartsFragmentDoc}`;
export const LendersConnectionDocument = gql`
    query lendersConnection($before: String, $after: String, $first: Float, $last: Float, $sort: String, $filter: LendersFilter) {
  lendersConnection(
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
        ...LendersParts
      }
    }
  }
}
    ${LendersPartsFragmentDoc}`;
export const ContactDocument = gql`
    query contact($relativePath: String!) {
  contact(relativePath: $relativePath) {
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
    ...ContactParts
  }
}
    ${ContactPartsFragmentDoc}`;
export const ContactConnectionDocument = gql`
    query contactConnection($before: String, $after: String, $first: Float, $last: Float, $sort: String, $filter: ContactFilter) {
  contactConnection(
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
        ...ContactParts
      }
    }
  }
}
    ${ContactPartsFragmentDoc}`;
export function getSdk(requester) {
  return {
    home(variables, options) {
      return requester(HomeDocument, variables, options);
    },
    homeConnection(variables, options) {
      return requester(HomeConnectionDocument, variables, options);
    },
    about(variables, options) {
      return requester(AboutDocument, variables, options);
    },
    aboutConnection(variables, options) {
      return requester(AboutConnectionDocument, variables, options);
    },
    lenders(variables, options) {
      return requester(LendersDocument, variables, options);
    },
    lendersConnection(variables, options) {
      return requester(LendersConnectionDocument, variables, options);
    },
    contact(variables, options) {
      return requester(ContactDocument, variables, options);
    },
    contactConnection(variables, options) {
      return requester(ContactConnectionDocument, variables, options);
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
