// You can include shared interfaces/types in a separate file
// and then use them in any component by importing them. For
// example, to import the interface below do:
//
// import User from 'path/to/interfaces';

export type User = {
  id: number
  name: string
}

export interface ArticleType {
  id: string
  url: string
  deadLineAt: string | null
  createdAt: string | null
}

export interface OgpType {
  site_name: string
  title: string
  description: string
  image: string
}