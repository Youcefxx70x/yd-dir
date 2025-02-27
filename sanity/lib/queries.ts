import { defineQuery } from "next-sanity"
export const STARTUPS_QUERY=defineQuery(`*[_type=="startup" && defined(slug.current)&& !defined($search) || title match $search || category match $search || description match $search || author->name match $search  ] | order(_createdAt desc){
    _id,
      title,
  slug,
  author->{_id,name,bio,image,username},
  views,
  description,
  category,
  image,
  pitch,
  _createdAt
  }`)


export const STARTUPS_QUERY_ID=defineQuery(`*[_type=="startup" && defined(slug.current) && _id==$id ][0]{
  _id,
    title,
slug,
author->{_id,name,bio,image,username},
views,
description,
category,
image,
pitch,
_createdAt
}`)



export const STARTUPS_QUERY_VIEWS=defineQuery(`*[_type=="startup" && defined(slug.current) && _id==$id ][0]{
views,

}`)

export const AUTHOR_GITHUB_ID=defineQuery(`*[_type=="author" && id==$id ][0]{
  _id,
  id,
  name,
  username,
  bio,
  image,
  
}`)


export const AUTHOR_BY_ID=defineQuery(`*[_type=="author"  && _id==$id ][0]{
  _id,
  id,
  name,
  username,
  bio,
  image,
  
}`)


export const STARTUPS_BY_AUTHOR_QUERY=defineQuery(`*[_type=="startup" && defined(slug.current) && author->_id==$id ]| order(_createdAt desc){
  _id,
    title,
slug,
author->{_id,name,bio,image,username},
views,
description,
category,
image,
pitch,
_createdAt
}`)