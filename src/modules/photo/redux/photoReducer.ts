import { ActionType, createCustomAction, getType } from 'typesafe-actions'
import { SIZE } from '../utils'
import { IPaging, IPhoto } from './../../../models/photo'

export interface PhotoState {
  listPhoto?: IPhoto[]
  listPhotoChange?: IPhoto[]
  isReset?: boolean
  paging?: IPaging
}

export const setPhotos = createCustomAction('photo/setPhotos', (data: IPhoto[]) => ({
  data,
}))

export const setPhotosChange = createCustomAction('photo/setPhotosChange', (data: IPhoto) => ({
  data,
}))

export const removePhotoChange = createCustomAction('photo/removePhotoChange', (data: IPhoto) => ({
  data,
}))

export const updatePhotos = createCustomAction('photo/updatePhotos')

export const resetPhotos = createCustomAction('photo/resetPhotos', (data: boolean) => ({
  data,
}))

export const setPaging = createCustomAction('photo/setPaging', (data: IPaging) => ({
  data,
}))

const actions = { setPhotos, setPhotosChange, removePhotoChange, updatePhotos, resetPhotos, setPaging }

type Action = ActionType<typeof actions>

export default function reducer(
  state: PhotoState = {
    listPhoto: [],
    listPhotoChange: [],
    isReset: false,
    paging: {
      start: 0,
      end: SIZE,
    },
  },
  action: Action,
) {
  switch (action.type) {
    case getType(setPhotos): {
      let listPhoto: IPhoto[] = []
      if (state.listPhoto) {
        listPhoto = [...state.listPhoto]
      }
      return { ...state, listPhoto: listPhoto.concat(action.data) }
    }
    case getType(setPhotosChange): {
      const photoChange = action.data
      let listPhotoChange: IPhoto[] = []
      if (state.listPhotoChange) {
        listPhotoChange = [...state.listPhotoChange]
      }
      if (listPhotoChange.length > 0) {
        const index = listPhotoChange.findIndex((photo) => photo.id === photoChange.id)
        if (index !== -1) {
          // photo đã có trong list change
          listPhotoChange[index].title = photoChange.title
        } else {
          listPhotoChange.push(photoChange)
        }
      } else {
        listPhotoChange.push(photoChange)
      }
      return { ...state, listPhotoChange }
    }
    case getType(removePhotoChange): {
      const photoChange = action.data
      let listPhotoChange: IPhoto[] = []
      if (state.listPhotoChange) {
        listPhotoChange = [...state.listPhotoChange]
      }
      if (listPhotoChange.length > 0) {
        const index = listPhotoChange.findIndex((photo) => photo.id === photoChange.id)
        if (index !== -1) {
          listPhotoChange.splice(index, 1)
        }
      }
      return { ...state, listPhotoChange }
    }
    case getType(updatePhotos): {
      let listPhoto: IPhoto[] = []
      let listPhotoChange: IPhoto[] = []
      if (state.listPhoto) {
        listPhoto = [...state.listPhoto]
      }
      if (state.listPhotoChange) {
        listPhotoChange = [...state.listPhotoChange]
      }
      for (let i = 0; i < listPhotoChange.length; i++) {
        for (let j = 0; j < listPhoto.length; j++) {
          if (listPhoto[j].id === listPhotoChange[i].id) {
            listPhoto[j].title = listPhotoChange[i].title
            listPhoto[j].updatedAt = '' + Date.now()
          }
        }
      }
      return { ...state, listPhoto, listPhotoChange: [] }
    }
    case getType(resetPhotos): {
      return { ...state, isReset: action.data }
    }
    case getType(setPaging):
      return { ...state, paging: action.data }
    default:
      return state
  }
}
