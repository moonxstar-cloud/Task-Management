import React from "react"

interface AvatarGroupProps {
  children: React.ReactNode
}

export function AvatarGroup({ children }: AvatarGroupProps) {
  const childrenArray = React.Children.toArray(children)

  return (
    <div className="flex -space-x-2">
      {childrenArray.map((child, index) => (
        <div key={index} style={{ zIndex: childrenArray.length - index }}>
          {child}
        </div>
      ))}
    </div>
  )
}
