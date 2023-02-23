import { Avatar, AvatarImage, AvatarFallback } from './avatar'

type AvatarComponentType = typeof Avatar & {
  Image: typeof AvatarImage
  Fallback: typeof AvatarFallback
}
;(Avatar as AvatarComponentType).Image = AvatarImage
;(Avatar as AvatarComponentType).Fallback = AvatarFallback

export default Avatar as AvatarComponentType
