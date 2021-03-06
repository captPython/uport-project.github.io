import React from 'react'
import Helmet from 'react-helmet'
import styled from 'styled-components'
import RehypeReact from 'rehype-react'

import SEO from '../components/SEO/SEO'
import SiteHeader from '../components/Layout/Header'
import config from '../../data/SiteConfig'
import TableOfContents from '../components/Layout/TableOfContents'
import SecondaryTitle from '../components/Layout/html/SecondaryTitle'
import CtaButton from '../components/CtaButton'
import AutoLinkText from 'react-autolink-text2'


export default class ContentTemplate extends React.Component {
  render () {
    const renderAst = new RehypeReact({
      createElement: React.createElement,
      components: {
        'h2': SecondaryTitle
      }
    }).Compiler
    const { slug } = this.props.pathContext
    const postNode = this.props.data.postBySlug
    const post = postNode.frontmatter
    const category = post.category
    const categories = []
    const messages = []

    /* If there is an announcement, broadcast it at the top of each page */
    if (this.props.data.announcement) {
      this.props.data.announcement.edges.forEach(announcement => {
        messages.push(
          <h3>
            <AutoLinkText text={`${announcement.node.frontmatter.announcement}`}
              linkProps={{target: '_blank'}} />
          </h3>
        )
      })
    }

    this.props.data.postByCategory.edges.forEach(cat => {
      if (cat.node.frontmatter.category === category) {
        categories.push(cat)
      }
    })

    const chapterTitles = []
    categories.forEach(cat => {
      chapterTitles.push(cat.node.frontmatter.title)
    })
    if (!post.id) {
      post.id = slug
    }
    if (!post.id) {
      post.category_id = config.postDefaultCategoryID
    }
    return (
      <div>
        <Helmet>
          <title>{`${post.title} | ${config.siteTitle}`}</title>
        </Helmet>
        <SEO postPath={slug} postNode={postNode} postSEO />
        <BodyGrid>
          <HeaderContainer>
            <SiteHeader
              activeCategory={category}
              location={this.props.location}
              categories={this.props.data.navCategories}
            />
          </HeaderContainer>
          <ToCContainer>
            <TableOfContents
              contentsType={post.type}
              chapterTitles={chapterTitles}
              categories={categories}
              category={category}
            />
          </ToCContainer>
          <BodyContainer>
            <AnnouncementContainer>
              {messages}
            </AnnouncementContainer>
            <CtaButton to={`${post.source}`}>
              Edit
            </CtaButton>
            <div className={`docSearch-content`}>
              { renderAst(postNode.htmlAst) }
            </div>
          </BodyContainer>
        </BodyGrid>
      </div>
    )
  }
}

const BodyGrid = styled.div`
  height: 100vh;
  display: grid;
  grid-template-rows: 75px 1fr;
  grid-template-columns: 300px 1fr;

  @media screen and (max-width: 600px) {
  display: flex;
  flex-direction: column;
  height: inherit;
  }
`

const BodyContainer = styled.div`
  grid-column: 2 / 3;
  grid-row: 2 / 3;
  overflow: scroll;
  justify-self: center;
  width: 100%;
  padding: ${props => props.theme.sitePadding};
  @media screen and (max-width: 600px) {
  order: 2;
  }

  & > div {
  max-width: ${props => props.theme.contentWidthLaptop};
  margin-left: ${props => props.theme.bobbysLeftMarginPreference};
  margin-top: auto;
  margin-right: auto;
  margin-bottom: auto;
  }

  & > h1 {
  color: ${props => props.theme.accentDark};
  }
  @media screen and (max-width: 1068px) {
    & > div {
      max-width: ${props => props.theme.contentWidthTablet};
      margin-left: ${props => props.theme.gregsLeftMarginPreference};
    }
  }
  @media screen and (max-width: 768px) {
    & > div {
      max-width: ${props => props.theme.contentWidthLargePhone};
    }
  }
  @media screen and (max-width: 520px) {
    & > div {
      max-width: ${props => props.theme.contentWidthLaptop};
    }
  }
`

const HeaderContainer = styled.div`
  background: ${props => props.theme.brand};
  width: 100vw;
  height: 84%;
  .Grid {
    width: 90vw;
    margin: 0 auto;
  }
`

const ToCContainer = styled.div`
  grid-column: 1 / 2;
  grid-row: 2 / 3;
  overflow: scroll;

  ::-webkit-scrollbar-track
  {
  background: ${props => props.theme.lightGrey};
  }

  ::-webkit-scrollbar
  {
  width: 2px;
  }

  ::-webkit-scrollbar-thumb
  {
  background: ${props => props.theme.tocAccent};
  }

  @media screen and (max-width: 600px) {
  order: 3;
  overflow: inherit;
  }
`

const AnnouncementContainer = styled.div`
  margin: auto;
  color: #cc0066;
`

/* eslint no-undef: "off" */
export const pageQuery = graphql`
query ContentBySlug($slug: String!) {
  allPostTitles: allMarkdownRemark(
    filter: { frontmatter: { index: { ne: null } } }
    ){
      edges {
        node {
          frontmatter {
            title
            index
            type
          }
          fields {
            slug
          }
        }
      }
    }
    navCategories: allMarkdownRemark (
      filter: { frontmatter: { category: { ne: null } } }
    ) {
      edges {
        node {
          fields {
            slug
          }
          headings {
            value
            depth
          }
          frontmatter {
            category
            index
          }
        }
      }
    }
    postBySlug: markdownRemark(fields: { slug: { eq: $slug } }) {
      htmlAst
      timeToRead
      excerpt
      headings  {
        value
        depth
      }
      frontmatter {
        title
        category
        type
        source
      }
      fields {
        slug
      }
    }
    postByCategory:  allMarkdownRemark(
      filter: { frontmatter: { category: { ne: null }, index: { ne: null } } }
    ) {
      totalCount
      edges {
        node {
          fields {
            slug
          }
          headings {
            value
            depth
          }
          excerpt
          timeToRead
          frontmatter {
            title
            category
            index
            type
            source
          }
        }
      }
    }
    announcement: allMarkdownRemark(
      filter: { frontmatter: { announcement: { ne: null } } }) {
      totalCount
      edges {
        node {
          frontmatter {
            announcement
          }
        }
      }
    }
  }
`;
