export interface IPhoto {
  albumId: string | number
  id: number
  title: string
  url: string
  thumbnailUrl: string
  updatedAt: string
}

export interface IPaging {
  start: number
  end: number
}
