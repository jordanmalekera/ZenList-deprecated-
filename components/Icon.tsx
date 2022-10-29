import * as IconPacks from '@expo/vector-icons'
import React from 'react';

type IconProps = {
    iconPack: keyof typeof IconPacks
    name: React.ComponentProps<any>['name'],
    color?: string,
    size?: number
}

export default function Icon(props: IconProps) {
    const component = IconPacks[props.iconPack]
    return React.createElement(component, {...props})
}
