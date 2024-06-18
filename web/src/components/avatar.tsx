import React from 'react';
import { Avatar as BaseAvatar, AvatarFallback, AvatarImage } from './ui/avatar';

const Avatar = ({ src, fallback }: {src: string, fallback: string}) => (
  <BaseAvatar className="w-8 h-8">
    <AvatarImage src={src} />
    <AvatarFallback>{fallback}</AvatarFallback>
  </BaseAvatar>
);

export default Avatar;