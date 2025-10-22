export function gql(strings, ...args) {
  let str = "";
  strings.forEach((string, i) => {
    str += string + (args[i] || "");
  });
  return str;
}
export const HomePagePartsFragmentDoc = gql`
    fragment HomePageParts on HomePage {
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
export const AboutPagePartsFragmentDoc = gql`
    fragment AboutPageParts on AboutPage {
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
export const LendersPagePartsFragmentDoc = gql`
    fragment LendersPageParts on LendersPage {
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
export const ContactPagePartsFragmentDoc = gql`
    fragment ContactPageParts on ContactPage {
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
export const HomePageDocument = gql`
    query homePage($relativePath: String!) {
  homePage(relativePath: $relativePath) {
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
    ...HomePageParts
  }
}
    ${HomePagePartsFragmentDoc}`;
export const HomePageConnectionDocument = gql`
    query homePageConnection($before: String, $after: String, $first: Float, $last: Float, $sort: String, $filter: HomePageFilter) {
  homePageConnection(
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
        ...HomePageParts
      }
    }
  }
}
    ${HomePagePartsFragmentDoc}`;
export const AboutPageDocument = gql`
    query aboutPage($relativePath: String!) {
  aboutPage(relativePath: $relativePath) {
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
    ...AboutPageParts
  }
}
    ${AboutPagePartsFragmentDoc}`;
export const AboutPageConnectionDocument = gql`
    query aboutPageConnection($before: String, $after: String, $first: Float, $last: Float, $sort: String, $filter: AboutPageFilter) {
  aboutPageConnection(
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
        ...AboutPageParts
      }
    }
  }
}
    ${AboutPagePartsFragmentDoc}`;
export const LendersPageDocument = gql`
    query lendersPage($relativePath: String!) {
  lendersPage(relativePath: $relativePath) {
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
    ...LendersPageParts
  }
}
    ${LendersPagePartsFragmentDoc}`;
export const LendersPageConnectionDocument = gql`
    query lendersPageConnection($before: String, $after: String, $first: Float, $last: Float, $sort: String, $filter: LendersPageFilter) {
  lendersPageConnection(
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
        ...LendersPageParts
      }
    }
  }
}
    ${LendersPagePartsFragmentDoc}`;
export const ContactPageDocument = gql`
    query contactPage($relativePath: String!) {
  contactPage(relativePath: $relativePath) {
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
    ...ContactPageParts
  }
}
    ${ContactPagePartsFragmentDoc}`;
export const ContactPageConnectionDocument = gql`
    query contactPageConnection($before: String, $after: String, $first: Float, $last: Float, $sort: String, $filter: ContactPageFilter) {
  contactPageConnection(
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
        ...ContactPageParts
      }
    }
  }
}
    ${ContactPagePartsFragmentDoc}`;
export function getSdk(requester) {
  return {
    homePage(variables, options) {
      return requester(HomePageDocument, variables, options);
    },
    homePageConnection(variables, options) {
      return requester(HomePageConnectionDocument, variables, options);
    },
    aboutPage(variables, options) {
      return requester(AboutPageDocument, variables, options);
    },
    aboutPageConnection(variables, options) {
      return requester(AboutPageConnectionDocument, variables, options);
    },
    lendersPage(variables, options) {
      return requester(LendersPageDocument, variables, options);
    },
    lendersPageConnection(variables, options) {
      return requester(LendersPageConnectionDocument, variables, options);
    },
    contactPage(variables, options) {
      return requester(ContactPageDocument, variables, options);
    },
    contactPageConnection(variables, options) {
      return requester(ContactPageConnectionDocument, variables, options);
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
      url: "https://content.tinajs.io/1.6/content/4283e962-a6ee-457f-b47a-23cc4a5ae779/github/main",
      queries
    })
  )
);
export const queries = (client) => {
  const requester = generateRequester(client);
  return getSdk(requester);
};
